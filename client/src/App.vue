<template>
  <div id = "bj">
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {
  }
};
</script>

<style>
@media screen and (max-width: 600px){
  #bj{
  position: fixed;
	top: -20px;
	left: -20px;
	right: -40px;
	bottom: -40px;
	/* width: 100%;
	height: 100%; */
	background-image: url('./assets/sky.jpg');
	background-size: cover;
	z-index: 0;
    }
}
  body {
    margin: 0px;
  }

</style>
