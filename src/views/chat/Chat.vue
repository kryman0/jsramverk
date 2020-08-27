<template>
    <div class="chat-box">
        <div>
            <p>{{ welcomeMsg }}</p>
        </div>

        <div v-if="!isFirstMsgCreated">
            <label for="nickname">Nickname:</label>
            <input style="display: inline;" id="nickname" type="text" v-model="nickname" /> &nbsp; {{ nickname }}
        </div>

        <div v-if="isFirstMsgCreated">
            <p>{{ room }}</p>            
            
            <div class="show-chat-messages" v-for="message in messages" v-bind:key="message.id">
                <!-- <p>{{ message.nickname }}</p>
                <p>{{ message.date }}</p>
                <p>{{ message.mess }}</p> -->
                <p>{{ message }}</p>
            </div>        
        </div>
        
        <div>
            <label for="message">Message:</label>
            <input id="message" type="text" v-on:keyup.enter="sendMsg" v-model="msg" />
            
            <p>{{ emptyMsgAlert }}</p>
        </div>

        <div id="testing">            
            {{ fromServer = null }}
        </div>
    </div>
</template>

<script>
// Todo: origins

// Socket.io-client
import io from "socket.io-client";
const socket = io("http://localhost:5000");

socket.on("disconnect", () => {
    console.info("Disconnected");
});


export default {
    name: "Chat",
    data: function() {
        return {
            emptyMsgAlert: null,
            isFirstMsgCreated: false,
            msg: "",
            msgFromSocketServer: null,
            msgs: [],
            nickname: "",
            numberOfMsgs: 0,
            room: null,
            welcomeMsg: "",
        }
    },
    beforeCreate: function() {
        socket.on("connect", () => {
            console.log("Connected");
            
            socket.on("welcome msg", (data) => {
                this.welcomeMsg = data;
            });

            socket.on("intro room msg", (data) => {
                this.room = data;
            });
        });
    },
    updated: function() {
        this.$nextTick(function() {
            socket.on("chat msg", (data) => {
                // this.socketMsg = data;
                this.messages = data;
                this.isFirstMsgCreated = true;
            });
        });
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
        socketMsg: {
            get: function() {
                return this.msgFromSocketServer;
            },
            set: function(data) {
                this.msgFromSocketServer = data;
            }
        }
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
                // this.socketMsg = data;
                
                
                this.isFirstMsgCreated = true;
            });
        }
    }
}
</script>