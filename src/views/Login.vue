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
import Utils from "../models/utils";


export default {
    data: function () {
        return {
            email: null,
            password: null,
            token: null,
            errorFromPost: null,
            successFromPost: null,
        };
    },
    computed: {
        message: function () {
            return {
                'error-message': this.errorFromPost,
                'success-message': this.successFromPost
            };
        }
    },
    methods: {
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
                        this.successFromPost = Utils.messages.login;
                        this.errorFromPost = false;
                        // console.log(this.token);
                    }
                }
            ).catch(err => {
                this.errorFromPost = Utils.messages.error + " " + err;
                this.successFromPost = false;
            });
        }
    }
}
</script>
