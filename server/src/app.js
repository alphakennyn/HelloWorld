const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const azureCreds =  require('../config/azureCredentials.json');

/**
 * List your APIs here..
 */
const KeyPhrase = require('./intentAPI');

const kp = new KeyPhrase(azureCreds.TextAnalytics.Endpoint, azureCreds.TextAnalytics.Key1);

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


/**
 * /test
 */
app.get('/test', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.get('/intent', (req, res) => {
  const text = req.body.text
  const result = kp.get_key_phrases(text);

  res.send({
    data: result,
  });
  // res.send(
  //   [{
  //     title: "Hello World!",
  //     description: "Hi there! How are you?"
  //   }]
  // )
})

app.listen(process.env.PORT || 8081)