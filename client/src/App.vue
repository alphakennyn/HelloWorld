<template>
  <div class="text-center" id="app">
    <h1>Word Translator</h1>
    
    <hr>
    <TranslateForm v-on:formSubmit="translateText"></TranslateForm>
    <TranslateOutput v-text="translatedText"></TranslateOutput>
  </div>
</template>

<script>
import TranslateForm from "./components/translateForm";
import TranslateOutput from "./components/translateOutput";
import ImageSearch from "./components/ImageSearch";

export default {
  name: "app",
  components: {
    TranslateForm,
    TranslateOutput,
    ImageSearch
  },
  data: function() {
    return {
      translatedText: ""
    };
  },
  methods: {
    translateText: function(text, language) {
      this.$http
        .get(
          "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181117T201146Z.8d6fbf972f9a409f.ca670cc205d43ed2b8e22564afd02df540cb08ee&lang=" +
            language +
            "&text=" +
            text
        )
        .then(response => {
          this.translatedText = response.body.text[0];
        });
    }
  }
};
</script>

<style>
body {
  background: #fefefe;
}
</style>