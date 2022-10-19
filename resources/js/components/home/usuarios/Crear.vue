<template>
    <div class="container">
        <div class="row pt-3 justify-content-center">
            <div class="col-6">
                <div class="card">              
                    <div class="card-header">
                        <h4>
                        Crear Usuario  
                        </h4>
                    </div> 
                    <div class="card-body">
                        <form @submit.prevent="crear">
                            <div class="row mt-4">
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text bg-primary text-white">Nombres&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="text" class="form-control" v-model="user.name" autofocus required>
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text bg-primary text-white">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="email" class="form-control" v-model="user.email" required>
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text bg-primary text-white">Tipo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="text" class="form-control" v-model="user.tipo" required>
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text bg-primary text-white">Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="password" class="form-control" v-model="user.password" required>
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <div class="input-group">
                                        <span class="input-group-text bg-primary text-white">Confirm Pass</span>
                                        <input type="password" class="form-control" v-model="user.password_confirmation" required>
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
                                    <button type="submit" class="btn btn-success btn-lg">
                                        Crear <i class="fa-solid fa-check"></i> 
                                    </button>
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
            user:{
                name:"",
                email:"",
                password:"",
                password_confirmation:"",
                tipo:"",
            }
        }
    },
    methods:{
        async crear(){
            await this.axios.post('/api/users', this.user)
                    .then(response=>{
                        this.$router.push({name:"mostrarUsuarios"})
                    })
                    .catch(err=>{
                        console.log(err)
                    })
        }
    }
}
</script>