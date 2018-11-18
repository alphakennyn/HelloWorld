<template>
  <div class="chat-room">
    <h3 class="language-card">{{language}}</h3>
    <div class="chat-area">
      <p v-for="message in messages" class="message" :key="message.id" :class="{ 'message-out':message.author === 'you', 'message-in':message.author!=='you' }">
        {{message.body}}
      </p> 
    </div>
    <div class="input-area">
      <!-- <form @submit="sendMessage()"> -->
        <input @keyup.enter="sendMessage()" class="input-box" v-model="message"/>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import url from '../config/url.json';

export default {
  name: "chatBox",
  data() {
      return{
        language: 'en',
        bobMessage:'',
        userMessage:'',
        messages: [],
        messagesTest: '',
        socket : io(url.api),
        user: '',
        message: '',
      }
  },
  mounted: function() {
        console.log('mounted');

    this.socket.emit('adduser');

    this.socket.on('updatechat',(username, data) => {
      console.log('chat updated...');
      const dialog = {
        author: 'you',
        body: data,
      };
      console.log(username);
      if (username === 'SERVER') {
        dialog.author = 'bob'
      }
      this.messages = [...this.messages, dialog];
    });
    this.socket.on('languageSwap', (data) => {
      console.log('swapping language')
      this.language = data;
    });
    this.socket.on('receivechat', (...data) => {
      alert('this isnt right...')
    })
    this.$nextTick(() => {

      //add bot
      this.socket.emit('adduser', true);
    })
  },
  methods: {
    sendMessage() {
        this.socket.emit('sendchat', this.message);
        this.message = '';
    },

  }
}
</script>


<style lang="scss">
.chat-room {
  background-color: rgb(71, 136, 135);
  width: 100%;
  // position: fixed;
  .language-card {
    margin: 10px;
    padding: 10px;
    border-radius: 36px;
    background-color: #F1F0F0;
    //width: 10%;
    position: fixed;
    z-index: 2;
  }
}
.chat-area {
  /*   border: 1px solid #ccc; */
  padding: 1em;
  overflow: auto;
  // min-width: 100vw;
  min-height: 100vh;
  margin: 0 100px;
  margin-bottom: 100px;

  @media only screen and (max-width: 600px) {
      margin: 0 auto;
  }
}
.message {
  position: relative;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19);
  width: 45%;
  border-radius: 25px;
  padding: .7em;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
.message-out {
  background: #407FFF;
  color: white;
  margin-left: 54%;
  text-align: right;
}
.message-in {
  background: #F1F0F0;
  color: black;
  //text-align: left;
}
.input-area {
    position: fixed;
    width: 100vw;
    bottom: 0;
  .input-box {
    height: 50px;
    width: inherit;
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
}
</style>