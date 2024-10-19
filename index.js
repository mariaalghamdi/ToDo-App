const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-button");
const todoList = document.getElementById("list-container");
const todoCounter = document.getElementById("todo-counter");
const searchInput = document.getElementById("search-input");

let todoCount = 0;

function updateTodoCounter() {
  todoCounter.textContent = `Total Tasks: ${todoCount}`;
}

function saveTodos() {
  const todos = [];
  todoList.querySelectorAll("li").forEach((listItem) => {
    const taskText = listItem.querySelector("span").textContent;
    todos.push(taskText);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todoText) => addTodoItem(todoText));
}

function addTodoItem(todoText) {
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
    todoCount--;
    updateTodoCounter();
    saveTodos();
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";

  let editInput;

  editBtn.addEventListener("click", function () {
    if (editBtn.textContent === "Edit") {
      editInput = document.createElement("input");
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
      saveTodos();
    }
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taskText);
  listItem.appendChild(deleteBtn);
  listItem.appendChild(editBtn);

  todoList.appendChild(listItem);

  todoCount++;
  updateTodoCounter();
}


addTodoBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText) {
    addTodoItem(todoText);
    saveTodos();
    todoInput.value = "";
  }
});


window.addEventListener("load", function () {
  loadTodos();
});


function searchTodos() {
  const searchText = searchInput.value.toLowerCase();
  const todos = todoList.getElementsByTagName("li");

  for (let i = 0; i < todos.length; i++) {
    const taskText = todos[i]
      .getElementsByTagName("span")[0]
      .textContent.toLowerCase();

    if (taskText.includes(searchText)) {
      todos[i].style.display = ""; 
    } else {
      todos[i].style.display = "none"; 
    }
  }
}
