<template>
  <div class="hello">
    <h1>Hello from socket</h1>
    {{messages}}
    <input v-model="message"/>
    <button @click='sendMessage()'>Submit</button>?
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'HelloWorld',
  data() {
    return {
      user: '',
      message: '',
      messages: [],
      messagesTest: '',
      socket : io('localhost:8081')
    }
  },
  mounted: function() {
    console.log('this is message',this.messages)
    this.socket.emit('adduser', prompt("What's your name?"));

    this.socket.on('updatechat',(username, data) => {
      console.log('chat updated...');
      this.messages = [...this.messages, (`${username}:  ${data}`)];
    });
    // this.socket.on('MESSAGE', (data) => {
    //   console.log('MESSSAGE is called')
    //         this.messages = [...this.messages, data];
    //         // you can also do this.messages.push(data)
    // });
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
