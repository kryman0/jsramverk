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

            <div>
                <button v-on:click="saveMsgs">Save messages</button>
            </div>
        </div>

        <div>
            <label for="message">Message:</label>
            <input id="message" type="text" v-on:keyup.enter="sendMsg" v-model="msg" />
            
            <p>{{ emptyMsgAlert }}</p>
        </div>

        <div id="testing" class="chat-setup-nickname">
            <label for="query-nickname">Nickname</label>
            <input id="query-nickname" type="text" v-model="queryNickname" />

            <label for="query-date">Date</label>
            <input id="query-date" type="date" v-model="queryDate" />

            <label for="query-message">Message</label>
            <input id="query-message" type="text" v-model="queryMessage" />

            <input type="submit" value="Search" v-on:click="getMsgs" />
        </div>
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
            welcomeMsgFromSckt: "",    
            
            // Query params to search for in mongodb.
            queryNickname: "",
            queryDate: "",
            queryMessage: ""
        }
    },
    
    created: function() {
        socket.emit("new user", this.setup.nickname);
        
        socket.on("new user", (data) => {
            this.room = data;
        });

        this.saveMsgs();
        // this.getMsgs();
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
            
            
            let dTFormatLocales = "sv-SE-u-ca-iso8601-hc-h24";
            let dTFormatOptions = {
                dateStyle: "short",
                timeStyle: "medium"
            };

            const now = new Intl.DateTimeFormat(
                dTFormatLocales,
                dTFormatOptions
            ).format(new Date());
            
            
            let messageObj = {
                id: socket.id + ++this.numberOfMsgs,
                nickname: this.setup.nickname,
                date: now,
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
                    message: "Hello, kalle here"
                },
                {
                    // _id: 2,
                    nickname: "sven",
                    date: "2020-9-2 12:39:39",
                    message: "How are you?"
                },
                {
                    // _id: 3,
                    nickname: "tommy",
                    date: new Date(),
                    message: "Tommy is from Sweden."
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
                    // body: messages
                }
            ).then(                
                resp => {
                    console.log(resp.json());
                }
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
                nickname: "tommy",
                date: "2020",
                message: "sweden"
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
                resp => console.log(resp.json())
            ).catch(
                error => console.log(error)
            );
        }
    }
}
</script>