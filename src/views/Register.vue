<template>
    <div>
        <form class="form-layout" v-on:submit.prevent="postForm">
            <fieldset>
                <legend>Register</legend>
                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="email" v-model="email" />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" v-model="password" />
                    <input type="submit" value="Register" />
            </fieldset>
        </form>
        <!-- <p v-bind:class="{
            successMessage: successFromPost,
            errorMessage: errorFromPost
        }"> -->
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
        postForm: function () {
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

<style scoped>
    .form-layout {
        width: 500px;
        margin: 50px 0;
    }

    input {
        display: block;
        width: 150px;
        margin: 5px 0;
        padding: 5px;
    }

    input[type="submit"] {
        width: 164px;
        margin-top: 20px;
        cursor: pointer;
    }

    label {
        display: block;
        margin: 10px 0 0;
    }

    .success-message {
        color: green;
    }

    .error-message {
        color: red;
    }
</style>
