<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- {{data}} -->
  </div>
</template>

<script>
import request from '../api/requests.js';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted: function() {
    request.getSample().then(res => {
      this.data = res.data;
    }).catch(err => {
      
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
