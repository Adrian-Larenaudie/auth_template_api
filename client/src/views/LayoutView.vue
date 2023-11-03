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
    components: {
        HeaderCpt
    },
}
</script>

<style scoped>
</style>