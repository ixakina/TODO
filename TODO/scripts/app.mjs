import { listeners } from './listeners.mjs';

export class App {
  input = document.querySelector('.enter-item');
  addBtn = document.querySelector('.add-item');

  init() {
    this.createListeners();
  }

  createListeners() {
    this.input.addEventListener('change', listeners.createItemFromInput);
    this.addBtn.addEventListener('click', listeners.showModalNewItem);
  }
}
