const closeModal = (modalContainer) => {
  modalContainer.classList.remove('modal-container--active');
  setTimeout(() => modalContainer.classList.add('modal-container--inactive'), 150);
}

const deleteBirthday = (birthdayInfo, itens) => {
  const id = birthdayInfo.dataset.id;
  birthdayInfo.remove();
  itens.splice(itens.findIndex(item => item.id == id), 1);
  localStorage.setItem("itens", JSON.stringify(itens));
};

const showModal = (modalContainer) => {
  modalContainer.classList.add('modal-container--active');

  if (modalContainer.classList.contains('modal-container--active')) {
    modalContainer.classList.remove('modal-container--inactive');
  }
}

export const deleteItem = {
  closeModal,
  deleteBirthday,
  showModal
}
