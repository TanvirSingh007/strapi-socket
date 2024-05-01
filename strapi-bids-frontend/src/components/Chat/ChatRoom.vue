<template>
    <div class="container mt-4 m-md-3 m-lg-3 ">
        <div class="row">
            <div class="col-md-5 col-lg-5">
                <div class="card m-2 p-3">
                    <div class="overflow-auto" style="height: 70vh;">
                        <div v-for="message in messages" :key="message.id">
                            <div v-if="message.type == 0" class="d-flex justify-content-end mb-3">
                                <div class="bg-info text-dark py-2 px-3 rounded-lg">
                                    <p class="mb-0">{{ message.text }}</p>
                                </div>
                            </div>
                            <div v-else class="d-flex mb-3">
                                <div class="bg-light text-dark py-2 px-3 rounded-lg">
                                    <p class="mb-0">{{ message.text }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-2 d-flex flex-column">
                    <input type="text" v-model="message" placeholder="Enter Message" class="form-control" min="1" />
                    <button type="button" @click="sendMessage" class="btn btn-outline-warning">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import socketIOClient from "socket.io-client";
export default {

    name: "ChatRoom",
    data() {
        return {
            message: '',
            messages: [],
            socket: socketIOClient("http://localhost:1337", {
                query: {
                    token: this.$store.getters.getUser.token
                }
            }),
        }
    },
    methods: {
        sendMessage() {
            this.socket.emit("sendMessage", { messageText: this.message });
            this.message = ''
        }
    },
    created() {
        this.socket.emit("loadMessages");
        this.socket.on("loadMessages", (data) => {
            this.messages = data
        });
    },
}


</script>
