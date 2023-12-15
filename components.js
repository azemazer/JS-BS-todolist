function createTodo(infos){
    /*
    *   CONTAINER
    */
    let todoElement = document.createElement("a");
    todoElement.href = "#";
    todoElement.classList.add("list-group-item", "list-group-item-action", "todo-" + infos.index)

    /*
    *   MODAL
    */
    let todoModal = todoModal(infos);
    todoElement.appendChild(todoModal);

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

    let todoDeleteButton = document.createElement("button");
    todoDeleteButton.type = "button";
    todoDeleteButton.classList.add("btn", "btn-danger");

    todoEditButton.addEventListener("click", () => {
        // Open edit modal
    })

    todoDeleteButton.addEventListener("click", () => {
        let oldTodoList = JSON.parse(localStorage.getItem("todolist"));
        delete oldTodoList[infos.index];
        localStorage.setItem("todolist", oldTodoList);
        renderTodos();
    })

}

function renderTodos(){
    // Rerender les todos à chaque action
}

function todoModal(infos){
    /*
    *   CONTAINER
    */
    let todoModalElement = document.createElement("div");
    todoModalElement.classList.add("modal-content");

    /*
    *   HEADER
    */
    let todoModalHeaderElement = document.createElement("div");
    todoModalHeaderElement.classList.add("modal-header");

    let todoModalHeaderTitle = document.createElement("h5");
    todoModalHeaderTitle.classList.add("modal-title");
    todoModalHeaderTitle.id = "todo-modal-" + infos.index;

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
    todoModalTitleInputLabel.setAttribute("for", "todo-modal-title-" + infos.index);
    todoModalTitleInputLabel.classList.add("col-form-label");
    todoModalTitleInputLabel.innerText = "Title";

    let todoModalTitleInput = document.createElement("input");
    todoModalTitleInput.type = "text";
    todoModalTitleInput.classList.add("form-control");
    todoModalTitleInput.id = "todo-modal-title-" + infos.index;
    todoModalTitleInput.value = infos.title;

    todoModalTitleInputElement.append(todoModalTitleInputLabel, todoModalTitleInput);
        
    let todoModalDescriptionInputElement = document.createElement("div");
    todoModalDescriptionInputElement.classList.add("mb-3");

    let todoModalDescriptionInputLabel = document.createElement("label");
    todoModalDescriptionInputLabel.setAttribute("for", "todo-modal-description-" + infos.index);
    todoModalDescriptionInputLabel.classList.add("col-form-label");
    todoModalDescriptionInputLabel.innerText = "Description";

    let todoModalDescriptionInput = document.createElement("input");
    todoModalDescriptionInput.type = "text";
    todoModalDescriptionInput.classList.add("form-control");
    todoModalDescriptionInput.id = "todo-modal-description-" + infos.index;
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
    todoModalCloseButton.id = "todo-close-modal-" + infos.index;

    let todoModalSaveChangesButton = document.createElement("button");
    todoModalSaveChangesButton.type = "button";
    todoModalSaveChangesButton.classList.add("btn", "btn-primary");
    todoModalSaveChangesButton.id = "todo-save-changes-" + infos.index;

    todoModalFooterElement.append(todoModalCloseButton, todoModalSaveChangesButton);

    /*
    *   FINAL APPEND
    */
    todoModalElement.append(todoModalHeaderElement, todoModalBodyElement, todoModalFooterElement)
    return todoModalElement;
}
