// CSS
import "./css/style.css";

// Vue
import Vue from "vue";
import VueRouter from "vue-router";

// Views
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Reports from "./views/Reports.vue";
import Login from "./views/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/register", component: Register },
        { path: "/reports", component: Reports },
        { path: "/reports/week/:id", component: Reports },
        { path: "/login", component: Login },
    ],
});

new Vue({
    router,
}).$mount("#app");
