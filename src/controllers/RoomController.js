const Database = require('../db/config');

module.exports = {
   async create(request, response) {
      const { password } = request.body;

      if(!password.trim()) {
         return response.json({ error: 'Please fill the password field'});
      }

      const db = await Database();
      const roomId = Date.now();

      await db.run(`
         INSERT INTO rooms (
            id,
            pass
         ) VALUES (
            ${roomId},
            ${password}
         )
      `);

      await db.close();

      return response.redirect(`/room/${roomId}`);
   },
   async open(request, response) {
      const { id: roomId } = request.params;

      const db = await Database();

      const room = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`);

      if(!room) {
         return response.render('passincorrect', { 
            roomId,
            error: `Not found room with id = ${roomId}`,
            isHomePage: true
         });
      }

      const questions = await db.all(`
         SELECT * FROM questions WHERE room = ${roomId} and checked = 0
      `);

      const questionsRead = await db.all(`
         SELECT * FROM questions WHERE room = ${roomId} and checked = 1
      `);
      
      return response.render('room', { 
         roomId, 
         questions: questions.reverse(), 
         questionsRead: questionsRead.reverse(),
         totalQuestions: questions.length + questionsRead.length 
      });
   },

   async enter(request, response) {
      const { roomId } = request.body;

      const db = await Database();

      const room = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`);

      if(!room) {
         return response.render('passincorrect', { 
            roomId,
            error: `Not found room with id = ${roomId}`,
            isHomePage: true
         });
      }

      return response.redirect(`/room/${roomId}`);
   }
}

//existente = 1624847127232