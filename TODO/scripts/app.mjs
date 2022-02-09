import { ListItem } from './list-item.mjs';
import { listeners } from './listeners.mjs';
import { Modal } from './modal.mjs';
import { fillModalFields, getFormattedDate } from './utils.mjs';

export class App {
  input = document.querySelector('.enter-item');
  addBtn = document.querySelector('.add-item');
  listItems = document.querySelector('ul');
  showAllBtn = document.querySelector('.all');
  showActiveBtn = document.querySelector('.active');
  showCompletedBtn = document.querySelector('.complete');
  clearBtn = document.querySelector('.clear');
  dataList = [];

  init() {
    this.createListeners();
  }

  createListeners() {
    this.input.addEventListener('change', this.createItemFromInput.bind(this));

    this.addBtn.addEventListener('click', () => {
      const modal = new Modal();
      modal.validateDateInput();
      const save = document.querySelector('.save');
      const cancel = document.querySelector('.cancel');

      save.addEventListener('click', this.createItemFromAddBtn.bind(this));
      cancel.addEventListener('click', listeners.closeModal);
    });

    this.listItems.addEventListener('click', (e) => {
      const id = +e.target.id;

      switch (e.target.className) {
        case 'item__edit':
          const modal = new Modal();
          modal.validateDateInput();

          fillModalFields(
            getFormattedDate(this.dataList[id].startDate),
            getFormattedDate(this.dataList[id].endDate),
            getFormattedDate(this.dataList[id].text)
          );

          const save = document.querySelector('.save');
          const cancel = document.querySelector('.cancel');

          save.addEventListener('click', () => this.editItem(id));
          cancel.addEventListener('click', listeners.closeModal);
          break;
        case 'item__delete':
          this.deleteItem(id);
          break;
      }
    });

    this.showAllBtn.addEventListener('click', listeners.showAllItems);
    this.showActiveBtn.addEventListener('click', listeners.showActiveItems);
    this.showCompletedBtn.addEventListener('click', listeners.showDoneItems);
    this.clearBtn.addEventListener('click', this.clearDoneItems.bind(this));
  }

  editItem(id) {
    const fixedStartDate = new Date(
      document.querySelector('.modal__start-date').value
    ).toLocaleDateString();

    const fixedEndDate = new Date(
      document.querySelector('.modal__end-date').value
    ).toLocaleDateString();

    const fixedText = document.querySelector('.modal__text').value;

    this.dataList[id].startDate = fixedStartDate;
    this.dataList[id].endDate = fixedEndDate;
    this.dataList[id].text = fixedText;

    this.redraw();

    listeners.closeModal();
  }

  deleteItem(id) {
    this.dataList.splice(id, 1);
    this.redraw();
    console.log(this.dataList);
  }

  createItemFromInput(event) {
    const date = new Date();
    const startDate = date.toLocaleDateString();
    date.setDate(date.getDate() + 1);
    const endDate = date.toLocaleDateString();
    const text = event.target.value;

    const itemData = new ListItem(
      startDate,
      endDate,
      text,
      this.dataList.length
    );

    this.dataList.push(itemData);
    this.redraw();

    event.target.value = '';
  }

  createItemFromAddBtn(event) {
    const startDate = new Date(
      document.querySelector('.modal__start-date').value
    ).toLocaleDateString();
    const endDate = new Date(
      document.querySelector('.modal__end-date').value
    ).toLocaleDateString();
    const text = document.querySelector('.modal__text').value;

    const itemData = new ListItem(
      startDate,
      endDate,
      text,
      this.dataList.length
    );
    const newItem = itemData.createItem();

    this.dataList.push(itemData);

    const list = document.querySelector('.list');
    list.append(newItem);

    event.target.closest('.modal').remove();
  }

  clearDoneItems() {
    const allItems = Array.from(
      document.querySelectorAll('[data-status="done"]')
    );
    if (allItems.length) {
      allItems.forEach((item) => this.dataList.splice(item.id, 1));
      this.redraw();
    } else return;
  }

  redraw() {
    this.listItems.innerHTML = '';

    this.dataList.forEach((todoItem) => {
      this.listItems.append(todoItem.createItem());
    });
  }
}
