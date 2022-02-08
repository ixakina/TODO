import { createElement } from './utils.mjs';
import { listeners } from './listeners.mjs';

export class Modal {
  constructor() {
    this.modal = createElement('div', 'modal modal-new-item');
    this.modal.innerHTML = `
        <div class="modal__overlay">
            <div class="modal__body">
                <h2>Create your task</h2>
                <div class="modal__form">
                    <label for="start-date">Enter start date</label><input id="start-date" type="date" class="modal__start-date">
                    <label for="text">Enter your task</label><input id="text" type="text" class="modal__text">
                    <label for="end-date">Enter finish date</label><input id="end-date" type="date" class="modal__end-date">
                </div>
                <div class="modal__controls">
                <button class="cancel">Cancel</button>
                <button class="save">Save</button>
            </div>
            </div>
        </div>`;
    document.body.prepend(this.modal);
  }

  addNewItemListeners() {
    const save = document.querySelector('.save');
    const cancel = document.querySelector('.cancel');

    save.addEventListener('click', listeners.createItemFromAddBtn);
    cancel.addEventListener('click', listeners.closeModal);
  }

  editItemListeners() {
    const save = document.querySelector('.save');
    const cancel = document.querySelector('.cancel');

    save.addEventListener('click', listeners.editItem);
    cancel.addEventListener('click', listeners.closeModal);
  }
}
