<template>
    <div class="LoginView">
        <h2>Connexion form</h2>
        <p class="errorMessage">{{ errorMessage }}</p>
        <form @submit.prevent="loginSubmit" class="login_form">

            <div class="login_field">
                <label for="login_email">Email*</label>
                <input id="login_email" class="standart_form_input" autocomplete @change="onChangeEmail" type="text" :value="email">
            </div>

            <div class="login_field">
                <label for="login_password">Password*</label>
                <input id="login_password" class="standart_form_input" autocomplete @change="onChangePassword" type="password" :value="password">
            </div>

            <div class="login_field">
               <button class="login_submit" type="submit">Connexion</button>
            </div>

        </form>
    </div>
</template>

<script>
import router from '@/router/index.js';
import { useAuthStore } from "../stores/authStore.js";

export default {
  name: 'LoginView',
  computed: {
        errorMessage() {
            const authStore = useAuthStore();
            return authStore.getErrorMessage;
        },
        email() {
            const authStore = useAuthStore();
            return authStore.getEmail;
        },
        password() {
            const authStore = useAuthStore();
            return authStore.getPassword;
        },
    },
    methods: {
        onChangeEmail(event) {
            const authStore = useAuthStore();
            authStore.setEmailValue(event.target.value);
        },
        onChangePassword(event) {
            const authStore = useAuthStore();
            authStore.setPasswordValue(event.target.value);
        },
        async loginSubmit(event) {
            const authStore = useAuthStore();
            await authStore.loginAction();
            router.push("/");
        },
    }
}
</script>

<style scoped>
.LoginView {
    margin: 3rem;
}
.errorMessage {
    color: red;
}
.login_form {
    min-width: 250px;
    max-width: 400px; 
    width: 50%;
    margin: auto; 
}
label {
    text-align: left;
}
.login_field {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: .8rem 0;
}
.standart_form_input {
    width: 100%;
    height: 1.6rem;
    border: none;
    background-color: rgb(241, 241, 241);
    border-radius: .2rem;
}
.login_submit {
    cursor: pointer;
    margin: .5rem 0;
    border: solid 2px #00303f;
    border-radius: .2rem;
    padding: .3rem .8rem;
    font-size: 1rem;
    font-family: 'Clowey', sans-serif;
    font-weight: 600;
    height: 42px;
    margin-left: 1rem;
    background-color: #1d975e;
    color: #fff;
    width: fit-content;
    min-width: 150px;
    align-self: flex-end;
    transition: .2s;
}
.login_submit:hover {
    background-color:#fff;
    color: #1d975e;
    border: 2px solid #1d975e;
}
</style>