const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const azureCreds = require('../config/azureCredentials.json');
const ImageSearchAPI = require('./imageSearchAPI');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/test', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.get('/get1Image/:name', (req, res) => {
  res.send(
    [{
      parameters: req.params.name
      
    }]
  )
})




app.listen(process.env.PORT || 8081)