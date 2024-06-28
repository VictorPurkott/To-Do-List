/* ========================================================
                Definição de Variável Global
   ======================================================== */

   const input = document.querySelector("input");
   const addButton = document.querySelector(".add__button");
   const todoHtml = document.querySelector(".todo");
   const emptyImage = document.querySelector(".empty__image");
   let todoJson = JSON.parse(localStorage.getItem("todo")) || [];


/* ========================================================
        Definição do método da Função "getTodoHtml"

            para retornar o codigo TodoHtml
======================================================== */

function getTodoHtml(todo, index) {
    if (filter && filter != todo.status) {
      return '';
    }
    let checked = todo.status == "completed" ? "checked" : "";
    return /* html */ `
      <li class="todo">
        <label for="${index}">
          <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
          <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
      </li>
    `; 
  }


  /* ========================================================
        Definição do método da Função "showTodo"
======================================================== */

function showTodo() {
    if (todoJson.length == 0) {
        todoHtml.innerHTML == '';
        emptyImage.style.display = 'block';
    } else {
        todoHtml.innerHTML = todoJson.map(getTodoHtml).join('');
        emptyImage.style.display = 'none';
    }
}


/* ========================================================
        Definição do método da Função "addTodo"
                        &
                   seus Listeners
======================================================== */

function addTodo(todo) {
    input.value = "";
    todoJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todo", JSON.stringify(todoJson));
    showTodo();
}

input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if (!todo || e.key != "Enter") {
        return;
    }
    addTodo(todo);
});

addButton.addEventListener("click", () => {
    let todo = input.value.trim();
    if (!todo) {
        return;
    }
    addTodo(todo);
});


/* ========================================================
        Definição do método da Função "updateStatus"
======================================================== */

function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
      todoName.classList.add("checked");
      todoJson[todo.id].status = "completed";
    } else {
      todoName.classList.remove("checked");
      todoJson[todo.id].status = "pending";
    }
    localStorage.setItem("todo", JSON.stringify(todoJson));
  }

  
/* ========================================================
        Definição do método da Função "remove"
======================================================== */

  function remove(todo) {
    const index = todo.dataset.index;
    todoJson.splice(index, 1);
    showTodo();
    localStorage.setItem("todo", JSON.stringify(todoJson));
  }
  
  filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active');
        filter = '';
      } else {
        filters.forEach(tag => tag.classList.remove('active'));
        el.classList.add('active');
        filter = e.target.dataset.filter;
      }
      showTodo();
    });
  });
  
  deleteAllButton.addEventListener("click", () => {
    todoJson = [];
    localStorage.setItem("todo", JSON.stringify(todoJson));
    showTodo();
  });