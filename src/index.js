// CSS
import "./css/style.css";


// Vue
import Vue from "vue";
import VueRouter from "vue-router";


// Views
import App from "./App.vue";
import Chat from "./views/chat/Setup.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Reports from "./views/reports/Reports.vue";
import ReportsDetails from "./views/reports/Details.vue";


function component() {    
    const element = document.createElement("div");
    element.id = "app";
    document.body.appendChild(element);


    Vue.use(VueRouter);


    const router = new VueRouter({
        routes: [
            { path: "/", component: Home },
            { path: "/chat", component: Chat },
            { path: "/register", component: Register },
            { path: "/login", component: Login },
            { path: "/reports", component: Reports },
            { path: "/reports/week/:id", component: ReportsDetails },
        ],
    });


    new Vue({
        router,
        render: v => v(App),        
    }).$mount("#app");
}

component();
