<template>
  <div id = "bj">
    <Socket/>
     <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Socket from './components/Socket';

export default {
  name: 'app',
  components: {
    HelloWorld,
    Socket,
  }
}
</script>

<style>
    #bj{
  
  position: absolute;
	top: -20px;
	left: -20px;
	right: -40px;
	bottom: -40px;
	width: auto;
	height: auto;
	background-image: url('./assets/sky.jpg');
	background-size: cover;
 
	/* -webkit-filter: blur(5px); */
	z-index: 0;
    }

</style>
