import { defineStore } from "pinia";

export const useUtilsStore = defineStore("utils", {
    state: () => ({
        isLoading: false,
    }),
    getters: {
        getIsLoading: (state) => {
            return state.isLoading;
        },
        getErrors: (state) => {
            return state.errors;
        },
        getIsErrors: (state) => {
            return state.isErrors;
        },
        getSucces: (state) => {
            state.succesMessage;
        }
    },
    actions: {
        toggleIsLoadingValue() {
            this.isLoading = !this.isLoading;
        }
    }
});