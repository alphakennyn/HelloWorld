<template>
  <div class="hello">
    <h1>Hello from socket</h1>
    <div>Current Language: {{language}}</div>
    {{messages}}
    <input v-model="message"/>
    <button @click='sendMessage()'>Submit</button>
  </div>
</template>

<script>
import io from 'socket.io-client';
import url from '../config/url.json';

export default {
  name: 'HelloWorld',
  data() {
    return {
      user: '',
      message: '',
      language: 'en',
      messages: [],
      messagesTest: '',
      socket : io(url.api)
    }
  },
  mounted: function() {
    console.log('this is message',this.messages)
    this.socket.emit('adduser', prompt("What's your name?"));

    this.socket.on('updatechat',(username, data) => {
      console.log('chat updated...');
      this.messages = [...this.messages, (`${username}:  ${data}`)];
    });
    this.socket.on('languageSwap', (data) => {
      console.log('swapping language')
      this.language = data;
    });
  },
  methods: {
        sendMessage(e) {
            // e.preventDefault();
            this.socket.emit('sendchat', this.message);
            this.message = '';
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
