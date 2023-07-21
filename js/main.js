// Сделайте чеклист, представляющий собой список дел. Дела можно добавлять, изменять, удалять и помечать сделанными.

const form = document.querySelector('.js-form');
const formText = document.querySelector('.js-form-text');
const taskList = document.querySelector('.js-task__list');

if (localStorage.getItem('html')) {
  loadHTMLtoLS();
}

checkQuantityTask();
form.addEventListener('submit', addTask);
taskList.addEventListener('click', delTask);
taskList.addEventListener('click', makeTsak);
taskList.addEventListener('click', editTask);

// Функции

function editTask(e) {
  if (e.target.dataset.action === 'edit') {
    const parentNode = e.target.closest('.task__item');
    const taskText = parentNode.querySelector('.item-task__text');

    const editTaskText = document.createElement('input');
    editTaskText.type = 'text';
    editTaskText.classList.add('edit-task-text')
    editTaskText.value = taskText.textContent;
    taskText.textContent = '';

    taskText.appendChild(editTaskText);
    editTaskText.focus();

    editTaskText.addEventListener('blur', function () {
      taskText.textContent = this.value;
      editTaskText.remove();
      saveHTMLtoLS();
    })
  }
  saveHTMLtoLS();
}

function makeTsak(e) {
  if (e.target.dataset.action === 'ok') {
    const parentNode = e.target.closest('.task__item');
    parentNode.classList.toggle('ok');
    const btnEdit = parentNode.querySelector('.item-task__edit');

    if (parentNode.matches('.ok')) {
      parentNode.classList.add('task__item-green');
      btnEdit.disabled = true;
      e.target.textContent = 'OFF';
    } else {
      parentNode.classList.remove('task__item-green');
      btnEdit.disabled = false;
      e.target.textContent = 'ON';
    }
    saveHTMLtoLS();
  }
}

function delTask(e) {
  if (e.target.closest('.item-task__del')) {
    const parentNode = e.target.closest('.task__item');
    btnGroup = e.target.closest('.buttons-group');
    parentNode.classList.add('task__item-red')

    let idInterval = setInterval(function () {
      parentNode.remove();
      checkQuantityTask();
      clearInterval(idInterval);
    }, 3000);
    const cancel = document.createElement('button');
    cancel.textContent = 'cancel';
    cancel.style.width = '60px';
    cancel.style.backgroundColor = 'red';
    btnGroup.insertAdjacentElement('beforeend', cancel)

    cancel.addEventListener('click', function () {
      clearInterval(idInterval);
      parentNode.classList.remove('task__item-red');
      this.remove();
    })
  }
  saveHTMLtoLS();
}

function addTask(e) {
  e.preventDefault();
  if (formText.value.length > 0) {
    const htmlTextTask = `
      <li class="task__item">
      <div class="item-task__text">${formText.value}</div>
      <div class="buttons-group">
        <button class="item-task__edit" data-action="edit">Edit</button>
        <button class="item-task__ok" data-action="ok">ON</button>
        <button class="item-task__del">Del</button>
      </div>
      </li>`
    formText.value = '';
    formText.focus();
    taskList.insertAdjacentHTML('beforeend', htmlTextTask);
    checkQuantityTask();
    saveHTMLtoLS();
  }
}

function checkQuantityTask() {
  if (taskList.children.length > 0) {
    taskList.classList.add('task-list-border');
    if (document.querySelector('.info-task-list')) document.querySelector('.info-task-list').remove();
  
  } else if (taskList.children.length === 0) {
    taskList.classList.remove('task-list-border');
    const infoTaskList = document.createElement('h2');
    infoTaskList.classList.add('info-task-list');
    infoTaskList.textContent = 'Список дел пуст :-(';
    taskList.insertAdjacentElement('beforebegin', infoTaskList)

  }
  saveHTMLtoLS();
}

function saveHTMLtoLS() {
  localStorage.setItem('html', taskList.innerHTML);
}

function loadHTMLtoLS() {
    taskList.innerHTML = localStorage.getItem('html')
}