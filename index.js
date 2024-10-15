const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-button");
const todoList = document.getElementById("list-container");

let todoCount =0;

addTodoBtn.addEventListener("click", function (event) {
  event.preventDefault(); 
  
  const todoText = todoInput.value.trim();

  if (todoText) {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";

    const taskText = document.createElement("span");
    taskText.textContent = todoText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
      todoList.removeChild(listItem);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    editBtn.addEventListener("click", function () {
      if (editBtn.textContent === "Edit") {

        function updateTodoCounter(change) {
          todoCount += change;
          todoCounter.textContent = `Total Todos: ${todoCount}`;
        }
        
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText.textContent; 
        listItem.replaceChild(editInput, taskText);
        editInput.focus();
        editBtn.textContent = "Save"; 
      } else {
       
        taskText.textContent = editInput.value.trim() || todoText; 
        listItem.replaceChild(taskText, editInput);
        editBtn.textContent = "Edit"; 
        editBtn.style.display = "none"; 
      }
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteBtn);
    listItem.appendChild(editBtn);

    todoList.appendChild(listItem);
    todoInput.value = ""; 
  }
});

