<template>
  <div class="hello">
    <h1>Hello from socket</h1>
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
      socket : io('localhost:8081')
    }
  },
  mounted: function() {
    this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
    });
  },
  methods: {
        sendMessage(e) {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = ''
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
