<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter  } from 'vue-router';
    import Login from './Login.vue';
    const router = useRouter();
    const isLogin = ref(false);
    const isAdmin = ref(false);

    onMounted(()=>{
        if (localStorage.getItem("userToken")){
            isLogin.value = true;
            const dataCliente = JSON.parse(localStorage.getItem("userToken"));
            if(dataCliente.tipo === 'Administrador') isAdmin.value = true;
        }
    });

    const handleLoginSuccess = ()=>{
        isLogin.value = true;
    };

    const handleAdmin = ()=>{
        isAdmin.value = true;
    };

    const handleLogout = async ()=>{
        await axios.post('/api/logout')
                .then(({data})=>{
                    if(data.message){
                        isLogin.value = false;
                        isAdmin.value = false;
                        localStorage.removeItem("userToken");
                        router.push({name:"login"})
                    }else{
                        alert('System Error');
                    }
                    
                })
                .catch(err=>{
                    console.log(err)
                });
        
    }


</script>
<template>
    <template v-if="isLogin">
        <main>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <router-link 
                        aria-current="page"
                        class="navbar-brand"
                        to='/home' 
                    >
                        <img src="https://laravel.com/img/logomark.min.svg" alt='SYSTEM-HOSPITAL' width="30" height="24"/>
                    </router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item m-1">
                            <router-link 
                                aria-current="page"
                                class="nav-link btn btn-secondary"
                                to='/home' 
                            >
                                <i class="fa-solid fa-house-user"></i>
                            </router-link>
                        </li>
                        <template v-if="isAdmin">
                            <li class="nav-item m-1">
                            <router-link 
                                aria-current="page"
                                class="nav-link btn btn-primary"
                                to='/usuarios' 
                            >
                                USUARIOS
                            </router-link>
                        </li>
                        </template>
                        <li class="nav-item m-1">
                            <router-link 
                                aria-current="page"
                                class="nav-link btn btn-primary"
                                to='/pacientes' 
                            >
                                PACIENTES
                            </router-link>
                        </li>
                        <li class="nav-item m-1">
                            <router-link 
                                aria-current="page"
                                class="nav-link btn btn-primary"
                                to='/consultas' 
                            >
                                CONSULTAS
                            </router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item m-1">
                            <button 
                                aria-current="page"
                                class="nav-link btn btn-primary"
                                @click="handleLogout"
                            >
                                LOGOUT
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </li>
                        
                    </ul>
                    </div>
                </div>
            </nav>
            <div class="container text-center">
                <router-view>

                </router-view>
            </div>
        </main>
    </template>
    <template v-else>
        <main>
            <div class="container text-center">
                <router-view >
                    <Login :isLogin="isLogin" @handleLoginSuccess="handleLoginSuccess" @handleAdmin="handleAdmin"/>
                </router-view>
            </div>
        </main>
    </template>
</template>
