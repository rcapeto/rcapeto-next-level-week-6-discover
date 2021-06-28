export function controlModal() {
   const deleteButtons = document.querySelectorAll('.actions a.delete');
   const checkButtons = document.querySelectorAll('.actions a.check');
   const roomId = document.querySelector('#room .buttons button.button').getAttribute('data-roomId');

   const modal = {
      main: document.querySelector('.modal-wrapper'),
      title() {
         return this.main.querySelector('.modal h2');
      },
      description() {
         return this.main.querySelector('.modal p');
      },
      buttonAction() {
         return this.main.querySelector('.buttons button');
      },
      buttonCancel() {
         return this.main.querySelector('[data-cancel]');
      },
      input() {
         return this.main.querySelector('input');
      },
      form() {
         return this.main.querySelector('form');
      }
   }

   for(const checkButton of Array.from(checkButtons)) {
      checkButton.addEventListener('click', event => openModal(event, 'check'));
   }

   for(const deleteButton of Array.from(deleteButtons)) {
      deleteButton.addEventListener('click', event => openModal(event, 'delete'));
   }

   //type = check || delete
   function openModal(event, type) {
      event.preventDefault();

      const question = event.target.closest('.question-wrapper');
      const questionId = question.getAttribute('data-id');

      modal.main.classList.add('show');

      switch(type) {
         case 'check':
            const checkConfig = {
               title: 'Marcar como lida',
               description: 'marcar como lida',
               buttonText: 'marcar'
            }
            changeModalContent(checkConfig);

            modal.form().setAttribute('action', `/question/${roomId}/${questionId}/check`);

            break;
         case 'delete':
            const deleteConfig = {
               title: 'Excluir pergunta',
               description: 'excluir',
               buttonText: 'excluir'
            }

            changeModalContent(deleteConfig);

            modal.form().setAttribute('action', `/question/${roomId}/${questionId}/delete`);

            break;
         default:
            window.alert(`Type is different than "delete and check" type="${type}"`);
            closeModal();
      }
      modal.buttonCancel().addEventListener('click', closeModal);
   }

   function closeModal() {
      modal.main.classList.remove('show');
      modal.buttonCancel().removeEventListener('click', closeModal);
   }

   function changeModalContent({ title, description, buttonText }) {
      modal.title().innerHTML = title;
      modal.description().innerHTML = `Tem certeza que você deseja ${description} essa pergunta?`;
      modal.buttonAction().innerHTML = `Sim, ${buttonText}`;
   }
}  