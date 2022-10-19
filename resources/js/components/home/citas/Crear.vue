<template>
    <div class="container">
        <div class="row pt-3 justify-content-center">
            <div class="col-6">
                <div class="card">              
                    <div class="card-header">
                        <h4>
                            Crear Consulta  
                        </h4>
                    </div> 
                </div>
                <div class="card-body">
                    <form @submit.prevent="crear">
                        <div class="row mt-4">
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Nombres</span>
                                    <input type="text" class="form-control" v-model="consulta.nombre_paciente" :readonly="true">
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Cedula&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <input type="text" class="form-control" v-model="consulta.cedula_paciente" :readonly="true" >
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Doctor&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <input type="phone" class="form-control" v-model="consulta.doctor" autofocus>
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Sucursal&nbsp;</span>
                                    <input type="text" class="form-control" v-model="consulta.sucursal">
                                </div>
                            </div>
                            <div class="col-8 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Fecha&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <input type="date" class="form-control" v-model="consulta.fecha_cita">
                                </div>
                            </div>
                            <div class="col-4 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Hora&nbsp;&nbsp;&nbsp;</span>
                                    <input type="time" class="form-control" v-model="consulta.hora_cita">
                                </div>
                            </div>
                            <div class="col-6">
                                <router-link 
                                    aria-current="page"
                                    to='/consultas' 
                                >
                                    <button class="btn btn-secondary btn-lg">
                                        Cancelar <i class="fa-regular fa-square-left"></i>
                                    </button>        
                                </router-link>
                            </div>
                            <div class="col-6">
                                <button type="submit" class="btn btn-primary btn-lg">Crear <i class="fa-solid fa-floppy-disk"></i> </button>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:"crearConsulta",
    data(){
        return{
            consulta:{
                nombre_paciente:"",
                cedula_paciente:"",
                doctor:"",
                sucursal:"",
                fecha_cita:"",
                hora_cita:"",
                edad:""
            }
        }
    },
    mounted(){
        this.dataCliente()
    },
    methods:{
        async dataCliente(){
            this.axios.get(`/api/pacientes/${this.$route.params.id}`)
                    .then(response=>{
                        const { nombres, cedula, edad  } = response.data
                        this.consulta.nombre_paciente = nombres;
                        this.consulta.cedula_paciente = cedula;
                        this.consulta.edad = edad;
                    })
                    .catch(err=>{
                        console.log(err)
                    })
        },
        async crear(){
            console.log(this.consulta)
            await this.axios.post('/api/consultas', this.consulta)
                    .then(response=>{
                        this.$router.push({name:"mostrarCitas"})
                    })
                    .catch(err=>{
                        console.log(err)
                    })
        }
    }
}
</script>