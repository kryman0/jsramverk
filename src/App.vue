<template>
    <div>
        <top-navbar />
        <router-view></router-view>
    </div>
</template>

<script>
import TopNavbar from "./components/TopNavbar.vue";
// import Home from "./views/Home.vue";

export default {
    name: "App",
    components: {
        TopNavbar,
        // Home
    },
}
</script>
