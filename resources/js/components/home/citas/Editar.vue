<template>
    <div class="container">
        <div class="row pt-3 justify-content-center">
            <div class="col-6">
                <div class="card">              
                    <div class="card-header">
                        <h4>
                            Editar Consulta  
                        </h4>
                    </div> 
                </div>
                <div class="card-body">
                    <form @submit.prevent="actualizar">
                        <div class="row mt-4">
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Nombres</span>
                                    <input type="text" class="form-control" v-model="consulta.nombres" autofocus>
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Direccion</span>
                                    <input type="text" class="form-control" v-model="consulta.direccion">
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Celular&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <input type="phone" class="form-control" v-model="consulta.doctor">
                                </div>
                            </div>
                            <div class="col-8 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <input type="email" class="form-control" v-model="consulta.sucursal">
                                </div>
                            </div>
                            <div class="col-4 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Seguro&nbsp;&nbsp;&nbsp;</span>
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
                                <button type="submit" class="btn btn-primary btn-lg">Actualizar <i class="fa-solid fa-pen-to-square"></i> </button>
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
    name:"editarPaciente",
    data(){
        return{
            consulta:{
                nombres:"",
                cedula:"",
                correo:"",
                celular:"",
                direccion:"",
                edad:"",
                seguro:"",
            }
        }
    },
    mounted(){
        this.mostrarConsulta()
    },
    methods:{
        async mostrarConsulta(){
            this.axios.get(`/api/consultas/${this.$route.params.id}`)
                    .then(response=>{
                        const { nombres, cedula, correo, celular, direccion, edad, seguro } = response.data
                        this.consulta.nombres = nombres;
                        this.consulta.cedula = cedula;
                        this.consulta.correo = correo;
                        this.consulta.celular = celular;
                        this.consulta.direccion = direccion;
                        this.consulta.edad = edad;
                        this.consulta.seguro = seguro
                    })
                    .catch(err=>{
                        console.log(err)
                    })
        },
        async actualizar(){
            this.axios.put(`/api/consultas/${this.$route.params.id}`, this.consulta)
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