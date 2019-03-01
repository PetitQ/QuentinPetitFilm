import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home.vue';
import ActionFilm from './views/ActionFilm.vue';


Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/movie/add', component: ActionFilm, name: 'add_movie' }, 
    { path: '/movie/:id/edit', component: ActionFilm, name: 'edit_movie' }
];

export default new VueRouter({
    routes
});