// 'use strict';
// const Search = require('azure-cognitiveservices-imagesearch');
// const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;

// const azureCreds = require('../config/azureCredentials.json');

// const serviceKey = azureCreds.bing.Key1;

// let searchTerm = "canadian rockies";

// //instantiate the image search client 
// let credentials = new CognitiveServicesCredentials(serviceKey);
// let imageSearchApiClient = new Search.ImageSearchAPIClient(credentials);

// //a helper function to perform an async call to the Bing Image Search API
// const sendQuery = async () => {
//     return await imageSearchApiClient.imagesOperations.search(searchTerm);
    
// };

// sendQuery().then(imageResults => {
//     if (imageResults == null) {
//     console.log("No image results were found.");
//     }
//     else {
//         console.log(`Total number of images returned: ${imageResults.value.length}`);
//         let firstImageResult = imageResults.value[0];
//         //display the details for the first image result. After running the application,
//         //you can copy the resulting URLs from the console into your browser to view the image.
//         console.log(`Total number of images found: ${imageResults.value.length}`);
//         console.log(`Copy these URLs to view the first image returned:`);
//         console.log(`First image thumbnail url: ${firstImageResult.thumbnailUrl}`);
//         console.log(`First image content url: ${firstImageResult.contentUrl}`);
//     }
//   })
//   .catch(err => console.error(err))



// module.exports = class ImageSearchAPI {
//     constructor(url, token) {
//         this.url = url;
//         this.subscriptionKey = token;
//     }

    



//     getImage(search) {

//     //     let request_params = {
//     //         method: 'GET',
//     //         host: this.url + '?q=' + encodeURIComponent(search),
//     //         headers: {
//     //             'Ocp-Apim-Subscription-Key': this.subscriptionKey,
//     //         }
//     //     };



//     //     let req = https.request(request_params, response_handler);
//     //     req.end();

//     //     let response_handler = (response) => {
//     //         let body = '';
//     //     };

//     //     response.on('data', (d) => {
//     //         body += d;
//     //     });

//     //     response.on('end', () => {
//     //         let firstImageResult = imageResults.value[0];
//     //         console.log(`Image result count: ${imageResults.value.length}`);
//     //         console.log(`First image thumbnail url: ${firstImageResult.thumbnailUrl}`);
//     //         console.log(`First image web search url: ${firstImageResult.webSearchUrl}`);
//     //     });
//     // }
// }





const https = require('https');
const express = require("express");
const app = express();
var port = 8000;

app.use(express.static("public"));

app.listen(port, () => console.log('Your app is ready! Navigate to: http://localhost:' + port + '/.'));