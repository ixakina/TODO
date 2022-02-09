import { ListItem } from './list-item.mjs';
import { listeners } from './listeners.mjs';

export class App {
  input = document.querySelector('.enter-item');
  addBtn = document.querySelector('.add-item');
  showAllBtn = document.querySelector('.all');
  showActiveBtn = document.querySelector('.active');
  showCompletedBtn = document.querySelector('.complete');
  clearBtn = document.querySelector('.clear');
  dataList = [];

  init() {
    this.createListeners();
  }

  createListeners() {
    this.input.addEventListener(
      'change',
      listeners.createItemFromInput.bind(this)
    );
    this.addBtn.addEventListener('click', listeners.showModalNewItem);
    this.showAllBtn.addEventListener('click', listeners.showAllItems);
    this.showActiveBtn.addEventListener('click', listeners.showActiveItems);
    this.showCompletedBtn.addEventListener('click', listeners.showDoneItems);
    this.clearBtn.addEventListener('click', listeners.clearDoneItems);
  }
}
