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
                this.setErrorMessageValue("Bad credentials !");
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        logoutAction() {
            localStorage.removeItem("access_token");  
            localStorage.removeItem("session_token");
            router.push("/login");
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