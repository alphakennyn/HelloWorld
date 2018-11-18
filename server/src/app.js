const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const uuid = require('uuid/v1');
/**
 * List your APIs here..
 */
//const KeyPhrase = require('./intentAPI');

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


const parseTool = require('./parser')

app.get('/test', (req, res) => {
  console.log(req.body.data);
  parseTool.phraseAnalyze.getLanguage(req.body.data).then((result) => {
    const language = result.documents[0].detectedLanguages[0];
    const data = {
      value: 'en',
      score: language.score,
    }
    if (language.score >= 0.90) {
      data.value = language.iso6391Name;
    }
    console.log(data);
    res.send(data);
  }).catch(err => {
    res.send('Uh oh');
  });
})

app.post('/translate', (req, res) => {
   parseTool.translate.get(req.body.data).then(result =>{
      res.send(result)
   });
});

app.get('/sessions', (req,res) => {
  console.log(io.sockets.clients().sockets);
  res.send();
})

const server = app.listen(process.env.PORT || 8081, () => {
  console.log('server started on 8081 :)');
})

const io = require('socket.io')(server);

/**
 * List of users
 */
const usernames = {};
const rooms = ['room1', 'room2', 'room3', 'room4', 'room5'];
let freeRoomIndex = 0;
io.on('connection', function (socket) {
  console.log('a user connected', socket.id);

  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', (data) => {

    if (data) {
      socket.userId = uuid();// store the username in the socket session for this client
      socket.room = rooms[freeRoomIndex];// store the room name in the socket session for this client
      socket.language = 'en';// store current user pref language to english
      parseTool.translate.setTo(socket.language);
  
      // add the client's username to the global list
      usernames[socket.id] = socket.id;
      // send client to room 1
      socket.join(rooms[freeRoomIndex]);
      // echo to room 1 that a person has connected to their room
      console.log(rooms[freeRoomIndex]);
  

      //socket.emit('updaterooms', rooms, 'room1');
      // freeRoomIndex += 1;
    } else {
      console.log('bot joined!')
      /**
       * Protocol
       */
      socket.emit('updatechat', 'SERVER', `Welcome, I am the  Montreal bot. You can speak to me in French, Spanish... `);
      socket.emit('updatechat', 'SERVER', `Just type the service you'd like discuss and I'll find the next available representative to chat with you :)`);
    }
  });

  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', (data) => {
    //update their language if need be
    console.log('From ',socket.room, socket.userId, ' just sent ', data);
    parseTool.phraseAnalyze.getLanguage(data).then((result) => {
      const language = result.documents[0].detectedLanguages[0];
      
      if (language.score && language.score >= 0.90 && socket.language !== language.iso6391Name) {
        socket.language = language.iso6391Name;
        parseTool.translate.setTo(language.iso6391Name);
        socket.to(socket.room).emit('languageSwap', language.iso6391Name);
      }
    }).then(() => {
      console.log('done');
    });
    console.log('sockt room is', socket.room);

    io.in(socket.room).emit('updatechat', socket.userId, data);
    // we tell the client to execute 'updatechat' with 2 parameters
    // io.sockets.in(socket.room).emit('updatechat', socket.userId, data);
  });


  
  // When client switches room
  socket.on('switchRoom', (newroom) => {
    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
    // sent message to OLD room
    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
    // update socket session room title
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    //socket.emit('updaterooms', rooms, newroom);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
    console.log('leaving...', socket.username)
  });


});
