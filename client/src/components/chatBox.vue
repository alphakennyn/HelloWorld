
<template>
  <div>
    
  <h1> {{msg}} </h1>
  <h1> smack pow </h1>

  <section ref = "chatArea">

    
    <!-- <ul>
       
        <li v-for="item in items" :key="item.id">
        {{ item.message }}
        </li>
    </ul> -->

    <p v-for="message in messages" class="message" :key="message.id"> :class="{ 'message-out':message.author === 'you', 'message-in':message.author!=='you' }">
        {{message.body}}

    </p> 


    

      
  </section>
   <section class="chat-inputs">

    <form @submit.prevent="sendMessage('in')" id="person1-form">
      <label for="person1-input">Bob</label>
      <input v-model="bobMessage" id="person1-input" type="text" placeholder="Type your message">
      <button type="submit">Send</button>
    </form>
<button @click="clearAllMessages">Clear All</button>
    <form @submit.prevent="sendMessage('out')" id="person2-form">
      <label for="person2-input">You</label>
      <input v-model="youMessage" id="person2-input" type="text" placeholder="Type your message">
      <button type="submit">Send</button>
    </form>
  </section>

  </div>
</template>




<script>
export default {
//   name: "chatBox",
//   props: {
//     msg: String
//   }

  data() {
      return{
    bobMessage:'',
    youMessage:'',
     messages: [
      {
        body: 'Welcome to the chat, I\'m Bob!',
        author: 'bob'
      },
      {
        body: 'Thank you Bob',
        author: 'you'
      },
      {
        body: 'You\'re most welcome',
        author: 'bob'
      }
    ]
      }
  },

  
  

  methods: {
    sendMessage(direction) {
      if (!this.youMessage && !this.bobMessage) {
        return
      }
      
      if (direction === 'out') {
        this.messages.push({body: this.youMessage, author: 'you'})
        this.youMessage = ''
      } else if (direction === 'in') {
        this.messages.push({body: this.bobMessage, author: 'bob'})
        this.bobMessage = ''
      } else {
        alert('something went wrong')
      }
      Vue.nextTick(() => {
        let messageDisplay = this.$refs.
        Area
        messageDisplay.scrollTop = messageDisplay.scrollHeight
      })
    },
    clearAllMessages() {
      this.messages = []
    }
  }
}


</script>


<style>
body,
html {
  font-family: sans-serif;
  font-weight: 100;
  background: #7b4397; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #dc2430,
    #7b4397
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #dc2430,
    #7b4397
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.chat-area {
  /*   border: 1px solid #ccc; */
  background: white;
  height: 50vh;
  padding: 1em;
  overflow: auto;
  max-width: 350px;
  margin: 0 auto 2em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
}
</style>