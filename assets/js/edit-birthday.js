import { validate } from './_form-validation.js';
import { deleteItem } from './_delete-birthday.js'

const $form = document.querySelector('[data-form]');
const $inputs =  $form.querySelectorAll('[data-field]');
const $modalContainer = document.querySelector('[data-modal="container"]');

$inputs.forEach(input => input.addEventListener('focusout', (e) => {
  validate(e.target);
}));

const getURL = new URL(window.location);
const id = getURL.searchParams.get('id');
const itens = JSON.parse(localStorage.getItem('itens'));

const itemToEdit = itens.find(item => item.id === Number(id));

$inputs.forEach(input => {
  if (input.dataset.field === 'name') input.value = itemToEdit.name;
  if (input.dataset.field === 'birthday') input.value = itemToEdit.birthday;
});

const submitBtn = $form.querySelector('[data-form="submit"]');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const name = $form.querySelector('[data-field="name"]').value;
  const birthday = $form.querySelector('[data-field="birthday"]').value;
  const editedItem = {
    name, 
    birthday 
  }

  editedItem.id = itemToEdit.id;
  itens[itens.findIndex(item => item.id === itemToEdit.id)] = editedItem;
  localStorage.setItem("itens", JSON.stringify(Array.from(itens)));
  deleteItem.showModal($modalContainer);
});

$modalContainer.addEventListener('click', (e) => {
  const isRegistrationPageBtn = e.target.dataset.modal === 'registration';
  const isCancelBtn = e.target.dataset.modal === 'cancel';

  if (isRegistrationPageBtn) {
    window.location.href = './index.html';
    deleteItem.closeModal($modalContainer);
  } else if (isCancelBtn) {
    deleteItem.closeModal($modalContainer);
  }
});
