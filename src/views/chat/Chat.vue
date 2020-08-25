<template>
    <div class="chat-box">
        <div v-if="!isNicknameSet">
            <input type="text" v-model="nickname" v-on:keyup.enter="sendNickname" />
        </div>

        <div class="show-chat-messages"></div>
        
        <div>
            <input type="text" v-on:keyup.enter="sendMsg" v-model="msg" />
        </div>
    </div>
</template>

<script>
// Socket.io-client
import io from "socket.io-client";
const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.info("Connected");
});

socket.on("disconnect", () => {
    console.info("Disconnected");
});


export default {
    name: "Chat",
    data: function() {
        return {
            msg: "",
            nickname: "",
            isNicknameSet: false
        }
    },
    methods: {
        sendNickname: function() {
            socket.emit("send nickname", this.nickname);
            this.isNicknameSet = true;

        },
        sendMsg: function() {            
            socket.emit("send msg", this.msg);
        }
    }
}
</script>