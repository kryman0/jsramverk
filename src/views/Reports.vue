<template>
    <div>
        <div v-if="$route.params.id">
            <p>Reports for week {{ $route.params.id }}</p>
            <p>
                <span v-html="readme"></span>
            </p>
        </div>
        <div v-else>
            <p>Reports</p>
        </div>
    </div>
</template>

<script>
import Utils from "../models/utils";


const marked = require("marked");


export default {
    name: "Reports",
    data: function () {
        return {
            readme: null,
            reports: null,
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            console.log(this.$route.params.id);
            this.getReports(this.$route.params.id);
        });
    },
    updated: function () {
        this.$nextTick(function () {
            // console.log(this.$route.params.id);
            this.getReports(this.$route.params.id);
        });
    },
    methods: {
        getReports(week = null) {
            // console.log(Utils.user.email);
            let request = new Request(
                Utils.localhostFullUrl() + "/reports",

            );

            if (week < 3) {
                request = new Request(Utils.localhostFullUrl() + `/reports/week/${week}`);
            }

            fetch(request).then(
                resp => resp.text(),
            ).then(data => {
                if (week) {
                    this.readme = marked(JSON.parse(data), { pedantic: true });
                }

                this.reports = JSON.parse(data);
                console.log(data);
            }).catch(err => console.log("Something went wrong:", err));
        },
    },
};
</script>
