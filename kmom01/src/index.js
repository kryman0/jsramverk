import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = {
    template: "<p>works</p>",
};

const Reports = {
    template: "<p>Reports for week {{ $route.params.id }}</p>",
};

const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/reports/week/:id", component: Reports },
    ],
});

new Vue({
    router
}).$mount("#app");
