import Axios from "../_services/callerService.js";
import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore.js";
import { useAuthStore } from "./authStore.js";

export const useUsersStore = defineStore("users", {
    state: () => ({
        users: [],
        userById: {},
        createUser: {},
        udpateUser: {},
    }),
    getters: {
        getUsers: (state) => {
            return state.users;
        },
        getCreateUser: (state) => {
            return state.createUser;
        },
        getUpdateUser: (state) => {
            return state.udpateUser;
        },
        getUserById: (state) => {
            return state.userById;
        }
    },
    actions: {
        async fetchUsersAction() {
            const utilsStore = useUtilsStore();
            const authStore = useAuthStore();
            try {
                utilsStore.toggleIsLoadingValue();  
                const response = await Axios.get("/users", { headers : { Authorization: `Bearer ${localStorage.getItem("access_token") }` } });
                console.log(response);
                this.users = response.data.users;
            } catch (error) {
                // on 401 status try to refresh connexion
                if(error.response.status === 401) {
                    const routeToGoAfterRefresh = "/users";
                    authStore.refreshConnexionAction(routeToGoAfterRefresh); 
                } else {
                    authStore.logoutAction();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async fetchUserByIdAction(userId) {
            const utilsStore = useUtilsStore();
            const authStore = useAuthStore();
            try {
                utilsStore.toggleIsLoadingValue();  
            } catch (error) {
                if(error.response.status === 401) {
                    const routeToGoAfterRefresh = `/users/${userId}`;
                    authStore.refreshConnexionAction(routeToGoAfterRefresh); 
                } else {
                    authStore.logoutAction();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async createUserAction() {
            const utilsStore = useUtilsStore();
            const authStore = useAuthStore();
            try {
                utilsStore.toggleIsLoadingValue();  
                const body = this.createUser;
                const response = await Axios.post("/users", body,  { headers : { Authorization: `Bearer ${localStorage.getItem("access_token") }` } });
                console.log(response);
            } catch (error) {
                if(error.response.status === 401 || error.response.status === 403) {
                    const routeToGoAfterRefresh = `/users`;
                    authStore.refreshConnexionAction(routeToGoAfterRefresh); 
                } else if (error.response.status === 422) {
                    // TODO créer une méthode dans le store utils pour set les erreurs et les aficher sur les champs correspondents 
                } else {
                    // TODO set un erreur seveur
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async updateUserAction(userId) {
            const utilsStore = useUtilsStore();
            const authStore = useAuthStore();
            try {
                utilsStore.toggleIsLoadingValue();  
            } catch (error) {
                if(error.response.status === 401) {
                    const routeToGoAfterRefresh = `/users/${userId}`;
                    authStore.refreshConnexionAction(routeToGoAfterRefresh); 
                } else {
                    authStore.logoutAction();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async deleteUserAction() {
            const utilsStore = useUtilsStore();
            const authStore = useAuthStore();
            try {
                utilsStore.toggleIsLoadingValue();  
            } catch (error) {
                if(error.response.status === 401) {
                    const routeToGoAfterRefresh = "/users";
                    authStore.refreshConnexionAction(routeToGoAfterRefresh); 
                } else {
                    authStore.logoutAction();
                } 
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        setFieldValue(formName, fieldName, value) {
            this[formName][fieldName] = value;
        },
    }
});