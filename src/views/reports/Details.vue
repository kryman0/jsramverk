<template>
    <div>
        <p>{{ report.title }}</p>
        <p>{{ report.text }}</p>
        <p>Week: {{ report.week }}</p>

        <form class="details-view">
            <button v-on:click="editReport('delete')" name="delete">Delete</button>
            <button v-on:click="editReport('edit')" name="edit">Edit</button>
        </form>
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
            report: this.reportObj.report[0]
        }
    },
    methods: {
        // goToReport: function (id) {
        //     let request = new Request(
        //         Utils.localhostFullUrl() + "/reports",
        //         {
        //             method: "get",
        //         }
        //     );

        //     fetch(
        //         request
        //     ).then(
        //         resp => resp.json()
        //     ).then(
        //         data => {
        //             return this.report = data;
        //         }
        //     ).catch(err => {
        //         this.msg = Utils
        //     })
        // }
    }
}
</script>
