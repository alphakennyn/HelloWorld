const axios = require('axios');

//temp

const baseURL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

let text = 'hello';
let lang = 'en-fr';


axios.get(baseURL + '?key=' + subscriptionKey + '&text=' + text + '&lang=' + lang)
    .then((res) => {
        console.log(res)
    })
    .catch((error) => {
        console.error(error)
    })


