<template>
    <div>
        <p>Reports for week {{ $route.params.id }}</p>
        <p>
            <span v-html="readme"></span>
        </p>
    </div>
</template>

<script>
import Utils from "../models/utils";

const marked = require("marked");

export default {
    data: function () {
        return {
            readme: null,
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getReadme();
        });
    },
    methods: {
        getReadme() {
            fetch(Utils.localhostFullUrl() + "/reports/week/1").then(
                resp => resp.text(),
            ).then(data => {
                this.readme = marked(JSON.parse(data), { pedantic: true });
                // console.log(marked(this.readme));
            }).catch(err => console.log("Something went wrong:", err));
        },
    },
};
</script>

<style scoped>
    p {
        background-color: lightblue;
    }
</style>
