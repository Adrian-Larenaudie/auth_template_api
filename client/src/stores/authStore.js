import { defineStore } from "pinia";
import Axios from "../_services/callerService.js";
import { useUtilsStore } from "./utilsStore";
import router from "@/router/index.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        errorMessage: "",
        email: "admin@admin.com",
        password: "secret",
    }),
    getters: {
        getIsLoading: (state) => {
            return state.isLoading;
        },
        getErrorMessage: (state) => {
            return state.errorMessage;
        },
        getEmail: (state) => {
            return state.email;
        },
        getPassword: (state) => {
            return state.password;
        },
    },
    actions: {
        async getCsrfAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                await Axios.get("/csrf-token");
            } catch (error) {
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async loginAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const response = await Axios.post("/auth/login", { email: this.email, password: this.password });
                console.log(response);
                localStorage.setItem("access_token", response.data.token);    
                localStorage.setItem("session_token", response.data.sessionToken);          
                this.setEmailValue("");
                this.setPasswordValue("");
                this.setErrorMessageValue("");
            } catch (error) {
                console.log(error);
                if(error.response.status === 403) {
                    await this.getCsrfAction();
                    await this.loginAction();
                }
                this.setErrorMessageValue("Bad credentials !");
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async logoutAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                // TODO decoder le jwt avec la clef publique pour extraire le username
                await Axios.post("/auth/logout", { username : "admin", sessionToken: localStorage.getItem("session_token") });
            } catch (error) {
                console.log(error);
            } finally {
                localStorage.removeItem("access_token");  
                localStorage.removeItem("session_token");
                router.go("/login");
                utilsStore.toggleIsLoadingValue();
            }          
        },
        async refreshConnexionAction(routeToGo) {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                // TODO decoder le jwt avec la clef publique pour extraire le username
                const response = await Axios.post("/auth/refresh_token", { username : "admin", sessionToken: localStorage.getItem("session_token") });
                console.log(response);
                localStorage.setItem("access_token", response.data.token);    
                localStorage.setItem("session_token", response.data.sessionToken);
                router.go(routeToGo);      
            } catch (error) {
                // on http request error logout 
                this.logoutAction();
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        setEmailValue(newEmailValue) {
            this.email = newEmailValue;
        },
        setPasswordValue(newPasswordValue) {
            this.password = newPasswordValue;
        },
        setErrorMessageValue(errorMessageValue) {
            this.errorMessage = errorMessageValue;
        }
    }
});