import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import {createStore} from 'vuex'

import ColorGame from './components/ColorGame.vue'
import Leaderboard from './components/Leaderboard.vue'
import BaseDialog from './components/BaseDialog.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: ColorGame },
    { path: '/leaderboard', component: Leaderboard }]
});

// const store = createStore({
//     state(){
//         return{
//             leaders:0
//         }
//     },
//     mutations:{

//     },
//     actions:{

//     },
//     getters:{

//     }
// });



const app = createApp(App);
app.component('base-dialog', BaseDialog);

app.use(router);
// app.use(store);
app.mount('#app');
