export function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

export function fillModalFields(start, end, text) {
  const startDate = document.querySelector('.modal__start-date');
  const endDate = document.querySelector('.modal__end-date');
  const savedText = document.querySelector('.modal__text');
  savedText.value = text;
  startDate.value = start;
  endDate.value = end;
}

export function getFormattedDate(date) {
  return date.split('.').reverse().join('-');
}
