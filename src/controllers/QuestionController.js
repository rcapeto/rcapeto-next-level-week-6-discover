module.exports = {
   index(request, response) {
      const { roomId, questionId, action } = request.params;
      const { password } = request.body;
      console.log({ roomId, questionId, action, password });
      return response.json({ roomId, questionId, action, password });
   }
}