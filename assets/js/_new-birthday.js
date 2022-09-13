export const newBirthday = (data, table) => {

  const newBirthday = document.createElement('tr')
  const content =  `
<td class="table__data" data-table="name">${data.name}</td>
<td class="table__data" data-table="birthday">${data.birthday}</td>
<td class="table__actions">
<button class="actionBtn actionBtn--edit" data-action="edit">Editar</button>
<button class="actionBtn actionBtn--delete" data-action="delete">Excluir</button></td>
`
  newBirthday.innerHTML = content;
  newBirthday.dataset.id = data.id;

  table.appendChild(newBirthday);
}
