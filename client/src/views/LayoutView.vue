<template>
    <div class="LayoutView">
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
    }

}
</script>

<style scoped>
</style>