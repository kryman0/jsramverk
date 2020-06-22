<template>
    <div>
        <form v-on:submit.prevent="postForm">
            <input name="text" type="text" v-model="text" />
            <input type="submit" value="Register" />
            <input type="button" value="Clear form" v-on:click="clearForm" />
        </form>
    </div>
</template>

<script>
import utils from "../models/utils";

export default {
    data: function () {
        return {
            text: null,
        };
    },
    // updated: function () {
    //     this.$nextTick(function () {
    //         this.postForm();
    //     });
    // },
    methods: {
        postForm: function () {
            console.log(this.text);
            // let form = document.getElementById("registerForm");
            // console.log(form);

            const data = { text: "hellos" };
            // let request = new Request(
            //     utils.localhostFullUrl() + "/register", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     // body: new FormData(document.getElementById("registerForm")),
            //     body: JSON.stringify(data),
            // });

            // fetch(request)
            // .then(response => response.json())
            // .then(data => console.log(data))
            // .catch(err => console.log(utils.messages.error, err));
        },
        clearForm: function () {
            this.text = null;
        }
    },
}
</script>
