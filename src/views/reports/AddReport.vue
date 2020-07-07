<template>
    <div>
        <form v-on:submit.prevent="createReport">
            <fieldset>
                <legend>Add report</legend>

                <label for="title">Title</label>
                <input id="title" type="text" name="title" v-model="title" />

                <label for="text">Text</label>
                <input id="text" type="text" name="text" v-model="text" />

                <label for="week">Text</label>
                <input id="week" type="number" min="3" name="week" v-model="week" />

                <label for="user_email">Email</label>
                <input id="user_email" type="text" name="user_email" v-bind:value="report.email" readonly />

                <input type="submit" value="Add report" />
            </fieldset>
        </form>
    </div>
</template>

<script>
import Utils from "../../models/utils";


export default {
    name: "AddReport",
    props: {
        report: Object,
    },
    data: function () {
        return {
            title: this.title,
            text: this.text,
            week: this.week,
        }
    },
    methods: {
        createReport: function () {
            fetch(Utils.localhostFullUrl + "/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: this.title,
                    text: this.text,
                    week:  this.week,
                    email: report.email
                })
            }).then(resp => {
                return resp.json();
            }).then(data => {
                if (data.errno) {
                    return Utils.messages.error + " " + JSON.stringify(data);
                } else {
                    return "Successfully created a new report!";
                }
            }).catch(error => {
                return Utils.messages.error + " " + error;
            });
        }
    }
}
</script>
