<template>
    <section id="mainMessageContainer">
        <md-toolbar class="md-primary">
            <router-link :to="{ name: 'rooms'}">
                <md-button class="md-icon-button">
                    <md-icon>chevron_left</md-icon>
                </md-button>
            </router-link>
            <span class="md-title">Room {{$route.params.roomId}}</span>
        </md-toolbar>
        <md-list class="md-triple-line md-dense">
            <md-list-item v-for="(msg, index) in messages" :key="index" class="message">
                <div class="md-list-item-text">
                    <span>{{msg.user}}</span>
                    <p><span class="time">{{msg.time | humanizeDate}}</span> <span>{{msg.message}}</span></p>
                </div>
            </md-list-item>
        </md-list>
        <md-card id="sendBox">
            <md-card-content>
                <md-field>
                    <label for="message">New message</label>
                    <md-input type="text" name="message" id="message" v-model="message"
                              :disabled="sending"/>
                </md-field>

            </md-card-content>

            <md-card-actions>
                <md-button type="submit" class="md-primary" @click="sendMessage" :disabled="sending">Send</md-button>
            </md-card-actions>
        </md-card>
    </section>
</template>

<script>
  import io from 'socket.io-client';

  export default {
    data() {
      return {
        user: this.$store.state.user,
        message: '',
        messages: [],
        sending: false
      }
    },
    methods: {
      sendMessage() {
        this.sending = true
        this.socket.emit('SEND_MESSAGE', {
          user: this.user,
          message: this.message,
          time: Date.now()
        });
        this.sending = false // Move to callback
        this.message = ''
      }
    },
    mounted() {
      if (!this.$store.state.user) {
        this.$router.push({ name: 'rooms'})
      }
      this.socket = io(this.server_instances[this.$store.state.instance])
      this.socket.emit('START', this.$route.params.roomId)
      this.socket.on('MESSAGE', (data) => {
        this.messages = [...this.messages, data];
      });
      this.socket.on('MESSAGES', (data) => {
        this.messages = data
      });
    },
    filters: {
      humanizeDate: function (value) {
        let date = new Date(value)
        return date.toISOString().substr(11, 5);
      }
    }
  }
</script>


<style lang="scss" scoped>
    $border-message-color: #EEE;
    $send-box-height: 220px;
    #mainMessageContainer {
        overflow: hidden;

        .sendBox {
            height: $send-box-height;
        }

        ul {
            max-height: calc(100vh - #{$send-box-height});
            overflow: scroll;
        }

        .time {
            font-weight: bold;
        }

        .message:not(:last-child) {
            border-bottom: 1px solid $border-message-color;
        }
    }

    .md-card {
        margin: 4px;
        display: inline-block;
        vertical-align: top;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>
