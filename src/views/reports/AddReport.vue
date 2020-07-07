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
                <input id="week" type="number" min="3" name="week" v-model="week" />

                <label for="user_email">Email</label>
                <input id="user_email" type="text" name="user_email" v-bind:value="report.email" readonly />

                <input type="submit" value="Add report" />
            </fieldset>
        </form>

        <p>{{ messageFromDb }}</p>
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
            messageFromDb: null
        }
    },
    methods: {
        createReport: function () {
            fetch(Utils.localhostFullUrl() + "/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-access-token': this.report.token
                },
                body: JSON.stringify({
                    title: this.title,
                    text: this.text,
                    week:  this.week,
                    email: this.report.email
                })
            }).then(resp => {
                return resp.json();
            }).then(data => {
                if (data.errno || data.error) {
                    this.messageFromDb = Utils.messages.error + " " + JSON.stringify(data);
                } else {
                    this.messageFromDb = "Successfully created a new report!";
                }

                return this.messageFromDb;
            }).catch(error => {
                this.messageFromDb = Utils.messages.error + " " + error;

                return this.messageFromDb;
            });
        }
    }
}
</script>
