const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const translator = require('./parser')

app.get('/test', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.post('/translate', (req, res) => {
   // res.send(translate)
    console.log(translator.translate.get(req.body.data))

    translator.translate.get(req.body.data).then(result =>{
       res.send(result)
    })

})

app.listen(process.env.PORT || 8081)