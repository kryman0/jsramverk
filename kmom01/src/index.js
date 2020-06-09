// Vue
import Vue from "vue";
import VueRouter from "vue-router";

// Views
import Home from "./views/Home.vue";
import Reports from "./views/Reports.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/reports/week/:id", component: Reports },
    ],
});

new Vue({
    router
}).$mount("#app");
