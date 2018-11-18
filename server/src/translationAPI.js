'use strict';
const translationKey = require('../config/translation');
const axios = require('axios');

const baseURL = translationKey.translate.Endpoint;

module.exports = class Translator {
    constructor(langFrom, langTo, key) {
        this. subscriptionKey = key;
        this.langFrom = langFrom;
        this.langTo = langTo;
        this.lang = this.langFrom + '-' + this.langTo;
    }
    setSubscriptionKey(key) {
        this.subscriptionKey = key;
    }
    setFrom(langFrom){
        this.langFrom = langFrom;
    }
    setTo(langTo){
        this.langTo = langTo;
    }

   async get(text) {

        return await axios.get(baseURL + '?key=' + this.subscriptionKey + '&text=' + text + '&lang=' + this.lang)
            .then((res) => {
                return res.data.text[0]
            })
            .catch((error) => {
                console.error(error)
            })

    }
}



