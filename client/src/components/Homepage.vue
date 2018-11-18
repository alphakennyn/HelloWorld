<template>
  <div id="app">
     <HelloWorld msg="Montreal refugee"/>
    <img id = "logo" alt="Montreal logo" src="../assets/Montreal.png">
    <Button></Button>
   
  </div>
</template>
<script>

import HelloWorld from './HelloWorld.vue'
import Button from './Button.vue'


export default {
  name: 'layout',
  components: {
      HelloWorld,
      Button
    // layout
  },

}
</script>

<style>

@media only screen and (max-width: 600px){
    #app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: inline-flex;
  color: #2c3e50;
  border: 2px solid #5D5C61;
  padding: 10%;
  padding-bottom: 2%;
  box-shadow: 5px 10px #314455;
  background: rgba(0,0,0,0.1);
    }
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: inline-flex;
  color: #2c3e50;
  border: 2px solid #5DA2D5;
  padding: 1%;
  box-shadow: 5px 10px #90ccf4;
  margin-left: 35%;
 
} */
</style>
