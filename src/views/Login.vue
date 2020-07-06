<template>
    <div>
        <form class="form-layout" v-on:submit.prevent="login">
            <fieldset>
                <legend>Login</legend>
                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="email" v-model="email" />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" v-model="password" />
                    <input type="submit" value="Login" />
            </fieldset>
            <p v-bind:class="message">
                {{ errorFromPost || successFromPost }}
            </p>
        </form>
    </div>
</template>

<script>
// Todos:
// clearForm.

import Utils from "../models/utils";


export default {
    name: "Login",
    // props: [ "userIsNotLoggedIn" ],
    data: function () {
        // console.log(this.$parent.$children[0].isUserLoggedIn);
        return {
            email: null,
            password: null,
            errorFromPost: null,
            successFromPost: null,
            userIsNotLoggedIn: false,
            // "navbar.isUserLoggedIn": true,
        };
    },
    computed: {
        message: function () {
            return {
                'error-message': this.errorFromPost,
                'success-message': this.successFromPost
            };
        },
    },
    methods: {
        clearForm: function () {
            this.email = null;
            this.password = null;
        },
        login: function () {
            let request = new Request(
                Utils.localhostFullUrl() + "/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                }
            );

            fetch(
                request
            ).then(
                resp => resp.json(),
            ).then(
                data => {
                    if (data.errno || data.error) {
                        this.errorFromPost = data.errno ?
                            Utils.messages.error + " " + data :
                            Utils.messages.error + " " + data.error
                        ;
                        this.successFromPost = false;
                    } else {
                        Utils.token = data;
                        Utils.user.email = this.email;
                        this.successFromPost = Utils.messages.login;
                        this.errorFromPost = false;
                        // this.$parent.$children[0].isUserLoggedIn = true;
                        document.getElementsByClassName("top-navbar-remove-element")[0].className = "show-inline-element";
                        this.clearForm();
                    }
                }
            ).catch(err => {
                this.errorFromPost = Utils.messages.error + " " + err;
                this.successFromPost = false;
            });
        },
    }
}
</script>
