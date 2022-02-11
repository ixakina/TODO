export function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

export function fillModalFields(start, end, text) {
  const startDate = document.querySelector('.modal__start-date');
  const endDate = document.querySelector('.modal__end-date');
  const savedText = document.querySelector('.modal__text');
  savedText.value = text;
  startDate.value = start;
  endDate.value = end;
}

export function getFormattedDate(date) {
  return date.split('.').reverse().join('-');
}

export function showModal() {
  const modal = createElement('div', 'modal modal-new-item');
  modal.innerHTML = `
      <div class="modal__overlay">
          <div class="modal__body">
              <h2>Create your task</h2>
              <div class="modal__form">
                  <label for="start-date">Enter start date</label><input id="start-date" min="" type="date" class="modal__start-date">
                  <label for="text">Enter your task</label><input id="text" type="text" class="modal__text">
                  <label for="end-date">Enter finish date</label><input id="end-date" min="" type="date" class="modal__end-date">
              </div>
              <div class="modal__controls">
              <button class="cancel">Cancel</button>
              <button class="save">Save</button>
          </div>
          </div>
      </div>`;
  document.body.prepend(modal);
}

export function validateInput() {
  this.value = this.value.replace(/[^a-zA-Z0-9]+/, '');
}
