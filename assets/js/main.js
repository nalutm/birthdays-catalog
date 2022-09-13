import { newBirthday } from './_new-birthday.js';
import { validate } from './_form-validation.js';
import { deleteItem } from './_delete-birthday.js';

document.addEventListener('DOMContentLoaded', () => {
  
  const $form = document.querySelector('[data-form]');
  const $inputs =  $form.querySelectorAll('[data-field]');
  const $table = document.querySelector('[data-table]');
  const itens = JSON.parse(localStorage.getItem('itens')) || [];
  const $modalContainer = document.querySelector('[data-modal="container"]');
  
  if (!localStorage.getItem("itens")) {
    localStorage.setItem("itens", JSON.stringify([]));
  }

  $inputs.forEach(input => input.addEventListener('focusout', (e) => {
    validate(e.target);
  }));

  if (itens) {
    itens.forEach(item => {
      newBirthday(item, $table);
    });
  }

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    const { name, birthday } = e.target.elements;
    const currentItem = { name: name.value, birthday: birthday.value };

    const birthdayExist = itens.find(item => item.name === name.value);

    if (birthdayExist) {
      alert('O aniversariante já existe na lista');
    } else {
      currentItem.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
      newBirthday(currentItem, $table);
      itens.push(currentItem);
    }

    localStorage.setItem("itens", JSON.stringify(Array.from(itens)));

    $form.reset();
  })

  $table.addEventListener('click', (e) => {
    const isEditBtn = e.target.dataset.action === 'edit';
    const isDeleteBtn = e.target.dataset.action === 'delete';
    const birthdayInfo = e.target.parentElement.parentElement;
    const id = birthdayInfo.dataset.id;

    if (isEditBtn) {
      window.location.href = `./edit-registration.html?id=${id}`;
    } else if (isDeleteBtn) {
      $modalContainer.setAttribute('data-id', id);
      deleteItem.showModal($modalContainer);
    }
  });

  $modalContainer.addEventListener('click', (e) => {
    const id = $modalContainer.getAttribute('data-id');
    const birthdayInfo = document.querySelector(`[data-id="${id}"]`);

    const isDeleteBtn = e.target.dataset.modal === 'delete';
    const isCancelBtn = e.target.dataset.modal === 'cancel';

    if (isDeleteBtn) {
      deleteItem.deleteBirthday(birthdayInfo, itens);
      deleteItem.closeModal($modalContainer);
    } else if (isCancelBtn) {
      deleteItem.closeModal($modalContainer);
    }
  })
});
