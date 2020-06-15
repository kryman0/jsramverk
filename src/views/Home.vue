<template>
    <p>
        {{ me }}
    </p>
</template>

<script>
import css from "css-loader";

export default {
    data: function () {
        //let me = this.getHome();

        return {
            me: "hello"
        };
    },
    methods: {
        getHome: function () {
            return fetch("http://localhost:5000").then(
                resp => {
                    if (!resp.ok) {
                        throw new Error("Response url was not ok.");
                    } else {
                        return resp.text();
                    }
                }
            ).catch(err => {
                console.log("Something went wrong:", err);
            });
        }
    }
};
</script>

<style scoped>
    p {
        background-color: aqua;
    }
</style>
