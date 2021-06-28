const Database = require('../db/config');

module.exports = {
   async index(request, response) {
      const { roomId, questionId, action } = request.params;

      const { password } = request.body;

      if(!password) {
         return response.render('passincorrect', { 
            roomId,
            error: 'Please fill the password field'
         });
      }

      const db = await Database();

      const room = await db.get(`
         SELECT * FROM rooms WHERE id = ${roomId}
      `);

      if(!room) {
         await db.close();

         return response.render('passincorrect', { 
            roomId,
            error: `Not found room with id = ${roomId}`
         });
      }

      if(room.pass === password) {
         switch(action) {
            case 'delete':
               await db.run(`
                  DELETE FROM questions WHERE id = ${questionId}
               `);
               break;
            case 'check':
               await db.run(`UPDATE questions SET checked = 1 WHERE id = ${questionId}`);
               break;
         }

         await db.close();

         return response.redirect(`/room/${roomId}`);

      } else {
         await db.close();

         return response.render('passincorrect', { 
            roomId,
            error: `Password not match`
         });
      }
   },

   async create(request, response) {
      const { question } = request.body;
      const { room } = request.params;

      const db = await Database();

      try {
         await db.run(`
            INSERT INTO questions (
               title,
               room,
               checked
            ) VALUES (
               "${question}",
               ${room},
               0
            )
         `);

         await db.close();

         return response.redirect(`/room/${room}`);

      } catch(err){
         console.log({ message: err.message });
      }
   }
}