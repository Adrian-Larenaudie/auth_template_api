<template>
    <div>
        <RouterView v-if="!isLoading"/>
        <LoaderCpt v-if="isLoading"/>
    </div>
   
</template>

<script>
import LoaderCpt from './components/LoaderCpt.vue';
import { useAuthStore } from './stores/authStore';
import { useUtilsStore } from './stores/utilsStore';
export default {
    name: 'App',
    components: {
        LoaderCpt
    },
    mounted() {
        const authStore = useAuthStore();
        authStore.getCsrfAction();
    },
    computed: {
        isLoading() {
            const utilsStore = useUtilsStore();
            return utilsStore.getIsLoading;
        }
    }
}
</script>

<style>
@font-face {
    font-family: 'Jet Brains Mono';
    src: url('./assets/fonts/JetBrainsMono-Bold.ttf') format('truetype');
    src: url('./assets/fonts/JetBrainsMono-ExtraBold.ttf') format('truetype');
    src: url('./assets/fonts/JetBrainsMono-ExtraLight.ttf') format('truetype');
    src: url('./assets/fonts/JetBrainsMono-Light.ttf') format('truetype');
}
#app {
    font-family: 'Jet Brains Mono', sans-serif;
}
</style>
