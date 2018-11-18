'use strict';

const axios = require('axios');
const qs = require('qs');

module.exports = class PhraseAnalyzer {
    constructor(url, token) {
        this.url = url;
        this.accessKey = token;
    }

    async getKeyPhrases(text) {
        try {
            const data = {
                documents: [
                    {
                        language: "en",
                        id: "1",
                        text,
                    },
                ]
            };
            const options = {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': this.accessKey,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(data),
            };
            const url = `${this.url}/v2.0/languages`;

            const response = await fetch(url, options);

            return response.json();
        } catch (err) {
            console.log(err.message);
            return new Error('Failed to connect to microsft');
        }
    }

    async getLanguage(text) {
        try {
            const body = {
                documents: [
                    {
                        id: "1",
                        text,
                    }
                ]
            };
            const url = `${this.url}/v2.0/languages`;

            const options = {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': this.accessKey,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(body),
            };
            const response = await fetch(url, options);

            return response.json();
        } catch (err) {
            return new Error('Failed to connect to microsft');
        }

    }
}
