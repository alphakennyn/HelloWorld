'use strict';
let https = require('https');




module.exports = class ImageSearchAPI {
    constructor(url, token) {
        this.url = url;
        this.subscriptionKey = token;
    }


    getImage(search) {

        let request_params = {
            method: 'GET',
            hostname: this.host,
            path: url + '?q=' + encodeURIComponent(search),
            headers: {
                'Ocp-Apim-Subscription-Key': this.subscriptionKey,
            }
        };



        let req = https.request(request_params, response_handler);
        req.end();

        let response_handler = (response) => {
            let body = '';
        };

        response.on('data', (d) => {
            body += d;
        });

        response.on('end', () => {
            let firstImageResult = imageResults.value[0];
            console.log(`Image result count: ${imageResults.value.length}`);
            console.log(`First image thumbnail url: ${firstImageResult.thumbnailUrl}`);
            console.log(`First image web search url: ${firstImageResult.webSearchUrl}`);
        });
    }
}



