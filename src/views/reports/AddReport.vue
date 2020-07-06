<template>
    <div>
        <form v-on:submit.prevent="createReport">
            <fieldset>
                <legend>Add report</legend>

                <label for="title">Title</label>
                <input id="title" type="text" name="title" v-model="title" />

                <label for="text">Text</label>
                <input id="text" type="text" name="text" v-model="text" />

                <label for="user_email">Email</label>
                <input id="user_email" type="text" name="user_email" v-bind:value="report.email" readonly />

                <input type="submit" value="Add report" />
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddReport",
    props: {
        report: Object,
    },
    data: function () {
        return {
            title: this.title,
            text: this.text,
        }
    },
    methods: {
        createReport: function () {
            // console.log(this.title, this.userEmail);
        }
    }
}
</script>
