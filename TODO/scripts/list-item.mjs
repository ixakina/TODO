import { createElement } from './utils.mjs';
export class ListItem {
  constructor(startDate, endDate, text, id) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.text = text;
    this.id = id;
    this.status = 'active';
  }

  createItem() {
    const item = createElement('li', 'list__item');

    item.id = this.id;

    const checkbox = createElement('input', 'item__is-done');
    checkbox.type = 'checkbox';

    if (this.status === 'done') {
      checkbox.checked = true;
      item.classList.add('done');
    } else {
      checkbox.checked = false;
      item.classList.remove('done');
    }

    const itemBody = createElement('div', 'item__body');

    const inputStartDate = createElement('span', 'item__start-date');
    inputStartDate.textContent = this.startDate;

    const inputText = createElement('span', 'item__text');
    inputText.textContent = this.text;

    const inputEndDate = createElement('span', 'item__end-date');
    inputEndDate.textContent = this.endDate;

    itemBody.append(inputStartDate, inputText, inputEndDate);

    const itemControls = createElement('div', 'item__controls');

    const deleteBtn = createElement('button', 'item__delete');

    const editBtn = createElement('button', 'item__edit');

    itemControls.append(deleteBtn, editBtn);

    item.append(checkbox, itemBody, itemControls);

    return item;
  }
}
