import { listeners } from './listeners.mjs';
import { createElement, fillModalFields, getFormattedDate } from './utils.mjs';

export class ListItem {
  constructor(startDate, endDate, text, id) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.text = text;
    this.id = id;
  }

  createItem() {
    const item = createElement('li', 'list__item');
    item.dataset.status = 'active';
    item.id = this.id;

    const checkbox = createElement('input', 'item__is-done');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        inputText.classList.add('done');
        item.dataset.status = 'done';
      } else {
        inputText.classList.remove('done');
        item.dataset.status = 'active';
      }
    });

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
    deleteBtn.addEventListener('click', () => item.remove());

    const editBtn = createElement('button', 'item__edit');

    editBtn.addEventListener('click', (event) => {
      event.target.closest('.list__item').classList.add('editable');

      listeners.showModalEditItem();

      fillModalFields(
        getFormattedDate(this.startDate),
        getFormattedDate(this.endDate),
        getFormattedDate(this.text)
      );
    });

    itemControls.append(deleteBtn, editBtn);

    item.append(checkbox, itemBody, itemControls);

    return item;
  }
}
