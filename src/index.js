// CSS
import "./css/style.css";


// Vue
import Vue from "vue";
import VueRouter from "vue-router";


// Views
import App from "./App.vue";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Reports from "./views/Reports.vue";
import Login from "./views/Login.vue";
// import TopNavbar from "./views/TopNavbar.vue";


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
    render: v => v(App),
    // components: {
    //     // TopNavbar // Shorthand for "top-navbar": TopNavbar
    //     App // Shorthand for "top-navbar": TopNavbar
    // }
}).$mount("#app");
