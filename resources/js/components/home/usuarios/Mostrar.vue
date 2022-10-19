<script setup>
    import axios from 'axios';
    import { ref } from 'vue';

    const users = ref([]);
    const busqueda  = ref('');
    const isSearch  = ref(false);
    const isReady   = ref(false);

    let backupUsers = [];
    
 

    const handleSearch = ()=>{
        const arrfilter = users.value.filter(el=> el.name?.toLowerCase().includes(busqueda.value.toLowerCase()));
        if(arrfilter.length === 0 ){
            alert('NO HAY COINCIDENCIAS');
        }else{
            isSearch.value = true;
            users.value = arrfilter;
        }
    };

    const handleReset = ()=>{
        users.value = backupUsers;
        isSearch.value = false;
        busqueda.value = '';
    };

    const showUsers = async ()=>{
        try{
            const { data } = await axios.get('/api/users');
            users.value = data;
            backupUsers = data;
            isReady ? isReady.value   = true : null;
        }catch(err){
            console.log(err)
        }
    };

    const deleteUser = (id)=>{
        if(confirm("Desea Eliminar el Usuario?")){
            axios.delete(`/api/users/${id}`)
            .then(response=>{
                showUsers();
            })
            .catch(err=>{
                console.log(err)
            })
        }
    };

// Ejecutables
showUsers();
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
                                placeholder="Nombre Usuario" 
                                type="text" 
                                v-model="busqueda"
                                :disabled="users.length === 0"
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
                                :disabled="users.length === 0"
                            >
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-1 mb-2">
                        <router-link :to='{name:"crearUsuario"}' class="btn btn-success"><i class="fa-solid fa-circle-plus"></i></router-link> 
                    </div>
                </div>
            </div>
            
            <template v-if="users.length > 0">            
                <div class="col-10">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRES</th>
                                    <th>EMAIL</th>
                                    <th>TIPO</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.id"> 
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.tipo }}</td>
                                    <td >
                                        <router-link :to='{name:"editarUsuario", params:{id:user.id}}' class="btn btn-info d-inline m-1">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </router-link>
                                        <a type="button" @click="deleteUser(user.id)" class="btn btn-danger d-inline">
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
                        <h1>NO HAY USUARIOS</h1>
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
