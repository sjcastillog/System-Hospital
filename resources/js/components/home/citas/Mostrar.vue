<script setup>
    import axios from 'axios';
    import { ref } from 'vue';

    const consultas = ref([]);
    const busqueda  = ref('');
    const isSearch  = ref(false);
    const isReady   = ref(false);
    const isNombres = ref(false);


    let backupConsultas = [];
 

    const handleSearch = ()=>{
        if(isNombres.value){ 
            const arrfilter = consultas.value.filter(el=> el.nombre_paciente?.toLowerCase().includes(busqueda.value.toLowerCase()));
            if(arrfilter.length === 0 ){
                alert('NO HAY COINCIDENCIAS');
            }else{
                isSearch.value = true;
                consultas.value = arrfilter;
            }
        }else{
            const arrfilter = consultas.value.filter(el=> el.fecha_cita === busqueda.value);
            if(arrfilter.length === 0 ){
                alert('NO HAY COINCIDENCIAS');
            }else{
                isSearch.value = true;
                consultas.value = arrfilter;
            }
        }
    };

    const handleReset = ()=>{
        consultas.value = backupConsultas;
        isSearch.value = false;
        busqueda.value = '';
    };

    const mostrarConsultas = async ()=>{
        try{
            const { data } = await axios.get('/api/consultas');
            consultas.value = data.sort((a, b) => new Date(a.fecha_cita).getTime() > new Date(b.fecha_cita).getTime());
            backupConsultas = data.sort((a, b) => new Date(a.fecha_cita).getTime() > new Date(b.fecha_cita).getTime());
            isReady ? isReady.value   = true : null;
        }catch(err){
            console.log(err)
        }
    };

    const borrarConsulta = (id)=>{
        if(confirm("Desea Eliminar el Paciente?")){
            axios.delete(`/api/consultas/${id}`)
            .then(response=>{
                mostrarConsultas();
            })
            .catch(err=>{
                console.log(err)
            })
        }
    };

// Ejecutables
mostrarConsultas();
</script>
<template>
    <div class="container">
        <div class="row pt-4">
            <div class="col-10">
                <div class="row justify-content-start align-items-center">
                    <div class="col-md-6 col-lg-4 col-4 ">
                        <div class="input-group mb-3">
                            <input 
                                aria-label="Recipient's username" 
                                aria-describedby="button-addon2" 
                                class="form-control" 
                                :placeholder="isNombres ? 'Nombre Paciente' : ''" 
                                :type="isNombres ? 'text' : 'date'" 
                                v-model="busqueda"
                                :disabled="consultas.length === 0"
                            >
                            <template v-if="isSearch">
                                <button 
                                    class="btn btn-outline-secondary" 
                                    id="button-addon3"
                                    type="button"
                                    @click="handleReset"
                                >
                                    <i class="fa-solid fa-rotate-right"></i>
                                </button>
                            </template>
                            <button 
                                class="btn btn-outline-secondary" 
                                id="button-addon2"
                                type="button"
                                @click="handleSearch"
                                :disabled="consultas.length === 0"
                            >
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-1">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="isNombres" id="flexCheckChecked">
                            <label class="form-check-label" for="flexCheckChecked">
                                Nombres
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
            <template v-if="consultas.length > 0">            
                <div class="col-10">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRES</th>
                                    <th>CEDULA</th>
                                    <th>SUCURSAL</th>
                                    <th>DOCTOR</th>
                                    <th>FECHA</th>
                                    <th>HORA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="consulta in consultas" :key="consulta.id"> 
                                    <td>{{ consulta.id }}</td>
                                    <td>{{ consulta.nombre_paciente }}</td>
                                    <td>{{ consulta.cedula_paciente }}</td>
                                    <td>{{ consulta.sucursal }}</td>
                                    <td>{{ consulta.doctor }}</td>
                                    <td>{{ consulta.fecha_cita }}</td>
                                    <td>{{ consulta.hora_cita }}</td>
                                    <td >

                                            <router-link :to='{name:"editarPaciente", params:{id:consulta.id}}' class="btn btn-info d-inline m-1">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </router-link>

                                            <a type="button" @click="borrarConsulta(consulta.id)" class="btn btn-danger d-inline">
                                                <i class="fa-solid fa-trash"></i>
                                            </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template v-else>
                <template v-if="isReady">
                    <div class="col-10">
                        <h1>NO HAY CONSULTAS</h1>
                    </div>
                </template>
                <template v-else>
                    <div class="col-10">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </template>
                
            </template>
        </div>
    </div>
</template>
