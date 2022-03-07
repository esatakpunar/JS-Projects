//UI variebles

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;


/* Load Items */

loadItems();


/* Call event listeners */
eventListeners();


function eventListeners() {
    /* submit event */
    form.addEventListener('submit', addNewItem);

    /* delete an item */
    taskList.addEventListener('click', deleteItem);

    /* delete all item */
    btnDeleteAll.addEventListener('click', deleteAllItems);
}


function loadItems() {

    items = getItemsFromLS();
    items.forEach(function(item) {
        createItem(item);
    });
}


/* Get Items From Local Storage */
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}


/* Set Item to Local Storage */
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}


/* Delete Item From Local Storage */
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function(item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}


/* Create Item */
function createItem(text) {
    /* Create 'li */
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    /* Create 'a' */
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    /* Add 'a' to 'li' */
    li.appendChild(a);

    /* Add 'li' to 'ul' */
    taskList.appendChild(li);
}


/* Add New item */
function addNewItem(e) {

    if (input.value === '') {
        alert('Add New Item !');
    } else {
        /* Create Item */
        createItem(input.value);

        /* Save to Local Storage */
        setItemToLS(input.value);


        /* Clear Input */
        input.value = '';
    }





    e.preventDefault();
}


/* Delete An Item */
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();

        /* Delete Item From Local Storage */
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);

    }

    e.preventDefault();
}


/* Delete All Item */
function deleteAllItems(e) {

    if (confirm('Are you sure ?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();

    }
    e.preventDefault();
}