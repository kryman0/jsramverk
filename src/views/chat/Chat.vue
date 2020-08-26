<template>
    <div class="chat-box">
        <div v-if="!isFirstMsgCreated">
            <label for="nickname">Nickname:</label>
            <input id="nickname" type="text" v-model="nickname" />
        </div>

        <div v-if="!isFirstMsgCreated">
            <p>Your nickname is: {{ nickname }}</p>
        </div>

        <div class="show-chat-messages" v-for="message in messages" v-bind:key="message.id">
            <!-- <p>{{ message.nickname }}</p>
            <p>{{ message.date }}</p>
            <p>{{ message.mess }}</p> -->
            <p>{{ message }}</p>
        </div>
        
        <div>
            <label for="message">Message</label>
            <input id="message" type="text" v-on:keyup.enter="sendMsg" v-model="msg" />
            
            <p>{{ emptyMsgAlert }}</p>
        </div>
    </div>
</template>

<script>
// Socket.io-client
import io from "socket.io-client";
const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected");
});

socket.on("disconnect", () => {
    console.info("Disconnected");
});


export default {
    name: "Chat",
    data: function() {
        return {
            msg: "",
            msgs: [],
            nickname: "",
            numberOfMsgs: 0,
            isFirstMsgCreated: false,
            emptyMsgAlert: null,
        }
    },
    computed: {
        messages: {
            get: function() {
                return this.msgs;
            },
            set: function(msg) {
                this.msgs.push(msg);
            }
        },
        // nickname: {
        //     get: function() {
        //         return this.nick;
        //     },
        //     set: function(name) {
        //         this.nick = name;
        //     }
        // }
    },
    methods: {
        sendMsg: function() {
            if (this.msg === "") {
                return this.emptyMsgAlert = "Error! Empty message.";
            }
            
            socket.emit("chat msg", this.msg);
            
            this.msg = "", this.emptyMsgAlert = "";

            
            socket.once("chat msg", (data) => {
                let messageObj = {
                    id: ++this.numberOfMsgs,
                    nickname: this.nickname,
                    date: new Date().toLocaleString(),
                    mess: data
                };

                this.messages = messageObj;
                
                
                this.isFirstMsgCreated = true;
            });
        }
    }
}
</script>