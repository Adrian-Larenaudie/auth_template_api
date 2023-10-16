<template>
    <div class="LoginView">
        <h2>Update a user form</h2>
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
                <label for="login_password">Role*</label>
                <select id="login_password" :value="userRole">
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
  name: 'UpdateUserView',
  computed: {

    },
    methods: {

    }
}
</script>

<style scoped>
</style>