<template>
    <div>
        <form v-on:submit.prevent="createReport">
            <fieldset>
                <legend>Add report</legend>

                <label for="title">Title</label>
                <input id="title" type="text" name="title" v-model="title" />

                <label for="text">Text</label>
                <textarea id="text" name="text" v-model="text"></textarea>
                
                <label for="week">Week</label>
                <input id="week" type="number" min="3" max="52" name="week" v-model="week" />

                <label for="user_email">Email</label>
                <input id="user_email" type="text" name="user_email" v-bind:value="report.email" readonly />

                <input type="submit" value="Add report" />
            </fieldset>
        </form>

        <p>{{ fetchMsg }}</p>
    </div>
</template>

<script>
// Todos:

import Utils from "../../models/utils";


export default {
    name: "AddReport",
    props: {
        report: Object,
    },
    data: function () {
        return {
            title: null,
            text: null,
            week: null,
            fetchMsg: null,
            email: Utils.user.email
        }
    },
    methods: {
        createReport: function () {
            // console.log(this.$parent);
            fetch(Utils.url + "/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-token': this.$parent.token
                },
                body: JSON.stringify({
                    title: this.title,
                    text: this.text,
                    week:  this.week,
                    email: this.report.email
                })
            }).then(
                resp => resp.json()
            ).then(data => {
                if (data.name == "JsonWebTokenError" || 
                    data.startsWith("Database error") ||
                    data.errno || 
                    data.error) {
                    return this.fetchMsg = Utils.messages.error + " " + JSON.stringify(data);
                } else {
                    alert(data);
                    
                    this.$parent.isAddReportBtnClicked = false;
                    this.report.getReports();
                    this.clearForm();
                }
            }).catch(error => {
                this.fetchMsg = Utils.messages.error + " " + error;
            });
        },
        clearForm: function () {
            this.title = null;
            this.text = null;
            this.week = null;
        }
    }
}
</script>
