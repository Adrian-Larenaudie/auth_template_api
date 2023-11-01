import { createRouter, createWebHistory } from 'vue-router'

import LoginView from "../views/LoginView.vue";
import LayoutView from "../views/LayoutView.vue";
import UsersView from "../views/UsersView.vue";
import SingleUserView from "../views/SingleUserView.vue";
import CreateUserView from "../views/CreateUserView.vue";
import UpdateUserView from "../views/UpdateUserView.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: LoginView
    },
/*     {
        path: "/",
        redirect: "/users"
    }, */
    {
        path: "/",
        name: "Layout",
        component: LayoutView,
        children: [
            { path: 'users', name: 'users', component: UsersView },
            { path: 'user/:id', name: 'singleUser', component: SingleUserView },
            { path: 'user/create', name: 'createUser', component: CreateUserView },
            { path: 'user/update', name: 'updateUser', component: UpdateUserView },
        ]
    },
    {
        path: '/:pathMatch(.*)*', redirect: '/users',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const connectedGuard = () => {
    let token = localStorage.getItem("access_token");
    if(token) {
        return true;
    }
    router.push("/login");
};

const notConnectedGuard = () => {
    let token = localStorage.getItem("access_token");
    if(!token) {
        return true;
    }
    router.push("/users");
};

router.beforeEach((to, from, next) => {
    if(to.matched[0].name !== "login") {
        connectedGuard();
    }
    if(to.matched[0].name === "login") {
        //notConnectedGuard();
    }
    next();
});

export default router