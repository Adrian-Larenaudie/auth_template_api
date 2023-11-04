<template>
    <div class="LoginView">
        <h2>Create new user</h2>
        <p class="errorMessage">{{ errorMessage }}</p>
        <form @submit.prevent="loginSubmit" class="login_form">

            <div class="login_field">
                <label for="login_email">Username*</label>
                <input id="login_email" class="standart_form_input" autocomplete @change="onChangeEmail" type="text" :value="username">
            </div>

            <div class="login_field">
                <label for="login_email">Email*</label>
                <input id="login_email" class="standart_form_input" autocomplete @change="onChangeEmail" type="text" :value="email">
            </div>

            <div class="login_field">
                <label for="login_password">Password*</label>
                <input id="login_password" class="standart_form_input" autocomplete @change="onChangePassword" type="password" :value="password">
            </div>

            <div class="login_field">
                <label for="login_role">Role*</label>
                <select class="standart_form_input" id="login_role" :value="userRole">
                    <option>Admin</option>
                    <option>User</option>
                </select>
            </div>

            <div class="login_field">
               <button class="login_submit" type="submit">Create</button>
            </div>

        </form>
    </div>
</template>

<script>

export default {
    name: 'UserView',
    computed: {

    },
    methods: {

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
.login_form {
    min-width: 250px;
    max-width: 600px; 
    width: 50%;
    margin: auto; 
}
label {
    text-align: left;
}
.login_field {
    width: 100%;
    display: flex;
    max-width: 450px; 
    flex-direction: column;
    margin: .8rem auto;
}
.standart_form_input {
    width: 100%;
    height: 2.2rem;
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