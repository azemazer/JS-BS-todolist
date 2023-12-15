// import { 
//     createTodo,
//     renderTodos,
//     todoModal
// } from './components.js';

const nameModal = document.getElementById('nameModal');
const addTodoModal = document.getElementById('add-todo-modal');
const todoContainer = document.getElementById('todos-container');
const saveNameButton = document.getElementById('save-name');
const deleteNameButton = document.getElementById('delete-name');
const randomizeNameButton = document.getElementById('randomize-name');
const addTodoButton = document.getElementById('save-new-todo');
const whoAreYou = document.getElementById('who-are-you');

function whoArtThou(){
    let userName = localStorage.getItem("user-name");
    let userSurname = localStorage.getItem("user-surname");

    if ((userName != null && userName != '') && (userSurname != null && userSurname != '')){
        whoAreYou.innerText = 'Heya, ' + userName + ' ' + userSurname + '.'
      } else if ((userName != null && userName != '') || (userSurname != null && userSurname != '')) {
        whoAreYou.innerText = "I'm not quite sure who you are."
      } else {
        whoAreYou.innerText = 'Who are you?'
      }
}

nameModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  let userName = localStorage.getItem("user-name");
  let userSurname = localStorage.getItem("user-surname");

  let modalTitle = nameModal.querySelector('.modal-title')
  let modalBodyNameInput = nameModal.querySelector('.modal-body #user-name')
  let modalBodySurnameInput = nameModal.querySelector('.modal-body #user-surname')

  if ((userName != null && userName != '') && (userSurname != null && userSurname != '')){
    modalTitle.textContent = 'Are you not ' + userName + ' ' + userSurname + '?'
    modalBodySurnameInput.value = userSurname;
    modalBodyNameInput.value = userName;
  } else if ((userName != null && userName != '') || (userSurname != null && userSurname != '')) {
    modalTitle.textContent = 'Your name is only partially known to me, child.'
    modalBodySurnameInput.value = userSurname;
    modalBodyNameInput.value = userName;
  } else {
    modalTitle.textContent = 'Seriously though, who are you.'
    modalBodySurnameInput.value = userSurname;
    modalBodyNameInput.value = userName;
  }
  whoArtThou();
})

saveNameButton.addEventListener("click", ()=>{
    const nameValue = document.getElementById("user-name").value;
    const surnameValue = document.getElementById("user-surname").value;
    localStorage.setItem("user-name", nameValue);
    localStorage.setItem("user-surname", surnameValue);
    whoArtThou();
})

deleteNameButton.addEventListener("click", ()=>{
    localStorage.removeItem("user-name");
    localStorage.removeItem("user-surname");
    userName = null;
    userSurname = null;
    whoArtThou();
})

randomizeNameButton.addEventListener("click", async ()=>{
    let modalBodyNameInput = nameModal.querySelector('.modal-body #user-name')
    let modalBodySurnameInput = nameModal.querySelector('.modal-body #user-surname')

    const names = await getRandomNames();
    randomName = names.results[0].name.first;
    randomSurname = names.results[0].name.last;
    modalBodyNameInput.value = randomName;
    modalBodySurnameInput.value = randomSurname;
})

addTodoButton.addEventListener("click", () => {
    let currentUser = {};
    currentUser.name = localStorage.getItem("user-name")
    currentUser.surname = localStorage.getItem("user-surname")
    if (currentUser.name == null || currentUser.surname == null){
        return alert("Error: We don't quite know who you are yet.")
    }
    let newTodo = {};
    newTodo.title = document.getElementById("new-todo-title").value;
    newTodo.description = document.getElementById("new-todo-description").value;
    newTodo.user = currentUser.name + " " + currentUser.surname;
    let todoList = localStorage.getItem("todolist");
    let newTodoList = {};
    if (!(todoList == null || todoList == "{}")) {
        newTodoList = JSON.parse(todoList);
    }
    newTodoList[newTodo.title] = newTodo;
    localStorage.setItem("todolist", JSON.stringify(newTodoList));
    renderTodos();
})

async function getRandomNames(){
    try {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        return(data);
    }
    catch (e) { 
        console.log(e)
    }
}

// COMPONENT FUNCTIONS

