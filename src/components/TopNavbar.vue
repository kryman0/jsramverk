<template>
    <div class="top-navbar">

        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/reports/week/1">Report for w. 1</router-link></li>
                <li><router-link to="/reports/week/2">Report for w. 2</router-link></li>
                <li><router-link to="/reports/week/3">devops for w. 3</router-link></li>
                <li><router-link to="/reports/week/4">Use cases for w. 4</router-link></li>
                <li><router-link to="/reports/week/10">Report for w. 10</router-link></li>
                <li><router-link to="/register">Register a user</router-link></li>
                <li><router-link to="/login">Login</router-link></li>
                <li v-if="isUserLoggedIn"><router-link to="/reports">Reports</router-link></li>
                <li><router-link to="/chat">Chat</router-link></li>
            </ul>
        </nav>
        
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
