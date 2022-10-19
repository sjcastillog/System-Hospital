<template>
    <div class="container">
        <div class="row pt-3 justify-content-center">
            <div class="col-6">
                <div class="card">              
                    <div class="card-header">
                        <h4>
                        Crear Paciente  
                        </h4>
                    </div> 
                    <div class="card-body">
                        <form @submit.prevent="crear">
                            <div class="row mt-4">
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text">Nombres</span>
                                        <input type="text" class="form-control" v-model="paciente.nombres" autofocus>
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text">Cedula&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="text" class="form-control" v-model="paciente.cedula">
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text">Direccion</span>
                                        <input type="text" class="form-control" v-model="paciente.direccion">
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text">Celular&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="phone" class="form-control" v-model="paciente.celular">
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="email" class="form-control" v-model="paciente.correo">
                                    </div>
                                </div>
                                <div class="col-8 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text">Seguro&nbsp;&nbsp;&nbsp;</span>
                                        <input type="text" class="form-control" v-model="paciente.seguro" placeholder="Privado?">
                                    </div>
                                </div>
                                <div class="col-4 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text">Edad</span>
                                        <input type="number" class="form-control" v-model="paciente.edad" >
                                    </div>
                                </div>
                                <div class="col-6">
                                    <router-link 
                                        aria-current="page"
                                        to='/pacientes' 
                                    >
                                        <button class="btn btn-secondary btn-lg">
                                            Cancelar <i class="fa-regular fa-square-left"></i>
                                        </button>        
                                    </router-link>
                                </div>
                                <div class="col-6">
                                    <button type="submit" class="btn btn-primary btn-lg">Guardar <i class="fa-solid fa-floppy-disk"></i> </button>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:"crearPaciente",
    data(){
        return{
            paciente:{
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
    methods:{
        async crear(){
            await this.axios.post('/api/pacientes', this.paciente)
                    .then(response=>{
                        this.$router.push({name:"mostrarPacientes"})
                    })
                    .catch(err=>{
                        console.log(err)
                    })
        }
    }
}
</script>