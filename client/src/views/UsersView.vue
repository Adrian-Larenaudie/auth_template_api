<template>
    <div class="UsersView">
        <h1>Users</h1>
        <div class="listContainer">
            <ul v-for="user in users" :key="user._id" class="list-group list-group-horizontal">
            <li class="list-group-item">
                <p>Username: <span>{{ user.username }}</span></p>
            </li>
            <li class="list-group-item">
                <p>Email: <span>{{ user.email }}</span></p>
            </li>
            <li class="list-group-item">
                <p>Role: <span>{{ user.role }}</span></p>
            </li>
            <li class="list-group-item">
                <button type="button" class="btn btn-primary">Edit</button>
            </li>
            <li class="list-group-item">
                <button type="button" class="btn btn-danger">Delete</button>
            </li>
        </ul>
        </div>
        
    </div>
</template>

<script>
import { useUsersStore } from '../stores/usersStore.js';
export default {
    name: 'UsersView',
    computed: {
        users() {
            const usersStore = useUsersStore();
            return usersStore.getUsers;
        }
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
h1 {
    font-weight: 600;
    font-size: 3rem;
    text-align: center;
    margin: 3rem;
}

.UsersView {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.list-group-item {
    display: flex;
    align-items: center;
    width: 100%;
}
.list-group-item span {
    font-weight: 600;
}
p {
    margin: 0;
}
</style>