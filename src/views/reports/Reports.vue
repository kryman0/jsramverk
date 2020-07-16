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
                <p class="show-pointer" v-on:click="getReport(report.week)">
                    <router-link :to="'/reports/week/' + report.week">{{ report.title }}</router-link>
                </p>
                <p>{{ report.text.slice(0, 200) + " ..." }}</p>
            </div>
        </div>
        <!-- <Details v-else-if="$route.params.id > 2 && isReportClicked"
            v-bind="{ report: reportObj }"
        /> -->
        <Details
            v-else-if="$route.params.id > 2 && token && reports"
            v-bind:reportObj="{
                email: email,
                report: reports
                //report: getReports(this.$route.params.id)
            }"
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
    // beforeMount: function () {
    //     this.$nextTick(function () {
    //         return this.getReports(this.$route.params.id);
    //     });
    // },
    // props: [ "likes" ],
    data: function () {
        // console.log("from reports", this.reportsObj);
        return {
            readmeFile: null,
            // reportsObj: !this.$route.params.id ? this.getReports() : null,
            reportsObj: this.getReports(this.$route.params.id),
            // reportObj: this.$route.params.id > 2 ? this.getReports(this.$route.params.id) : null,
            email: null,
            isAddReportBtnClicked: false,
            // token: Utils.token,
            token: true,
            isReportClicked: false,
        };
    },
    computed: {
        reports: {
            get: function () {
                // this.getReports(this.$route.params.id);

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
        }
    },
    methods: {
        getReports(week = null) {
            // console.log("called?", week);
            let request = new Request(
                Utils.localhostFullUrl() + "/reports",
            );

            if (week) {
                request = new Request(Utils.localhostFullUrl() + `/reports/week/${week}`);
            }

            fetch(
                request
            ).then(
                resp => resp.json()
            ).then(data => {
                // console.log("data:", data);

                if (week !== null && week < 3) {
                    // console.log(week);
                    return this.readme = marked(data, { pedantic: true });
                }
                
                // if (week > 2) {
                //     return this.reportObj = data.rows;
                // }
                
                this.email = data.email;

                return this.reports = data.rows;
                // return data.rows;
            }).catch(err => console.log("Something went wrong:", err));
        },
        getReport: function (week) {
            this.reportsObj.forEach(el => {
                if (el.week == week) {
                    // this.reportObj = el;
                    this.reportsObj = el;
                }
            });
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
