<template>
    <div>
        <top-navbar />
        <router-view></router-view>
    </div>
</template>

<script>
import TopNavbar from "./components/TopNavbar.vue";


export default {
    name: "App",
    components: {
        TopNavbar,
    }
}
</script>
