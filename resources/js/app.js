import './bootstrap';
import App from './components/App.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';


//importamos y configuramos el vue-router
import { createWebHistory, createRouter } from "vue-router";
import { routes } from './routes';
import { createApp } from 'vue';



const router = createRouter({
    history: createWebHistory(),
    linkActiveClass:'active',
    routes,
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       if (localStorage.getItem("userToken") == null) {
//         next({
//           path: "/login",
//           params: { nextUrl: to.fullPath },
//         });
//       } else {
//         if (!store.state.isAuthenticated) {
//           next({
//             path: "/",
//             params: { nextUrl: to.fullPath },
//           });
//         } else {
//           next();
//         }
//       }
//     } else {
//       next();
//     }
//   });

createApp(App)
    .use(VueAxios, axios)
    .use(router)
    .mount('#app')