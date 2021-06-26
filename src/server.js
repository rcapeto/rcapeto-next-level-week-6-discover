const express = require('express');
const path = require('path');

const { port } = require('./config/app');
const routes = require('./routes');

const server = express();

server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(routes);

server.listen(port, listenCb());

function listenCb() {
   return function() {
      console.log(`Server is running in http://localhost:${port}`);
   }
}