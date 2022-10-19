<script setup>
    import axios from 'axios';
    import { ref, onMounted } from 'vue';

    const pacientes = ref([]);
    const busqueda  = ref('');
    const isSearch  = ref(false);
    const isReady   = ref(false);

    let backupPacientes = [];
    
    onMounted(()=>{
        mostrarPacientes();
    })
 

    const handleSearch = ()=>{
        const arrfilter = pacientes.value.filter(el=> el.nombres?.toLowerCase().includes(busqueda.value.toLowerCase()));
        if(arrfilter.length === 0 ){
            alert('NO HAY COINCIDENCIAS');
        }else{
            isSearch.value = true;
            pacientes.value = arrfilter;
        }
    };

    const handleReset = ()=>{
        pacientes.value = backupPacientes;
        isSearch.value = false;
        busqueda.value = '';
    };

    const mostrarPacientes = async ()=>{
        try{
            const { data } = await axios.get('/api/pacientes');
            pacientes.value = data;
            backupPacientes = data;
            isReady ? isReady.value   = true : null;
        }catch(err){
            console.log(err)
        }
    };

    const borrarPaciente = (id)=>{
        if(confirm("Desea Eliminar el Paciente?")){
            axios.delete(`/api/pacientes/${id}`)
            .then(response=>{
                mostrarPacientes();
            })
            .catch(err=>{
                console.log(err)
            })
        }
    };


</script>
<template>
    <div class="container">
        <div class="row pt-4">
            <div class="col-10">
                <div class="row justify-content-between">
                    <div class="col-md-6 col-lg-4 col-4 ">
                        <div class="input-group mb-3">
                            <input 
                                aria-label="Recipient's username" 
                                aria-describedby="button-addon2" 
                                class="form-control" 
                                placeholder="Nombre Paciente" 
                                type="text" 
                                v-model="busqueda"
                                :disabled="pacientes.length === 0"
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
                                :disabled="pacientes.length === 0"
                            >
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-1 mb-2">
                        <router-link :to='{name:"crearPaciente"}' class="btn btn-success"><i class="fa-solid fa-circle-plus"></i></router-link> 
                    </div>
                </div>
            </div>
            
            <template v-if="pacientes.length > 0">            
                <div class="col-10">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRES</th>
                                    <th>EDAD</th>
                                    <th>CEDULA</th>
                                    <th>CORREO</th>
                                    <th>CELULAR</th>
                                    <th>DIRECCION</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="paciente in pacientes" :key="paciente.id"> 
                                    <td>{{ paciente.id }}</td>
                                    <td>{{ paciente.nombres }}</td>
                                    <td>{{ paciente.edad }}</td>
                                    <td>{{ paciente.cedula }}</td>
                                    <td>{{ paciente.correo }}</td>
                                    <td>{{ paciente.celular }}</td>
                                    <td>{{ paciente.direccion }}</td>
                                    <td >
                                        <router-link :to='{name:"editarPaciente", params:{id:paciente.id}}' class="btn btn-info d-inline m-1">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </router-link>
                                        <router-link :to='{name:"crearCita", params:{id:paciente.id}}' class="btn btn-info d-inline m-1">
                                            <i class="fa-solid fa-calendar-plus"></i>
                                        </router-link>
                                        <a type="button" @click="borrarPaciente(paciente.id)" class="btn btn-danger d-inline">
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
                        <h1>NO HAY PACIENTES</h1>
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
