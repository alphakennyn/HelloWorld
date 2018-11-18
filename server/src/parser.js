'use strict'
global.fetch = require("node-fetch");

// import apis
const translationAPI = require('./translationAPI');
const phraseAnalyzeAPI = require('./phraseAnalyzeAPI');

// import configs
const translationKey = require('../config/translation');
const azureCreds = require('../config/azureCredentials.json');

//azure consts
const azureUrl = azureCreds.TextAnalytics.Endpoint
const azureKey = azureCreds.TextAnalytics.Key1

const translateTokenKey = translationKey.translate.Key1;

/**
 * creaate translationAPI object
 * Default to en-en
 */
const translate = new translationAPI('en', 'en', translateTokenKey);
const phraseAnalyze = new phraseAnalyzeAPI(azureUrl, azureKey);

//const trans = (text) => translate.get(text);

module.exports = {
  translate,
  phraseAnalyze,
};
