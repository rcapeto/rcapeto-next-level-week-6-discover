module.exports = {
   enterRoom(request, response) {
      return response.render('index', { page: 'enter-room' });
   },

   createPassword(request, response) {
      return response.render('index', { page: 'create-password' });
   }
}