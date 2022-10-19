const Home = ()=> import('./components/home/Home.vue');
const Login = ()=> import('./components/Login.vue');



// Componentes para Citas
const MostrarCitas = ()=> import('./components/home/citas/Mostrar.vue');
const CrearCita = ()=> import('./components/home/citas/Crear.vue');
const EditarCita = ()=> import('./components/home/citas/Editar.vue');

// Componentes para Pacientes
const MostrarPacientes = ()=> import('./components/home/pacientes/Mostrar.vue');
const CrearPaciente = ()=> import('./components/home/pacientes/Crear.vue');
const EditarPaciente = ()=> import('./components/home/pacientes/Editar.vue');

// Componentes para Usuarios
const MostrarUsuarios = ()=> import('./components/home/usuarios/Mostrar.vue');
const CrearUsuario = ()=> import('./components/home/usuarios/Crear.vue');
const EditarUsuario = ()=> import('./components/home/usuarios/Editar.vue');


export const routes = [
    {
        name:'root',
        path:'/',
        component:Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'login',
        path:'/login',
        component:Login,
        meta: {
            requiresAuth: false,
        },
    },
    
    {
        name:'home',
        path:'/home',
        component:Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'mostrarUsuarios',
        path:'/usuarios',
        component:MostrarUsuarios,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'crearUsuario',
        path:'/crearUsuario',
        component:CrearUsuario,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'editarUsuario',
        path:'/editarUsuario:id',
        component:EditarUsuario,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'mostrarPacientes',
        path:'/pacientes',
        component:MostrarPacientes,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'crearPaciente',
        path:'/crearPaciente',
        component:CrearPaciente,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'editarPaciente',
        path:'/editarPaciente:id',
        component:EditarPaciente,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'mostrarCitas',
        path:'/consultas',
        component:MostrarCitas,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'crearCita',
        path:'/crearCita:id',
        component:CrearCita,
        meta: {
            requiresAuth: true,
        },
    },
    {
        name:'editarCita',
        path:'/editarCita:id',
        component:EditarCita,
        meta: {
            requiresAuth: true,
        },
    },

]