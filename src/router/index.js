import {createRouter, createWebHistory} from 'vue-router'
import Live from '../views/Live.vue'
import Update from '../views/Update.vue'

const routes = [
    {
        path: '/',
        name: 'Live',
        component: Live
    },
    {
        path: '/update',
        name: 'Update',
        component: Update
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router