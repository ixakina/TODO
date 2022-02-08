import { listeners } from './listeners.js';

export class App {
  input = document.querySelector('.enter-item');
  addBtn = document.querySelector('.add-item');
  cancelModalNewItem = document.querySelector('.modal-new-item .cancel');
  saveModalNewItem = document.querySelector('.modal-new-item .save');
  cancelModalEditItem = document.querySelector('.modal-edit-item .cancel');
  saveModalEditItem = document.querySelector('.modal-edit-item .save');

  init() {
    this.createListeners();
  }

  createListeners() {
    this.input.addEventListener('change', listeners.createItemFromInput);
    this.addBtn.addEventListener('click', listeners.showModalCreateItem);
    this.saveModalNewItem.addEventListener(
      'click',
      listeners.createItemFromAddBtn
    );
    this.cancelModalNewItem.addEventListener('click', listeners.closeModal);
  }
}
