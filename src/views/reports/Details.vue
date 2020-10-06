<template>
    <div class="container-wrapper">
        <div v-if="$route.params.id < 5 || $route.params.id == 10">
            <h1>Reports for week {{ $route.params.id }}</h1>
            <p><span v-html="readme"></span></p>
        </div>
        
        <div v-else>
            <p>User: {{ report.user_email }}</p>
            <p>{{ report.title }}</p>
            <p style="white-space: pre-line;">{{ report.text }}</p>
            <p>Week: {{ report.week }}</p>

            <div v-if="token">
                <div class="details-view">
                    <button v-on:click.prevent="editReport('delete', report)" name="delete">Delete</button>
                    <button v-on:click="edit = true;" name="edit">Edit</button>
                </div>

                <form v-if="edit" v-on:submit.prevent="editReport('edit', report)">
                    <fieldset>
                        <legend>Edit report</legend>

                        <label for="title">Title</label>
                        <input id="title" type="text" name="title" v-model="report.title" />

                        <label for="text">Text</label>
                        <textarea style="white-space: pre-line" id="text" name="text" v-model="report.text"></textarea>
                        
                        <label for="week">Week</label>
                        <input id="week" type="number" min="4" max="52" name="week" v-model="report.week" />

                        <label for="user_email">Email</label>
                        <input id="user_email" type="text" name="user_email" v-bind:value="report.user_email" readonly />

                        <input type="submit" value="Edit report" />
                    </fieldset>
                </form>
            </div>            
        </div>

        <p>{{ msg }}</p>
    </div>
</template>

<script>
// To do:

import utils from "../../models/utils";


const marked = require("marked");


export default {
    name: "Details",
    data: function () {
        // console.log("from details:", this.$parent.token);
        this.$route.params.id > 2 ? this.getReport(this.$route.params.id) : null;
        return {
            edit: false,
            msg: null,
            readmeFile: null,
            reportObj: {},
            token: this.$parent.token
        }
    },
    computed: {
        report: {
            get: function () {                
                return this.reportObj;
            },
            set: function (value) {
                this.reportObj = value;
            }
        },
        readme: {
            get: function () {
                this.getReport(this.$route.params.id);

                return this.readmeFile;
            },
            set: function (value) {
                this.readmeFile = value;
            }
        }
    },
    methods: {
        getReport(week) {
            // console.log("called?", week);
            let request = new Request(utils.url + `/reports/week/${week}`);

            fetch(
                request
            ).then(
                resp => resp.json()
            ).then(data => {
                // console.log("data:", data);

                if (week < 5) {                    
                    return this.readme = marked(data, { pedantic: true });
                } else if (week == 10) {
                    return this.readme = marked(data, { pedantic: true} );
                }
                
                return this.report = data;
            }).catch(err => console.log("Something went wrong:", err));
        },
        editReport(crud, report) {
            // console.log(crud, report);

            let request = new Request(utils.url + "/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.token
                },
                body: JSON.stringify({
                    crud: crud,
                    report: report
                })
            });

            fetch(
                request
            ).then(
                resp => resp.json()
            ).then(
                dbMsg => {
                    alert(dbMsg);
                    
                    if (crud == "delete") {                        
                        window.location.assign("/#/reports");
                    }
                }
            ).catch(
                err => {
                    this.msg = utils.messages.error + " " + err;
                }
            );
        }
    }
}
</script>
