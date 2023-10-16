<template>
    <div>
        <RouterView v-if="!isLoading"/>
        <LoaderCpt v-if="isLoading"/>
    </div>
   
</template>

<script>
import LoaderCpt from './components/LoaderCpt.vue';
export default {
    name: 'App',
    components: {
        
    },
    components: {
        LoaderCpt
    },
    computed: {
        isLoading() {
            return false;
        }
    }
}
</script>

<style>

</style>
