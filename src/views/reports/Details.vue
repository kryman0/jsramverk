<template>
    <div>
        <p>{{ report.title }}</p>
        <p>{{ report.text }}</p>
        <p>Week: {{ report.week }}</p>

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
                <textarea id="text" name="text" v-model="report.text"></textarea>
                
                <label for="week">Week</label>
                <input id="week" type="number" min="3" max="52" name="week" v-model="report.week" />

                <label for="user_email">Email</label>
                <input id="user_email" type="text" name="user_email" v-bind:value="reportObj.email" readonly />

                <input type="submit" value="Edit report" />
            </fieldset>
        </form>

        <p>{{ msg }}</p>
    </div>
</template>

<script>
import utils from "../../models/utils";


export default {
    name: "Details",
    props: {
        reportObj: Object
    },
    // props: [ "report" ],
    data: function () {
        console.log("from details:", this.reportObj);
        return {
            remove: null,
            edit: null,
            report: this.reportObj.report[0],
            msg: null,
        }
    },
    methods: {
        editReport(crud, report) {
            console.log(crud, report);

            let request = new Request(utils.localhostFullUrl() + "/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    crud: crud,
                    report: report,
                })
            });

            // console.log(request);

            fetch(
                request
            ).then(
                resp => resp.json()
            ).then(
                dbMsg => {
                    // if (dbMsg.errno) {
                    //     return this.msg = utils.messages.error + " " + JSON.stringify(dbMsg);
                    // }

                    alert(dbMsg);
                    
                    if (crud == "delete") {                        
                        window.location.assign("/#/reports");                        
                    }

                    this.msg = dbMsg; // Will probably not run.

                    window.location.reload();
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
