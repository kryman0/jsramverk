<template>
    <div>
        <!-- <button v-if="!$route.params.id">add</button> -->

        <form>
            <fieldset>
                <legend>Add report</legend>

                <label for="title">Title</label>
                <input id="title" type="text" name="title" />

                <label for="text">Text</label>
                <input id="text" type="text" name="text" />

                <label for="user_email">Email</label>
                <input id="user_email" type="text" name="user_email" readonly />

                <input type="submit" value="Add report" />
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddReport",
    data: function () {
        return {

        }
    }
}
</script>
