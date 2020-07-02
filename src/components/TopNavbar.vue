<template>
    <div>
        <router-link to="/">Home</router-link>
        <router-link to="/reports/week/1">Reports w. 1</router-link>
        <router-link to="/reports/week/2">Reports w. 2</router-link>
        <router-link to="/register">Register a user</router-link>
        <router-link to="/login">Login</router-link>
        <!-- <router-link v-if="isUserLoggedIn" to="/reports">if login successfull med token...</router-link> -->
        <router-link class="loginUser" to="/reports">if login successfull med token...</router-link>
    </div>
</template>

<script>
// import Login from "../views/Login.vue";
// import Utils from "../models/utils";

export default {
    name: "TopNavbar",
    props: [ "hasLoggedIn" ],
    // components: {
    //     Login
    // },
    data: function () {
        // console.log(this.$children);
        return {
            isUserLoggedIn: false
        }
    },
    methods: {
        checkUserIsLoggedIn: function (value) {
            // const { value } = event.target;
            console.log(value);
            this.isUserLoggedIn = value;
            // if (Utils.token) {
            //     console.log(v)
            //     this.isUserLoggedIn = true;
            // }
        }
    }
}
</script>

<style scoped>
    .loginUser {
        display: none;
    }
</style>
