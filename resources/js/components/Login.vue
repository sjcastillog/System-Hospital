<script setup>
    import axios from 'axios';
    import { useRouter  } from 'vue-router';
    import { ref } from 'vue';
    const { isLogin } = defineProps(['isLogin']);
    const emit = defineEmits(['handleLoginSuccess', 'handleAdmin']);
    const router = useRouter();
    const user = ref({
                email:"",
                password:"",
    });  

    const intoLogin = async ()=>{ 
        await axios.post('/api/login', user.value)
                .then(({data})=>{
                    if(data.id){
                        localStorage.setItem("userToken", JSON.stringify(data));
                        router.push({name:"home"});
                        emit("handleLoginSuccess");
                        if(data.tipo === 'Administrador') emit('handleAdmin');
                    }else{
                        alert('Error de Autenticacion');
                    }
                    
                })
                .catch(err=>{
                    console.log(err)
                });
    };

</script>

<template>
    <div class="container">
        <div class="row pt-3 justify-content-center">
            <div class="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-xs-12 p-2">
                <div class="card">              
                    <div class="card-header">
                        <h4>
                        Login  
                        </h4>
                    </div> 
                    <div class="card-body">
                    <form @submit.prevent="intoLogin">
                        <div class="row mt-4 justify-content-center">
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text bg-primary text-white">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <input type="email" class="form-control" v-model="user.email" required>
                                </div>
                            </div>
                            <div class="col-12 mb-4">
                                <div class="input-group">
                                    <span class="input-group-text bg-primary text-white">Password</span>
                                    <input type="password" class="form-control" v-model="user.password" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <button type="submit" class="btn btn-primary btn-lg">
                                    Entrar
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
