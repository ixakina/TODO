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

    const list = document.querySelector('.list');
    const newItem = new ListItem(startDate, endDate, text).createItem();
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

    const list = document.querySelector('.list');
    const newItem = new ListItem(startDate, endDate, text).createItem();

    list.append(newItem);
    event.target.closest('.modal').remove();
  }

  showModalNewItem() {
    const modal = new Modal();
    modal.addNewItemListeners();
  }

  showModalEditItem() {
    const modal = new Modal();
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
}

export const listeners = new Listeners();
