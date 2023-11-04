<template>
    <div class="HeaderCpt">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <p class="nav-link">
                    <router-link @click="activeClass"  to="/users">Users</router-link> 
                </p>         
            </li>
            <li class="nav-item">
                <p class="nav-link">
                    <router-link @click="activeClass" to="/user/create">Create user</router-link>
                </p>
            </li>
            <li class="nav-item">
                <button class="logoutButton" @click="logoutEvent">logout</button>
            </li>
        </ul> 

    </div>
</template>

<script>
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
export default {
    name: 'HeaderCpt',
    mounted() {
        const linksTags = document.querySelectorAll('.nav-link a');
        const activeTags = document.querySelectorAll('.nav-link');
        console.log(router.currentRoute._value.fullPath);
        for (let index = 0; index < activeTags.length; index++) {
            const url = new URL(linksTags[index].href);
            console.log(url.pathname);
            const isRouteMatch = url.pathname === router.currentRoute._value.fullPath;
            if(isRouteMatch) {
                activeTags[index].classList.add("active");
            } else {
                activeTags[index].classList.remove("active");
            }
            
        }
    },
    methods: {
        logoutEvent() {
            const authStore = useAuthStore();
            authStore.logoutAction();
        },
        activeClass(event) {
            const linksTags = document.querySelectorAll('.nav-link');
            for (let index = 0; index < linksTags.length; index++) {
                if(event.target.textContent === linksTags[index].textContent) {
                    console.log("active");
                    linksTags[index].classList.add("active");
                } else {
                    linksTags[index].classList.remove("active");
                }       
            }
        }
    }
}
</script>

<style scoped>
a {
    color: rgb(2, 46, 87)4, 63;
    text-decoration: none;
    font-weight: 600;
}
.HeaderCpt {
    margin: 2rem;
}
.logoutButton {
    position: absolute;
    right: 2rem;
    top: 1rem;
    cursor: pointer;
    border: solid 2px #00303f;
    border-radius: .2rem;
    padding: .3rem .8rem;
    font-size: 1rem;
    font-family: 'Clowey', sans-serif;
    font-weight: 600;
    height: 42px;
    margin-left: 1rem;
    background-color: #e14e5c;
    color: #fff;
    width: fit-content;
    min-width: 150px;
    align-self: flex-end;
    transition: .4s;
 }
</style>