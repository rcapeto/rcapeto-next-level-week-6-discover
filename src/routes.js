const express = require('express');
const routes = express.Router();

const QuestionController = require('./controllers/QuestionController');
const RoomController = require('./controllers/RoomController');

routes.get('/', (request, response) => {
   return response.render('index', { page: 'enter-room' });
});

routes.get('/room/:id', (request, response) => {
   return response.render('room');
});

routes.get('/create-pass', (request, response) => {
   return response.render('index', { page: 'create-password' });
});

routes.post('/question/:roomId/:questionId/:action', QuestionController.index);
routes.post('/create-room', RoomController.create);

module.exports = routes;