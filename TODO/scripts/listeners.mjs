import { ListItem } from './list-item.mjs';
import { Modal } from './modal.mjs';

export class Listeners {
  typeModal = 'new';

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
    const newItem = itemData.createItem();

    this.dataList.push(itemData);

    const list = document.querySelector('.list');
    list.append(newItem);

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

    console.log(itemData);

    // const list = document.querySelector('.list');
    // const newItem = new ListItem(startDate, endDate, text).createItem();

    // list.append(newItem);
    event.target.closest('.modal').remove();
  }

  showModalNewItem() {
    const modal = new Modal();
    modal.validateDateInput();
    modal.addNewItemListeners();
  }

  showModalEditItem() {
    const modal = new Modal();
    modal.validateDateInput();
    modal.editItemListeners();
  }

  closeModal(event) {
    event.target.closest('.modal').remove();
  }

  editItem() {
    const fixedStartDate = new Date(
      document.querySelector('.modal__start-date').value
    ).toLocaleDateString();
    const fixedEndDate = new Date(
      document.querySelector('.modal__end-date').value
    ).toLocaleDateString();
    const fixedText = document.querySelector('.modal__text').value;
    const editableItem = document.querySelector('.editable');

    editableItem.querySelector('.item__start-date').textContent =
      fixedStartDate;
    editableItem.querySelector('.item__end-date').textContent = fixedEndDate;
    editableItem.querySelector('.item__text').textContent = fixedText;
    document.querySelector('.modal').remove();
  }

  showAllItems() {
    const allItems = document.querySelectorAll('.list__item');
    if (allItems.length) {
      allItems.forEach((item) => item.classList.remove('hide'));
    } else return;
  }

  showActiveItems() {
    const allItems = Array.from(document.querySelectorAll('.list__item'));
    if (allItems.length) {
      allItems.forEach((item) => item.classList.remove('hide'));
      allItems
        .filter((item) => item.dataset.status == 'done')
        .forEach((item) => item.classList.add('hide'));
    } else return;
  }

  showDoneItems() {
    const allItems = Array.from(document.querySelectorAll('.list__item'));
    if (allItems.length) {
      allItems.forEach((item) => item.classList.remove('hide'));
      allItems
        .filter((item) => item.dataset.status == 'active')
        .forEach((item) => item.classList.add('hide'));
    } else return;
  }

  clearDoneItems() {
    const allItems = Array.from(
      document.querySelectorAll('[data-status="done"]')
    );
    if (allItems.length) {
      allItems.forEach((item) => item.classList.remove('hide'));
      allItems.forEach((item) => item.remove());
    } else return;
  }
}

export const listeners = new Listeners();
