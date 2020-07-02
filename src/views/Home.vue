<template>
    <p>
        {{ me }}
    </p>
</template>

<script>
import Utils from "../models/utils";

export default {
    name: "Home",
    data: function () {
        return {
            me: null,
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getHome();
        });
    },
    methods: {
        getHome: function () {
            fetch(Utils.localhostFullUrl()).then(
                resp => resp.text(),
            ).then(
                data => { this.me = data; }
            ).catch(err => console.log("Something went wrong:", err));
        }
    }
};
</script>

<style scoped>
    p {
        background-color: aqua;
    }
</style>
