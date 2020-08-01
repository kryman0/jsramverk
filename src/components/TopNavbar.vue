<template>
    <div>
        <router-link to="/">Home</router-link>
        <router-link to="/reports/week/1">Reports w. 1</router-link>
        <router-link to="/reports/week/2">Reports w. 2</router-link>
        <router-link to="/reports/week/3">devops</router-link>
        <router-link to="/register">Register a user</router-link>
        <router-link to="/login">Login</router-link>
        <router-link v-if="isUserLoggedIn" to="/reports">Reports</router-link>
    </div>
</template>

<script>
export default {
    name: "TopNavbar",
    data: function () {
        return {
            isUserLoggedIn: false,
        }
    }
}
</script>
