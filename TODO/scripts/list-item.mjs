import { createElement } from './utils.mjs';

export class ListItem {
  constructor(startDate, endDate, text) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.text = text;
  }
  createItem() {
    const item = createElement('li', 'list__item');
    item.innerHTML = `
    <input type="checkbox" class="item__is-done">
    <div class="item__body">
         <span class="item__start-date">${this.startDate}</span>
         <span class="item__text">${this.text}</span>
         <span class="item__end-date">${this.endDate}</span>
    </div>
    <div class="item__controls">
         <button class="item__delete"></button>
         <button class="item__edit"></button>         
    </div>
    `;
    return item;
  }
}
