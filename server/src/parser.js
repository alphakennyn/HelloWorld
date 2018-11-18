const translationAPI = require('./translationAPI');
const translationKey = require('../config/translation');

const key = translationKey.translate.Key1;


const translate = new translationAPI('en', 'fr', key);

//const trans = (text) => translate.get(text);

module.exports = {translate};
