<template>
    <div class="form-layout">
        <form v-on:submit.prevent="postForm">
            <fieldset>
                <legend>Register</legend>
                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="email" v-model="email" />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" v-model="password" />
                    <input type="submit" value="Register" />
            </fieldset>

        </form>
    </div>
</template>

<script>
import utils from "../models/utils";

export default {
    data: function () {
        return {
            email: null,
            password: null,
        };
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
            .then(data => console.log(data))
            .catch(err => console.log(utils.messages.error, err));

            this.clearForm();
        },
        clearForm: function () {
            this.email = null;
            this.password = null;
        },
    },
}
// Todos:
// Kör clearForm i slutet av postForm och skicka en indikation till vyn att det blivit postat.
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
</style>
