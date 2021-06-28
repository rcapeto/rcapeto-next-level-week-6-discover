const express = require('express');
const routes = express.Router();

const QuestionController = require('./controllers/QuestionController');
const RoomController = require('./controllers/RoomController');
const PageControlelr = require('./controllers/PageController');

routes.get('/', PageControlelr.enterRoom);
routes.get('/room/:id', RoomController.open);
routes.get('/create-pass', PageControlelr.createPassword);
routes.post('/room/enter', RoomController.enter);
routes.post('/create-room', RoomController.create);
routes.post('/question/:roomId/:questionId/:action', QuestionController.index);
routes.post('/question/create/:room', QuestionController.create);

module.exports = routes;