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
   }
}

const number = 3;
number.toFixed()
number.toPrecision()