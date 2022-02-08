import { listeners } from './listeners.js';

export class App {
  input = document.querySelector('.enter-item');
  addBtn = document.querySelector('.add-item');

  init() {
    this.input.addEventListener('change', listeners.createItem);
    this.addBtn.addEventListener('click', listeners.showModalCreateItem);
  }
}
