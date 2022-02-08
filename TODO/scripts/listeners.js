import { ListItem } from './list-item.mjs';

export class Listeners {
  createItem(event) {
    const date = new Date();
    const startDate = date.toLocaleDateString();
    date.setDate(date.getDate() + 1);
    const endDate = date.toLocaleDateString();
    const text = event.target.value;

    const list = document.querySelector('.list');
    const newItem = new ListItem(startDate, endDate, text).createItem();
    list.append(newItem);
  }

  showModalCreateItem() {}
}

export const listeners = new Listeners();