function todoModal(infos){
    /*
    *   CONTAINER
    */
    let todoModalElement = document.createElement("div");
    todoModalElement.classList.add("modal-content");

    let todoModalElementOnTop = document.createElement("div");
    todoModalElementOnTop.classList.add("modal-dialog");

    let todoModalElementOnTopWrapper = document.createElement("div");
    todoModalElementOnTopWrapper.classList.add("modal", "fade");
    todoModalElementOnTopWrapper.id = "todo-modal-" + infos.title.replace(/\s/g, '');
    todoModalElementOnTopWrapper.setAttribute("tabindex", "-1");
    todoModalElementOnTopWrapper.setAttribute("aria-labelledby", "todo-modal-title-" + infos.title.replace(/\s/g, ''));
    todoModalElementOnTopWrapper.setAttribute("aria-hidden", "true");

    /*
    *   HEADER
    */
    let todoModalHeaderElement = document.createElement("div");
    todoModalHeaderElement.classList.add("modal-header");

    let todoModalHeaderTitle = document.createElement("h5");
    todoModalHeaderTitle.classList.add("modal-title");
    todoModalHeaderTitle.id = "todo-modal-title-" + infos.title.replace(/\s/g, '');

    let todoModalHeaderCloseButton = document.createElement("button");
    todoModalHeaderCloseButton.type = "button";
    todoModalHeaderCloseButton.classList.add('btn-close');
    todoModalHeaderCloseButton.setAttribute("data-bs-dismiss", "modal");
    todoModalHeaderCloseButton.setAttribute("aria-label", "Close");

    todoModalHeaderElement.append(todoModalHeaderTitle, todoModalHeaderCloseButton);

    /*
    *   BODY
    */
    let todoModalBodyElement = document.createElement("div");
    todoModalBodyElement.classList.add("modal-body");

    let todoModalForm = document.createElement("form");

    let todoModalTitleInputElement = document.createElement("div");
    todoModalTitleInputElement.classList.add("mb-3");

    let todoModalTitleInputLabel = document.createElement("label");
    todoModalTitleInputLabel.setAttribute("for", "todo-modal-title-" + infos.title.replace(/\s/g, ''));
    todoModalTitleInputLabel.classList.add("col-form-label");
    todoModalTitleInputLabel.innerText = "Title";

    let todoModalTitleInput = document.createElement("input");
    todoModalTitleInput.type = "text";
    todoModalTitleInput.classList.add("form-control");
    todoModalTitleInput.id = "todo-modal-title-" + infos.title.replace(/\s/g, '');
    todoModalTitleInput.value = infos.title;

    todoModalTitleInputElement.append(todoModalTitleInputLabel, todoModalTitleInput);
        
    let todoModalDescriptionInputElement = document.createElement("div");
    todoModalDescriptionInputElement.classList.add("mb-3");

    let todoModalDescriptionInputLabel = document.createElement("label");
    todoModalDescriptionInputLabel.setAttribute("for", "todo-modal-description-" + infos.title.replace(/\s/g, ''));
    todoModalDescriptionInputLabel.classList.add("col-form-label");
    todoModalDescriptionInputLabel.innerText = "Description";

    let todoModalDescriptionInput = document.createElement("input");
    todoModalDescriptionInput.type = "text";
    todoModalDescriptionInput.classList.add("form-control");
    todoModalDescriptionInput.id = "todo-modal-description-" + infos.title.replace(/\s/g, '');
    todoModalDescriptionInput.value = infos.description;

    todoModalDescriptionInputElement.append(todoModalDescriptionInputLabel, todoModalDescriptionInput);

    todoModalForm.append(todoModalTitleInputElement, todoModalDescriptionInputElement);

    todoModalBodyElement.append(todoModalForm);

    /*
    *   FOOTER
    */
    let todoModalFooterElement = document.createElement("div");
    todoModalFooterElement.classList.add("modal-footer");

    let todoModalCloseButton = document.createElement("button");
    todoModalCloseButton.type = "button";
    todoModalCloseButton.classList.add("btn", "btn-secondary");
    todoModalCloseButton.id = "todo-close-modal-" + infos.title.replace(/\s/g, '');
    todoModalCloseButton.innerText = "Close";

    let todoModalSaveChangesButton = document.createElement("button");
    todoModalSaveChangesButton.type = "button";
    todoModalSaveChangesButton.classList.add("btn", "btn-primary");
    todoModalSaveChangesButton.id = "todo-save-changes-" + infos.title.replace(/\s/g, '');
    todoModalSaveChangesButton.innerText = "Save changes";

    // todoModalSaveChangesButton.addEventListener("click", ()=>{
    //     let oldTodoList = JSON.parse(localStorage.getItem("todolist"));
    //     let newTitle = document.getElementById("todo-modal-title-" + infos.title.replace(/\s/g, '')).value;
    //     let newDescription = document.getElementById("todo-modal-description-" + infos.title.replace(/\s/g, '')).value;
    //     console.log(newTitle);
    //     console.log(newDescription);
    //     oldTodoList[infos.title].title = newTitle != undefined ? newTitle : oldTodoList[infos.title].title;
    //     oldTodoList[infos.title].description = newDescription;
    //     console.log(oldTodoList[infos.title]);

    //     localStorage.setItem("todolist", JSON.stringify(oldTodoList));
    //     renderTodos();
    // })

    todoModalFooterElement.append(todoModalCloseButton, todoModalSaveChangesButton);

    /*
    *   FINAL APPEND
    */
    todoModalElement.append(todoModalHeaderElement, todoModalBodyElement, todoModalFooterElement);
    todoModalElementOnTop.appendChild(todoModalElement);
    todoModalElementOnTopWrapper.appendChild(todoModalElementOnTop);
    return todoModalElementOnTopWrapper;
}

