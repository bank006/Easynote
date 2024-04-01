import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home/Home.vue";
import Login from "../components/Login/Login.vue";
import Navbar from "../components/Navbar/Navbar.vue"
import Project from "../components/Titleproject/Project.vue"
import Register from "../components/register/Register.vue"

const router = createRouter({
    history : createWebHistory('/'),
    routes:[
        {
            path:"/",
            name:"Login",
            component: Login,
        },
        {
            path:"/Home/:idproject", 
            name:"Home",
            component: Home,
            props: true 
        },{
            path:'/Navbar',
            name:"Navbar",
            component: Navbar,
        },{
            path:'/Project/:iduser',
            name:"Project",
            component:Project,
            props: true 
        },{
            path:'/Register',
            name:"Register",
            component:Register
        }
    ]
})

export default router;