import { SORT_CONDITION, SORT_TYPE } from './app.consts.mjs';
import { ListItem } from './list-item.mjs';
import { listeners } from './listeners.mjs';
import {
  fillModalFields,
  getFormattedDate,
  showModal,
  validateInput,
} from './utils.mjs';

export class App {
  input = document.querySelector('.enter-item');
  settingsBtn = document.querySelector('.toggle-settings');
  settings = document.querySelector('.settings');
  sortByDateBtn = document.querySelector('.sort-by-date');
  sortByAlphabetBtn = document.querySelector('.sort-by-alphabet');
  dateFilter = document.querySelector('#date');
  searchFilter = document.querySelector('#search');
  addBtn = document.querySelector('.add-item');
  listItems = document.querySelector('ul');
  showAllBtn = document.querySelector('.all');
  showActiveBtn = document.querySelector('.active');
  showCompletedBtn = document.querySelector('.complete');
  clearBtn = document.querySelector('.clear');
  dataList = [];
  sortType = SORT_TYPE.ALPHABET;
  sortCondition = SORT_CONDITION.ASC;

  init() {
    this.createListeners();
  }

  createListeners() {
    this.input.addEventListener('change', this.createItemFromInput.bind(this));
    this.input.addEventListener('input', validateInput);
    this.sortByDateBtn.addEventListener('click', this.sortByDate.bind(this));
    this.sortByAlphabetBtn.addEventListener(
      'click',
      this.sortByAlphabet.bind(this)
    );

    this.settingsBtn.addEventListener('click', this.toggleSettings.bind(this));
    this.dateFilter.addEventListener('change', this.redraw.bind(this));
    this.searchFilter.addEventListener('input', this.redraw.bind(this));
    this.addBtn.addEventListener('click', () => {
      showModal();
      const save = document.querySelector('.save');
      const cancel = document.querySelector('.cancel');

      save.addEventListener('click', this.createItemFromAddBtn.bind(this));
      cancel.addEventListener('click', listeners.closeModal);
    });
    this.showAllBtn.addEventListener('click', listeners.showAllItems);
    this.showActiveBtn.addEventListener('click', listeners.showActiveItems);
    this.showCompletedBtn.addEventListener('click', listeners.showDoneItems);
    this.clearBtn.addEventListener('click', this.clearDoneItems.bind(this));

    this.listItems.addEventListener('click', (e) => {
      const id = e.target.closest('.list__item').id;
      if (!id) return;

      switch (e.target.className) {
        case 'item__edit':
          showModal();

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
        case 'item__is-done':
          if (e.target.checked) {
            this.dataList[id].status = 'done';
            e.target.closest('.list__item').classList.add('done');
          } else {
            this.dataList[id].status = 'active';
            e.target.closest('.list__item').classList.remove('done');
          }
      }
    });
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
    const deletedItem = this.dataList.find((item) => item.id == id);
    this.dataList.splice(this.dataList.indexOf(deletedItem), 1);
    this.redraw();
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

  createItemFromAddBtn() {
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

    this.dataList.push(itemData);
    this.redraw();

    listeners.closeModal();
  }

  sortByDate() {
    this.sortCondition =
      this.sortCondition === SORT_CONDITION.ASC
        ? SORT_CONDITION.DESC
        : SORT_CONDITION.ASC;

    this.sortType = SORT_TYPE.DATE;

    this.redraw();
  }

  sortByAlphabet() {
    this.sortCondition =
      this.sortCondition === SORT_CONDITION.ASC
        ? SORT_CONDITION.DESC
        : SORT_CONDITION.ASC;

    this.sortType = SORT_TYPE.ALPHABET;

    this.redraw();
  }

  toggleSettings() {
    this.settings.classList.toggle('hide');
  }

  clearDoneItems() {
    this.dataList = this.dataList.filter((item) => item.status == 'active');
    this.redraw();
  }

  redraw() {
    this.listItems.innerHTML = '';

    this.dataList
      .filter((todoItem) => {
        if (!this.searchFilter.value.trim()) {
          return true;
        } else {
          return todoItem.text.includes(this.searchFilter.value);
        }
      })
      .filter((todoItem) => {
        if (!this.dateFilter.value) {
          return true;
        } else {
          return getFormattedDate(todoItem.endDate) === this.dateFilter.value;
        }
      })
      .sort((itemA, itemB) => {
        const [increase, decrease] =
          this.sortCondition === SORT_CONDITION.ASC ? [1, -1] : [-1, 1];

        switch (this.sortType) {
          case SORT_TYPE.ALPHABET:
            return itemA.text.toLowerCase() > itemB.text.toLowerCase()
              ? increase
              : decrease;
          case SORT_TYPE.DATE:
            const itemADate = new Date(getFormattedDate(itemA.startDate));
            const itemBDate = new Date(getFormattedDate(itemB.startDate));
            return itemADate - itemBDate > 0 ? increase : decrease;
          default:
            break;
        }
      })
      .forEach((todoItem) => {
        this.listItems.append(todoItem.createItem());
      });
  }
}
