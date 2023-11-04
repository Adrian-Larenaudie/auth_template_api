<template>
    <div class="LoginView">
        <h2>Create new user</h2>
        <p class="errorMessage">{{ errorMessage }}</p>
        <form @submit.prevent="onSubmitNewUser" class="classic_form">

            <div class="classic_field">
                <label for="username">
                    Username* 
                    <span></span>
                </label>
                <input id="username" class="classic_form_input" autocomplete @change="onChangeField" type="text" :value="username">
            </div>

            <div class="classic_field">
                <label for="email">
                    Email*
                    <span></span>
                </label>
                <input id="email" class="classic_form_input" autocomplete @change="onChangeField" type="text" :value="email">
            </div>

            <div class="classic_field">
                <label for="password">
                    Password*
                    <span></span>
                </label>
                <input id="password" class="classic_form_input" autocomplete @change="onChangeField" type="password" :value="password">
            </div>

            <div class="classic_field">
                <label for="role">
                    Role*
                    <span></span>
                </label>
                <select class="classic_form_input" id="role" @change="onChangeField" :value="userRole">
                    <option>admin</option>
                    <option>user</option>
                </select>
            </div>

            <div class="classic_field">
               <button class="classic_form_submit_button" type="submit">Create</button>
            </div>

        </form>
    </div>
</template>

<script>
import { useUsersStore } from '@/stores/usersStore';


export default {
    name: 'UserView',
    computed: {

    },
    methods: {
        onChangeField(event) {
            const usersStore = useUsersStore();
            const formName = "createUser";
            const fieldName = event.target.id;
            const inputValue = event.target.value;
            usersStore.setFieldValue(formName, fieldName, inputValue);
        },
        onSubmitNewUser() {
            const usersStore = useUsersStore();
            usersStore.createUserAction();
        }
    }
}
</script>

<style scoped>
h2 {
    font-weight: 600;
    font-size: 3rem;
    text-align: center;
    margin: 3rem;
}
.LoginView {
    margin: 3rem;
    margin-top: 10rem;
}
.errorMessage {
    color: red;
}
.classic_form {
    min-width: 250px;
    max-width: 600px; 
    width: 50%;
    margin: auto; 
}
label {
    text-align: left;
}
.classic_field {
    width: 100%;
    display: flex;
    max-width: 450px; 
    flex-direction: column;
    margin: .8rem auto;
}
.classic_form_input {
    width: 100%;
    height: 2.2rem;
    border: none;
    background-color: rgb(241, 241, 241);
    border-radius: .2rem;
}
.classic_form_submit_button {
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
.classic_form_submit_button:hover {
    background-color:#fff;
    color: #1d975e;
    border: 2px solid #1d975e;
}
</style>