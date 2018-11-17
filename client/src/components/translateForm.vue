<template>
  <div id="translateForm">
    <form v-on:submit="formSubmit" >
        <input  v-on:input="formSubmit" v:on:change="formSubmit()" type="text" v-model="textToTranslate" placeholder="Enter a word">
        <select v-on:change="formSubmit"  v-model="language">
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="ar">Arabic</option>
            <option value="zh">Chinese</option>
        </select>
        <!-- <button @click="formSubmit()" type="submit" value="Translate">Button</button> -->
    </form>

  </div>
</template>

<script>
export default {
  name: "translateForm",
  data() {
    return {
      textToTranslate: "",
      language: ""
    };
  },
  created() {
    this.language = "zh";
  },
  methods: {
    formSubmit(e) {
      this.$emit("formSubmit", this.textToTranslate, this.language);
      e.preventDefault();
    }
  }
};
</script>

<style>
#transForm {
  margin: 0 auto;
  border-radius: 10px;
  border: 6px #ccc solid;
}
</style>

