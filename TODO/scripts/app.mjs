import { ListItem } from './list-item.mjs';
import { listeners } from './listeners.mjs';
import { Modal } from './modal.mjs';
import { fillModalFields, getFormattedDate } from './utils.mjs';

export class App {
  input = document.querySelector('.enter-item');
  settingsBtn = document.querySelector('.toggle-settings');
  settings = document.querySelector('.settings');
  sortSelect = document.querySelector('#select');
  dateFilter = document.querySelector('#filter');
  searchFilter = document.querySelector('#search');
  addBtn = document.querySelector('.add-item');
  listItems = document.querySelector('ul');
  showAllBtn = document.querySelector('.all');
  showActiveBtn = document.querySelector('.active');
  showCompletedBtn = document.querySelector('.complete');
  clearBtn = document.querySelector('.clear');
  dataList = [];
  sortType = null;
  sortByDate = false;
  sortByAlphabet = false;

  init() {
    this.createListeners();
  }

  createListeners() {
    this.input.addEventListener('change', this.createItemFromInput.bind(this));

    this.sortSelect.addEventListener(
      'change',
      this.setSortSettings.bind(this, this.dataList)
    );

    this.settingsBtn.addEventListener('click', this.toggleSettings.bind(this));

    this.dateFilter.addEventListener(
      'change',
      this.redraw.bind(this, this.dataList)
    );

    this.searchFilter.addEventListener(
      'input',
      this.redraw.bind(this, this.dataList)
    );

    this.addBtn.addEventListener('click', () => {
      const modal = new Modal();
      modal.validateDateInput();
      const save = document.querySelector('.save');
      const cancel = document.querySelector('.cancel');

      save.addEventListener('click', this.createItemFromAddBtn.bind(this));
      cancel.addEventListener('click', listeners.closeModal);
    });

    this.listItems.addEventListener('click', (e) => {
      const id = e.target.closest('.list__item').id;
      if (!id) return;

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

  filterByDate(data) {
    if (this.dateFilter.checked) {
      const filteredData = data.filter(
        (item) => item.endDate == new Date().toLocaleDateString()
      );
      return filteredData;
    }
  }

  filterByText(data) {
    const filteredData = data.filter((item) =>
      item.text.includes(this.searchFilter.value)
    );
    return filteredData;
  }

  setSortSettings(data) {
    switch (this.sortSelect.value) {
      case 'date-up':
        this.sortType = 'asc';
        this.sortByDate = true;
        this.sortByAlphabet = false;
        break;

      case 'date-down':
        this.sortType = 'desc';
        this.sortByDate = true;
        this.sortByAlphabet = false;
        break;

      case 'text-up':
        this.sortType = 'asc';
        this.sortByDate = false;
        this.sortByAlphabet = true;
        break;

      case 'text-down':
        this.sortType = 'desc';
        this.sortByDate = false;
        this.sortByAlphabet = true;
        break;
    }

    this.redraw(data);
  }

  sort(data) {
    this.sortText.call(this, data);
    this.sortDate.call(this, data);
    return data;
  }

  sortDate(data) {
    if (!this.sortByDate || !this.sortType) return;

    data.sort((itemA, itemB) => {
      const itemADate = new Date(getFormattedDate(itemA.endDate));
      const itemBDate = new Date(getFormattedDate(itemB.endDate));

      if (this.sortType === 'asc') {
        return itemADate - itemBDate;
      }

      if (this.sortType === 'desc') {
        return itemBDate - itemADate;
      }
    });
  }

  sortText(data) {
    if (!this.sortByAlphabet || !this.sortType) return;

    data.sort((itemA, itemB) => {
      if (this.sortType === 'asc') {
        return itemA.text > itemB.text ? 1 : -1;
      }

      if (this.sortType === 'desc') {
        return itemB.text > itemA.text ? 1 : -1;
      }
    });
  }

  toggleSettings() {
    this.settings.classList.toggle('hide');
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

    this.redraw(this.dataList);

    listeners.closeModal();
  }

  deleteItem(id) {
    this.dataList.splice(id, 1);
    this.redraw(this.dataList);
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
    this.redraw(this.dataList);

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
    const doneItems = Array.from(
      document.querySelectorAll('[data-status="done"]')
    );

    if (doneItems.length) {
      doneItems.forEach((done) => {
        const deletedItem = this.dataList.find((item) => done.id === item.id);
        this.dataList.splice(this.dataList.indexOf(deletedItem), 1);
      });

      this.redraw(this.dataList);
    } else return;
  }

  redraw(data) {
    this.listItems.innerHTML = '';

    if (this.dateFilter.checked) {
      const filteredData = data.filter(
        (item) => item.endDate == new Date().toLocaleDateString()
      );
      const res = filteredData.filter((item) =>
        item.text.includes(this.searchFilter.value)
      );

      this.sort(res).forEach((todoItem) => {
        this.listItems.append(todoItem.createItem());
      });
    } else {
      const res = data.filter((item) =>
        item.text.includes(this.searchFilter.value.toLowerCase())
      );
      this.sort(res).forEach((todoItem) => {
        this.listItems.append(todoItem.createItem());
      });
    }
  }
}
