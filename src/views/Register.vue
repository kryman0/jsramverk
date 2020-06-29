<template>
    <div>
        <form class="form-layout" v-on:submit.prevent="registerUser">
            <fieldset>
                <legend>Register</legend>
                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="email" v-model="email" />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" v-model="password" />
                    <input type="submit" value="Register" />
            </fieldset>
        </form>
        <p v-bind:class="message">
            {{ errorFromPost || successFromPost }}
        </p>
    </div>

</template>

<script>
import utils from "../models/utils";

export default {
    data: function () {
        return {
            email: null,
            password: null,
            successFromPost: null,
            errorFromPost: null,
        };
    },
    computed: {
        message: function () {
            return {
                'error-message': this.errorFromPost,
                'success-message': this.successFromPost,
            };
        },
    },
    methods: {
        registerUser: function () {
            let request = new Request(
                utils.localhostFullUrl() + "/register", {
                method: "POST",
                headers: {
                    // "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            });

            fetch(request)
            .then(response => response.json())
            .then(data => {
                if (data.errno) {
                    // console.log(JSON.stringify(data));
                    this.errorFromPost = utils.messages.error + " " + JSON.stringify(data);
                } else {
                    this.successFromPost = data;
                    this.errorFromPost = false;
                }
                // console.log("success", this.successFromPost);
            })
            .catch(err => {
                this.errorFromPost = utils.messages.error + " " + err;
                this.successFromPost = false;
                // console.log("error", this.errorFromPost);
            });

            this.clearForm();
        },
        clearForm: function () {
            this.email = null;
            this.password = null;
        },
    },
}
// Todos:
//
</script>
