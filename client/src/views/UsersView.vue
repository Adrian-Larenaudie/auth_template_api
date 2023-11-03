<template>
    <div class="UsersView">
        <h1>See all users</h1>

    </div>
</template>

<script>
import { useUsersStore } from '../stores/usersStore.js';
export default {
    name: 'UsersView',
    computed: {

    },
    methods: {

    },
    mounted() {
        const usersStore = useUsersStore();
        usersStore.fetchUsersAction();
    }
}
</script>

<style scoped>
</style>