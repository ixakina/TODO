export class Listeners {
  closeModal() {
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
        .filter((item) => item.classList.contains('done'))
        .forEach((item) => item.classList.add('hide'));
    } else return;
  }

  showDoneItems() {
    const allItems = Array.from(document.querySelectorAll('.list__item'));
    if (allItems.length) {
      allItems.forEach((item) => item.classList.remove('hide'));
      allItems
        .filter((item) => !item.classList.contains('done'))
        .forEach((item) => item.classList.add('hide'));
    } else return;
  }
}

export const listeners = new Listeners();
