<template>
    <div>
        <div v-if="$route.params.id">
            <p>Reports for week {{ $route.params.id }}</p>
            <p>
                <span v-html="readme"></span>
            </p>
        </div>
        <div v-else-if="!$route.params.id">
            <p><button v-on:click="createReport">Lägg till rapport</button></p>
            <AddReport v-bind:class="{ 'remove-element': check }" />
            <p>Reports for user {{ email }}</p>
            <div v-for="report in reports" v-bind:key="report.id">
                <p class="show-pointer" v-on:click="goToReport(report.id)">Title comes here to be clickable.</p>
                <p>{{ report.text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
// Todo:
// När man klickar på en rapport kolla så den inte krockar med route.params.id.
import Utils from "../../models/utils";

import AddReport from "./AddReport.vue";


const marked = require("marked");


export default {
    name: "Reports",
    components: {
        AddReport
    },
    data: function () {
        return {
            readmeFile: null,
            reportsObj: null,
            email: null,
            isAddReportBtnClicked: false,
        };
    },
    // updated: function () {
    //     this.isAddReportBtnClicked = false;
    // },
    computed: {
        reports: {
            get: function () {
                this.getReports();

                return this.reportsObj;
            },
            set: function (value) {
                this.reportsObj = value;
            }
        },
        readme: {
            get: function () {
                this.getReports(this.$route.params.id);

                this.isAddReportBtnClicked = false;

                return this.readmeFile;
            },
            set: function (value) {
                this.readmeFile = value;
            }
        },
        isAddReportBtnClicked: {
            get: function () {

                return this.isAddReportBtnClicked
            },
            set: function (value) {
                this.isAddReportBtnClicked = value;
            }
        }
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
                resp => {
                    return resp.text();
                }
            ).then(data => {
                if (week) {
                    // this.readme = marked(JSON.parse(data), { pedantic: true });
                    // console.log(data);
                    return this.readmeFile = marked(JSON.parse(data), { pedantic: true });
                }

                data = JSON.parse(data);
                this.email = data[0].user_email;

                return this.reportsObj = data;
            }).catch(err => console.log("Something went wrong:", err));
        },
        createReport: function () {
            this.check = true;
        }
        // goToReport: function (id) {
        //     let request = new Request(
        //         Utils.localhostFullUrl() + "/reports",
        //         {
        //             method: "POST",
        //             body: JSON.stringify({id: id})
        //         }
        //     );
        //     fetch(request).then(
        //         resp => {
        //             return resp.json();
        //         }
        //     ).then(data)
        // }
    },
};
</script>
