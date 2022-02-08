import { ListItem } from './list-item.mjs';

export class Listeners {
  typeModalToShow = '';

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
    event.target.closest('.modal').classList.add('hide');
  }

  closeModal(event) {
    event.target.closest('.modal').classList.add('hide');
  }

  showModalCreateItem() {
    const modal = document.querySelector('.modal-new-item');
    modal.classList.remove('hide');
  }

  showModalEditItem() {
    const modal = document.querySelector('.modal-edit-item');
    modal.classList.remove('hide');
  }
}

export const listeners = new Listeners();
