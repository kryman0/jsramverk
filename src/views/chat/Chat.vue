<template>
    <div class="chat-box">
        <div>
            <p>{{ welcomeMessage }} {{ setup.nickname }}</p>
        </div>

        <div v-if="isFirstMsgCreated = true">
            <p>{{ room }}</p>            
            
            <div class="show-chat-messages">
                <!-- <p>{{ messages }}</p> -->
                <p v-for="message in messages" v-bind:key="message.id">
                    {{ message.nickname }}
                    {{ message.date }}
                    {{ message.mess }}
                </p>
            </div>        
        </div>

        <div>
            <label for="message">Message:</label>
            <input id="message" type="text" v-on:keyup.enter="sendMsg" v-model="msg" />
            
            <p>{{ emptyMsgAlert }}</p>
        </div>

        <div id="testing" v-on:click="saveMsgs"></div>
    </div>
</template>

<script>
import utils from "../../models/utils.js";

// Socket.io-client
import io from "socket.io-client";
const socket = io(utils.url);


export default {
    name: "Chat",

    props: {
        setup: Object
    },

    data: function() {
        return {
            emptyMsgAlert: null,
            isFirstMsgCreated: false,
            msg: "",
            msgs: [],
            numberOfMsgs: 0,
            room: null,
            welcomeMsgFromSckt: ""
        }
    },
    
    created: function() {
        socket.emit("new user", this.setup.nickname);
        
        socket.on("new user", (data) => {
            this.room = data;
        });

        // this.saveMsgs();
        this.getMsgs();
    },
    mounted: function() {
        this.$nextTick(function() {
            
            socket.emit("welcome msg");        
            
            socket.on("welcome msg", (data) => {
                this.welcomeMessage = data;                
            });

            
            socket.on("chat msg", (data) => {
                this.messages = data;
            });
        });
    },
    destroyed: function() {
        socket.emit("disconnect");
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
        welcomeMessage: {
            get: function() {
                return this.welcomeMsgFromSckt;
            },
            set: function(data) {
                this.welcomeMsgFromSckt = data;
            }
        }
    },
    
    methods: {
        sendMsg: function() {
            if (this.msg === "") {
                return this.emptyMsgAlert = "Error! Empty message.";
            }
            
            let messageObj = {
                id: socket.id + ++this.numberOfMsgs,
                nickname: this.setup.nickname,
                date: new Date().toLocaleString(),
                mess: this.msg
            };
            
            socket.emit("chat msg", messageObj);
            
            this.msg = "", this.emptyMsgAlert = "";
            
            this.isFirstMsgCreated = true;
        },
        saveMsgs: function() {
            let messages = [
                {
                    // _id: 1,
                    nickname: "kalle",
                    date: new Date().toLocaleDateString(),
                    mess: "Hello, kalle here"
                },
                {
                    // _id: 2,
                    nickname: "sven",
                    date: "2020-9-2 12:39:39",
                    mess: "How are you?"
                },
                {
                    // _id: 3,
                    nickname: "sven",
                    date: new Date().toLocaleString(),
                    mess: "Where do you live?"
                },
                {
                    // _id: 4,
                    nickname: "sven",
                    date: "2019-12-4 08:07:06",
                    mess: "december month"
                }
            ];

            // console.log(messages);

            fetch(
                utils.url + "/chat", 
                {
                    method: "POST",                    
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ messages })
                }
            ).then(                
                resp => resp.json()
            ).then(
                data => console.log("data", data)
            ).catch(
                error => console.log(error)
            );
        },
        getMsgs: function() {
            // let obj = JSON.stringify({
            //     nickname: this.queryNickname,
            //     date: this.queryDate,
            //     mess: this.queryMessage,
            // });
            
            let obj = JSON.stringify({
                nickname: "sven",
                date: "",
                mess: "",
            });
                        
            fetch(
                utils.url + `/chat/${obj}`, 
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
            ).then(
                resp => {
                    console.log(resp.json());
                }
            ).catch(error => console.log(error));
        }
    }
}
</script>