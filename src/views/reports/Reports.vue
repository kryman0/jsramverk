<template>
    <div>
        <p><button v-on:click="isAddReportBtnClicked = true;">Add report</button></p>
        <AddReport
            v-if="isAddReportBtnClicked"
            v-bind:report="{
                email: email,
                getReports: getReports,
                isAddReportBtnClicked: isAddReportBtnClicked
            }"
        />
        <p>Reports for user {{ email }}</p>                        
        <div v-for="report in reports" v-bind:key="report.id">
            <p class="show-pointer">
                <router-link :to="'/reports/week/' + report.week">{{ report.title }}</router-link>
            </p>
            <p style="white-space: pre-line;">{{ report.text.slice(0, 200) + " ..." }}</p>
        </div>
    </div>
</template>

<script>
// Todo:
// Kolla token fungerar på backend när crud är klar.

import Utils from "../../models/utils";

import AddReport from "./AddReport.vue";


export default {
    name: "Reports",
    components: {
        AddReport
    },
    data: function () {
        this.getReports();
        
        return {            
            reportsObj: null,
            email: null,
            isAddReportBtnClicked: false,
            token: Utils.token,
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
        }        
    },
    methods: {
        getReports() {
            // console.log("called?", week);
            let request = new Request(
                Utils.localhostFullUrl() + "/reports",
            );

            fetch(
                request
            ).then(
                resp => resp.json()
            ).then(data => {
                console.log("data:", data);

                this.email = data.email;
                
                return this.reports = data.rows;
                // return data.rows;
            }).catch(err => console.log("Something went wrong:", err));
        }
    }
};
</script>
