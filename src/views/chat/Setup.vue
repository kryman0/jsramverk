<template>
    <div>        
        <div class="chat-setup-nickname" v-if="!isNicknameSet">
            <label for="nickname">Please choose your Nickname:</label>
            <input 
                style="display: inline;" id="nickname" type="text" 
                v-model="nickname" v-on:keyup.enter="setNickname" 
                required
            /> &nbsp; {{ nickname }}
            <input type="submit" value="Connect" v-on:click="setNickname" />

            <p>{{ nicknameNotSetALert }}</p>
        </div>

        <Chat
            v-if="!isNicknameSet"
            v-bind:setup="{
                nickname: nickname
            }"
        />
    </div>
</template>

<script>
import Chat from "./Chat.vue";

export default {
    name: "ChatSetup",

    components: {
        Chat
    },

    data: function() {
        return {
            isNicknameSet: false,
            nickname: null,
            nicknameNotSetALert: ""
        }
    },

    methods: {
        setNickname: function() {
            if (this.nickname !== null) {
                this.nicknameNotSetALert = "";

                return this.isNicknameSet = true;
            }

            return this.nicknameNotSetALert = "Enter a nickname please!";
        }
    }
}
</script>