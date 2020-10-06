<template>
    <div class="container-wrapper">
        <h1>Register An Account</h1>
        <form class="form-layout" v-on:submit.prevent="registerUser">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" v-model="email" />
            <label for="password">Password</label>
            <input id="password" name="password" type="password" v-model="password" />
            <input type="submit" value="Register" />
        </form>
        <p v-bind:class="message">
            {{ errorFromPost || successFromPost }}
        </p>
    </div>
</template>

<script>
import utils from "../models/utils";

export default {
    name: "Register",
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
                utils.url + "/register", {
                method: "POST",
                headers: {
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
            })
            .catch(err => {
                this.errorFromPost = utils.messages.error + " " + err;
                this.successFromPost = false;
            });

            this.clearForm();
        },
        clearForm: function () {
            this.email = null;
            this.password = null;
        },
    },
}
</script>
