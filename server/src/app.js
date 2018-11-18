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

const server = app.listen(process.env.PORT || 8081, () => {
  console.log('server started on 8081 :)');
})

const io = require('socket.io')(server);

/**
 * List of users
 */
const usernames = {};
const rooms = ['lobby', 'room1', 'room2', 'room3'];

io.on('connection', function (socket) {
  console.log('a user connected', socket.id);

  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', (username) => {
    console.log('new user', username);
    // store the username in the socket session for this client
    socket.username = username;
    // store the room name in the socket session for this client
    socket.room = 'lobby';
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join('lobby');
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', `${username} have connected to lobby`);
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to('lobby').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'lobby');
  });

  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', (data) => {
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
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
    socket.emit('updaterooms', rooms, newroom);
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
