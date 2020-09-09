<template>
    <div class="chat-box">
        <div>
            <p>{{ welcomeMessage }} {{ setup.nickname }}</p>
        </div>

        <div v-if="isFirstMsgCreated">
            <p>{{ room }}</p>            
            
            <div class="show-chat-messages">
                <p v-for="msg in messages" v-bind:key="msg.id">
                    {{ msg.nickname }}
                    {{ msg.date }}
                    {{ msg.message }}
                </p>
            </div>

            <div>
                <input
                    style="display: inline-block; width: 200px; margin: 20px 5px 20px 0;"
                    type="button"
                    value="Save messages"
                    v-on:click="saveMsgs"
                />                
                <span>{{ dbMessagesSavedAlert }}</span>
            </div>
        </div>

        <div>
            <label for="message">Message:</label>
            <textarea style="margin-top: 5px" id="message" v-on:keyup.enter="sendMsg" v-model="msg"></textarea>            
            <p>{{ emptyMsgAlert }}</p>
        </div>

        <div class="chat-query">
            <fieldset>
                <legend>Search for messages</legend>
            
                <label for="query-nickname">Nickname</label>
                <input id="query-nickname" type="text" v-model="queryNickname" />

                <label for="query-date">Date</label>
                <input id="query-date" type="text" v-model="queryDate" />
                <p>
                    Valid formats: 2020, 2020-09-09, 2020-09-09 15:10:20, 15:10:20, 09-09, etc.
                    <br />
                    Accepts regex: ^, [], etc.
                </p>

                <label for="query-message">Message</label>
                <input id="query-message" type="text" v-model="queryMessage" />

                <input type="submit" value="Search" v-on:click="getMsgs" />
            </fieldset>
        </div>

        <div v-if="hasASearchBeenMade">
            <p v-for="msg in dbMessages" v-bind:key="msg._id">
                {{ msg.nickname }}
                {{ msg.date }}
                {{ msg.message }}
            </p>
            <p>{{ NoResultsFound }}</p>
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
            dbMessages: [],
            dbMessagesSavedAlert: "",
            hasASearchBeenMade: false,
            isFirstMsgCreated: false,
            msg: "",
            msgs: [],
            NoResultsFound: "",
            numberOfMsgs: 0,
            room: null,
            welcomeMsgFromSckt: "",    
            
            // Query params to search for in mongodb.
            queryDate: "",
            queryMessage: "",
            queryNickname: "",
        }
    },
    
    created: function() {
        socket.emit("new user", this.setup.nickname);
        
        socket.on("new user", (data) => {
            this.room = data;
        });

        // this.saveMsgs();
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
                message: this.msg
            };
            
            socket.emit("chat msg", messageObj);
            
            this.msg = "", this.emptyMsgAlert = "";
            
            this.isFirstMsgCreated = true;
        },
        saveMsgs: function() {
            // let messages = [
            //     {
            //         // _id: 1,
            //         nickname: "kalle",
            //         date: new Date().toLocaleDateString(),
            //         message: "Hello, kalle here"
            //     },
            //     {
            //         // _id: 2,
            //         nickname: "sven",
            //         date: "2020-9-2 12:39:39",
            //         message: "How are you?"
            //     },
            //     {
            //         // _id: 3,
            //         nickname: "tommy",
            //         date: new Date(),
            //         message: "Tommy is from Sweden."
            //     }
            // ];

            // console.log(messages);
            
            let messages = this.messages;

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
            ).then(data => {
                this.dbMessagesSavedAlert = data;
                
                setTimeout(() => {
                    this.dbMessagesSavedAlert = "";
                }, 3000);
            }).catch(
                error => console.log(error)
            );
        },
        getMsgs: function() {
            let obj = JSON.stringify({
                nickname: this.queryNickname,
                date: this.queryDate,
                message: this.queryMessage,
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
                resp => resp.json()
            ).then(
                data => {
                    if (data.length < 1) {
                        this.NoResultsFound = "No results have been found!";
                    } else {
                        this.NoResultsFound = "";
                    }
                    
                    this.dbMessages = data;

                    this.hasASearchBeenMade = true;

                    this.clearSearchForm();
                }
            ).catch(
                error => console.log(error)
            );
        },
        clearSearchForm: function() {
            [
                this.queryNickname,
                this.queryDate,
                this.queryMessage
            ] = [ "", "", "" ];            
        }
    }
}
</script>