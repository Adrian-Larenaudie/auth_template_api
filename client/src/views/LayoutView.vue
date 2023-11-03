<template>
    <div class="LayoutView">
        <HeaderCpt />
        <RouterView/>
    </div>
</template>

<script>
import HeaderCpt from "@/components/HeaderCpt.vue";
export default {
    name: 'UserView',
    computed: {

    },
    components: {
        HeaderCpt
    },
    mounted() {
    }

}
</script>

<style scoped>
</style>