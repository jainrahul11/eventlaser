const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const sassMiddleware = require('node-sass-middleware')
const config = require('./config')

let app = express()
app.use(express.static(path.join(__dirname, 'public')))

// mongodb started

mongoose.connect(config.MONGO_URI)
mongoose.connection.on('connected', function () {
  console.info('MongoDB started successfully !!')
})
mongoose.connection.on('error', function () {
  console.log('Error in establish connection with MongoDB !!')
})
mongoose.connection.on('disconnected', function () {
  console.log('MongoDB disconnected ---- ')
})

const userObj = new mongoose.Schema({

  name: {
    type: String
  },
  msg: {
    type: String
  },
  dp: {
    type: String
  },
  color: {
    type: JSON
  },
  created: {
    type: String
  }

})

mongoose.model('user', userObj)
const User = mongoose.model('user')

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'), // Sass source directory
    dest: path.join(__dirname, 'public'), // Compiled CSS destination directory
    indentedSyntax: true, // Set to true if you are using indented syntax (.sass) instead of SCSS (.scss)
    outputStyle: 'compressed', // Output style of the compiled CSS
    prefix: '/stylesheets' // URL prefix for the Sass files
  })
)
app.get('/user?', function (req, res) {
  let query = {}

  if (req.query.name != null) {
    query = req.query

    User.find({ name: new RegExp('^' + req.query.name, 'i') }, function (err, data) {
      if (err) {
        res.send(err)
        return
      }

      res.json(data)
    })
  } else {
    User.find(query, function (err, data) {
      if (err) {
        res.send(err)
        return
      }

      res.json(data)
    })
  }
})

// mongo db over

app.db = require('./app/db')

nunjucks.configure('views', {
  autoescape: true,
  express: app
})
app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const server = require('node:http').createServer(app)
server.listen(config.SOCKET_PORT)
app = require('./app/routes')(app)
const io = require('socket.io')(server, { transports: ['websocket', 'polling'] })
require('./app/sockets')(app, io)

console.log('Server started successfully running on %s port ', config.SOCKET_PORT)
