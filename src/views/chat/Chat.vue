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
    </div>
</template>

<script>
// Todo: origins

// Socket.io-client
import io from "socket.io-client";
const socket = io("http://localhost:5000");


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
        }
    },
    
    created: function() {
        socket.emit("new user", this.setup.nickname);
        
        socket.on("new user", (data) => {
            this.room = data;
        });
        
        
        // socket.on("connect", () => {
        //     console.log("Connected");
            
        //     socket.on("welcome msg", (data) => {
        //         this.welcomeMessage = data;         
        //     });

        //     socket.on("intro room msg", (data) => {
        //         this.room = data;
        //     });

        //     // socket.on("chat msg", (data) => {
        //     //     // let p = document.createElement("p");
        //     //     // p.textContent = data;
        //     //     // msgs.appendChild(p);

        //     //     // this.messages = data;
        //     // });

        //     socket.on("disconnect", () => {
        //         console.log("Disconnected");
        //     });
            
        //     // socket.on("intro room msg", (data) => {
        //     //     console.log("intro room", data);
        //     //     this.room = data;
        //     // });
        // });        
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
            

            // if (this.room === null) {
            //     socket.emit("new user", this.setup.nickname);

            //     socket.on("new user", (data) => {
            //         console.log(data);
            //         this.room = data;
            //     });
            // }

            let messageObj = {
                id: socket.id + ++this.numberOfMsgs,
                nickname: this.setup.nickname,
                date: new Date().toLocaleString(),
                mess: this.msg
            };
            
            socket.emit("chat msg", messageObj);
            
            this.msg = "", this.emptyMsgAlert = "";
            
            this.isFirstMsgCreated = true;
        }
    }
}
</script>