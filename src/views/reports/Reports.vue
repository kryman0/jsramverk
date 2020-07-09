<template>
    <div>
        <div v-if="$route.params.id < 3">
            <p>Reports for week {{ $route.params.id }}</p>
            <p><span v-html="readme"></span></p>
        </div>
        <div v-else-if="!$route.params.id">
            <p><button v-on:click="isAddReportBtnClicked = true;">Add report</button></p>
            <AddReport
                v-if="isAddReportBtnClicked"
                v-bind:report="{
                    email: email,
                    token: token,
                    getReports: getReports,
                    isAddReportBtnClicked: isAddReportBtnClicked
                }"
            />
            <p>Reports for user {{ email }}</p>
            <div v-for="report in reports" v-bind:key="report.id">
                <p class="show-pointer" v-on:click="getReport(report.id)">
                    <router-link :to="'/reports/week/' + report.id">{{ report.title }}</router-link>
                </p>
                <p>{{ report.text.slice(0, 200) + " ..." }}</p>
            </div>
        </div>
        <Details v-else-if="$route.params.id > 2 && isReportClicked"
            v-bind="{ report: reportObj }"
        />
    </div>
</template>

<script>
// Todo:
// Kolla token fungerar på backend när crud är klar.

import Utils from "../../models/utils";

import AddReport from "./AddReport.vue";
import Details from "./Details.vue";


const marked = require("marked");


export default {
    name: "Reports",
    components: {
        AddReport,
        Details
    },
    // props: [ "likes" ],
    data: function () {
        return {
            readmeFile: null,
            reportsObj: !this.$route.params.id ? this.getReports() : null,
            reportObj: null,
            email: null,
            isAddReportBtnClicked: false,
            token: Utils.token,
            isReportClicked: false,
        };
    },
    computed: {
        reports: {
            get: function () {
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
        // getReport: {
        //     get: function (id) {
        //         this.reportsObj.forEach(el => {
        //             if (el.id == id)
        //         })
        //         return this.isReportClicked;
        //     },
        //     set: function (value) {
        //         this.isReportClicked = value;
        //     }
        // }
    },
    methods: {
        getReports(week = null) {
            // console.log(this.email);
            let request = new Request(
                Utils.localhostFullUrl() + "/reports",
            );

            if (week < 3) {
                request = new Request(Utils.localhostFullUrl() + `/reports/week/${week}`);
            }

            fetch(
                request
            ).then(
                resp => {
                    return resp.json();
                }
            ).then(data => {
                // data = JSON.parse(data);
                console.log(data.rows);

                if (week) {
                    // console.log(week);
                    return this.readmeFile = marked(data, { pedantic: true });
                }

                // if (data.length > 0) {
                //     return data.rows;
                // }

                this.email = data.email;

                return this.reportsObj = data.rows;
            }).catch(err => console.log("Something went wrong:", err));
        },
        getReport: function (id) {

            this.isReportClicked = true;

            this.reportsObj.forEach(el => {
                if (el.id == id) {
                    this.reportObj = el;
                }
            });

            console.log(this.reportObj);
        }
        // goToReport: function (id) {
        //     let request = new Request(
        //         Utils.localhostFullUrl() + "/reports",
        //         {
        //             method: "POST",
        //             body: JSON.stringify({id: id})
        //         }
        //     );
        //     fetch(
        //         request
        //     ).then(
        //         resp => resp.json()
        //     ).then(
        //         data => {
        //             this.
        //         }
        //     ).catch(err => {
        //         return
        //     })
        // }
    },
};
</script>
