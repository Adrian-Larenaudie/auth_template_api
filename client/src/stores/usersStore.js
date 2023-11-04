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
        async fetchUserByIdAction() {
            const utilsStore = useUtilsStore();
            const authStore = useAuthStore();
            try {
                utilsStore.toggleIsLoadingValue();  
            } catch (error) {
                if(error.response.status === 401) {
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
            } catch (error) {
                if(error.response.status === 401) {
                    authStore.logoutAction(); 
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async updateUserAction() {
            const utilsStore = useUtilsStore();
            const authStore = useAuthStore();
            try {
                utilsStore.toggleIsLoadingValue();  
            } catch (error) {
                 if(error.response.status === 401) {
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
                    authStore.logoutAction(); 
                } 
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
    }
});