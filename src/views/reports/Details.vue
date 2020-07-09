<template>
    <div>
        <p>{{ report.text }}</p>
    </div>
</template>

<script>
import utils from "../../models/utils";


export default {
    name: "Details",
    props: {
        report: Object
    },
    data: function () {
        return {

        }
    },
    methods: {
        goToReport: function (id) {
            let request = new Request(
                Utils.localhostFullUrl() + "/reports",
                {
                    method: "get",
                }
            );

            fetch(
                request
            ).then(
                resp => resp.json()
            ).then(
                data => {
                    return this.report = data;
                }
            ).catch(err => {
                this.msg = Utils
            })
        }
    }
}
</script>
