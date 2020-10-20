<template>
    <section id="mainMenu">
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <md-field>
                    <label for="user">User</label>
                    <md-input name="user" id="user" v-model="user" @keyup="setUser"/>
                </md-field>
                <div class="instanceContainer">
                    <md-radio v-model="instance" @change="setInstance" :value="0">Instance 1</md-radio>
                    <md-radio v-model="instance" @change="setInstance" :value="1">Instance 2</md-radio>
                </div>
                <md-list>
                    <md-list-item v-for="room in rooms" :key="room">
                        <span class="md-list-item-text">Room {{room}}</span>
                        <router-link :to="{ name: 'room', params: { roomId: room}}">
                            <md-button class="md-icon-button md-list-action">
                                <md-icon class="md-primary">chat_bubble</md-icon>
                            </md-button>
                        </router-link>
                    </md-list-item>
                </md-list>
            </div>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'Rooms',
    data() {
      return {
        user: this.$store.state.user,
        rooms: [1, 2],
        instance: 0
      }
    },

    methods: {
      setUser() {
        this.$store.commit('setUser', this.user)
        localStorage.setItem('user', this.user);
      },
      setInstance () {
        this.$store.commit('setInstance', this.instance)
      }
    }
  }
</script>

<style lang="scss" scoped>
    #mainMenu {
        display: flex;
        justify-content: center;
        align-self: center;
        margin: 100px;

        .md-list {
            width: 320px;
            max-width: 100%;
            display: inline-block;
            vertical-align: top;
            border: 1px solid rgba(#000, .12);
        }
        .instanceContainer {
            display: flex;
            margin: 0 0 20px;
        }
    }

</style>
