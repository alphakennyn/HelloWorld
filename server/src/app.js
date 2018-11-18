const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const azureCreds = require('../config/azureCredentials.json');

/**
 * List your APIs here..
 */
//const KeyPhrase = require('./intentAPI');

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

// app.get('/intent', (req, res) => {
//   const text = req.body.text
//   const kp = new KeyPhrase(azureCreds.TextAnalytics.Endpoint, azureCreds.TextAnalytics.Key1);

//   const result = kp.get_key_phrases(text);
//   console.log(result);
//   res.send({
//     data: result,
//   });
//   // res.send(
//   //   [{
//   //     title: "Hello World!",
//   //     description: "Hi there! How are you?"
//   //   }]
//   // )
// })

const server = app.listen(process.env.PORT || 8081, () => {
  console.log('server started');
})

const io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('a user connected', socket.id);
  socket.on('SEND_MESSAGE', function(data) {
    io.emit('MESSAGE', data)
  });

});
