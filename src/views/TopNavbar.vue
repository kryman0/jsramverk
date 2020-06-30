<template>
    <div>
        <router-link to="/">Home</router-link>
        <router-link to="/reports/week/1">Reports w. 1</router-link>
        <router-link to="/reports/week/2">Reports w. 2</router-link>
        <router-link to="/register">Register a user</router-link>
        <router-link to="/login">Login</router-link>
        <router-link v-if="isUserLoggedIn" to="/reports">if login successfull med token...</router-link>
    </div>
</template>

<script>
import Utils from "../models/utils";

export default {
    data: function () {
        return {
            isUserLoggedIn: false,
        }
    },
    watch: {
        isUserLoggedIn: function() {
            console.log(Utils.token);

        }
    },
    methods: {
        checkUserIsLoggedIn: function () {
            if (Utils.token) {
                console.log()
                this.isUserLoggedIn = true;
            }
        }
    }
}
</script>
