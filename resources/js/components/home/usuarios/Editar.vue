<template>
    <div class="container">
        <div class="row pt-3 justify-content-center">
            <div class="col-6">
                <div class="card">              
                    <div class="card-header">
                        <h4>
                            Editar Usuario  
                        </h4>
                    </div> 
                </div>
                <div class="card-body">
                    <form @submit.prevent="actualizar">
                        <div class="row mt-4">
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Nombres&nbsp;</span>
                                    <input type="text" class="form-control" v-model="usuario.name" autofocus>
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <input type="email" class="form-control" v-model="usuario.email">
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Tipo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <input type="text" class="form-control" v-model="usuario.tipo">
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text">Password</span>
                                    <input type="password" class="form-control" v-model="usuario.password">
                                </div>
                            </div>
                            <div class="col-6">
                                <router-link 
                                    aria-current="page"
                                    to='/usuarios' 
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
    name:"editarUsuario",
    data(){
        return{
            usuario:{
                name:"",
                email:"",
                password:"",
                tipo:"",
            }
        }
    },
    mounted(){
        this.mostrarUsuario()
    },
    methods:{
        async mostrarUsuario(){
            this.axios.get(`/api/users/${this.$route.params.id}`)
                    .then(response=>{
                        const { name, email, password, tipo } = response.data
                        this.usuario.name = name;
                        this.usuario.email = email;
                        this.usuario.password = password;
                        this.usuario.tipo = tipo;
                    })
                    .catch(err=>{
                        console.log(err)
                    })
        },
        async actualizar(){
            this.axios.put(`/api/users/${this.$route.params.id}`, this.usuario)
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