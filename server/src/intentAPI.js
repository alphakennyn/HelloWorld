'use strict';

const https = require ('https');

module.exports = class PhraseAnalyzer {
  constructor(url, token) {
    this.url = url;
    this.accessKey = token;
  }
  
  response_handler(response) {
      let body = '';
      response.on ('data', function (d) {
          body += d;
      });
      response.on ('end', function () {
          let body_ = JSON.parse (body);
          let body__ = JSON.stringify (body_, null, '  ');
          console.log (body__);
      });
      response.on ('error', function (e) {
          console.log ('Error: ' + e.message);
      });
  };
  
  get_key_phrases (text) {
  
      const documents = [
        {
          language: "en",
          id: "1",
          text,
        },
      ];
  
      const body = JSON.stringify ({ documents });
  
      const request_params = {
          method : 'POST',
          host : `${this.url}/v2.0/keyPhrases`,
          //path : path,
          headers : {
              'Ocp-Apim-Subscription-Key' : this.accessKey,
          }
      };
  
      let req = https.request(request_params, this.response_handler);
      req.write (body);
      req.end ();
  }
}