function createTodo(infos){
    console.log(infos)
    /*
    *   CONTAINER
    */
    let todoElement = document.createElement("a");
    todoElement.href = "#";
    todoElement.classList.add("list-group-item", "list-group-item-action", "todo-" + infos.title.replace(/\s/g, ''))

    /*
    *   MODAL
    */
    let todoModalNode = todoModal(infos);
    todoElement.appendChild(todoModalNode);

    /*
    *   HEADING
    */
    let todoHeadingElement = document.createElement("div");
    todoHeadingElement.classList.add("d-flex", "w-100", "justify-content-between")

    let todoTitleText = document.createElement("h5");
    todoTitleText.classList.add("mb-1");
    todoTitleText.innerText = infos.title;
    
    let todoCreationDateText = document.createElement("small");
    todoCreationDateText.innerText = new Date().toISOString();

    todoHeadingElement.append(todoTitleText, todoCreationDateText);

    /*
    *   DESCRIPTION
    */
    let todoDescriptionText = document.createElement("p");
    todoDescriptionText.classList.add('mb-1');
    todoDescriptionText.innerText = infos.description

    /*
    *   FOOTER
    */
    let todoFooterElement = document.createElement("div");
    todoFooterElement.classList.add("d-flex", "justify-content-between");

    let todoUserText = document.createElement("small");
    todoUserText.innerText = "Posted by " + infos.user

    
    let todoButtonGroupElement = document.createElement("div");
    todoButtonGroupElement.classList.add("btn-group", "btn-group-sm");

    let todoEditButton = document.createElement("button");
    todoEditButton.type = "button";
    todoEditButton.classList.add("btn", "btn-secondary");
    todoEditButton.innerText = "Edit todo";
    todoEditButton.setAttribute("data-bs-toggle", "modal");
    todoEditButton.setAttribute("data-bs-target", "#todo-modal-" + infos.title.replace(/\s/g, ''))

    let todoDeleteButton = document.createElement("button");
    todoDeleteButton.type = "button";
    todoDeleteButton.classList.add("btn", "btn-danger");
    todoDeleteButton.innerText = "Delete todo";

    todoEditButton.addEventListener("click", () => {
        // Open edit modal
    })

    todoDeleteButton.addEventListener("click", () => {
        let oldTodoList = JSON.parse(localStorage.getItem("todolist"));
        delete oldTodoList[infos.title];
        localStorage.setItem("todolist", JSON.stringify(oldTodoList));
        renderTodos();
    })

    todoButtonGroupElement.append(todoEditButton, todoDeleteButton);
    todoFooterElement.append(todoUserText, todoButtonGroupElement);
    todoElement.append(todoHeadingElement, todoDescriptionText, todoFooterElement);

    return [todoElement, todoModalNode];

}

function renderTodos(){
    // Rerender les todos à chaque action
    let todosList = localStorage.getItem("todolist");

    if (todosList == null){
        return
    }

    todoContainer.innerHTML = "";
    let todos = JSON.parse(todosList);
    Object.entries(todos).forEach(todo => {
        todoNodes = (createTodo(todo[1]));
        todoContainer.append(todoNodes[1], todoNodes[0]);
    })
}

/*
*   MAIN EXEC
*/

whoArtThou();
renderTodos()