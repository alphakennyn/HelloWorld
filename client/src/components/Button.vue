<template>
  <div id = "button">
     <button><img id = 'icon' src = "../assets/chat1.png"/></button>
  </div>
</template>

<script>

export default {
  name: 'button',
  components: {
  }
}
</script>

<style>

  @import url(https://fonts.googleapis.com/css?family=Raleway:300);
button {
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
          transform: translateX(-50%) translateY(-50%);
}
#icon{
  margin-left: -7px;
  margin-top: -1px;
}

body {
  background: #111;
}

button {
  background: rgba(0,0,0,0);
  color: #ccc;
  width: 90px;
  height: 90px;
  border: 0;
  font-size: 18px;
  border: 3px solid rgb(182, 169, 169);
  border-radius: 50px;
  font-family: 'Raleway', sans-serif;
  transition: .6s;
  overflow: hidden;
}
button:focus {
  outline: 0;
}
button:before {
  content: '';
  display: block;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  width: 60px;
  height: 100%;
  left: 0;
  top: 0;
  opacity: .5;
  -webkit-filter: blur(30px);
          filter: blur(30px);
  -webkit-transform: translateX(-100px) skewX(-15deg);
          transform: translateX(-100px) skewX(-15deg);
}
button:after {
  content: '';
  display: block;
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  width: 30px;
  height: 100%;
  left: 30px;
  top: 0;
  opacity: 0;
  -webkit-filter: blur(5px);
          filter: blur(5px);
  -webkit-transform: translateX(-100px) skewX(-15deg);
          transform: translateX(-100px) skewX(-15deg);
}
button:hover {
  background: #338033;
  cursor: pointer;
}
button:hover:before {
  -webkit-transform: translateX(300px) skewX(-15deg);
          transform: translateX(300px) skewX(-15deg);
  opacity: 0.6;
  transition: .7s;
}
button:hover:after {
  -webkit-transform: translateX(300px) skewX(-15deg);
          transform: translateX(300px) skewX(-15deg);
  opacity: 1;
  transition: .7s;
}
</style>
