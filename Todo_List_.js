let todos = [];
let editingIndex = -1;

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const btnAdd = document.getElementById("btnAdd");
const todoList = document.getElementById("todoList");

// Render danh sách
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button class="complete">✓</button>
        <button class="edit">Sửa</button>
        <button class="delete">Xóa</button>
      </div>
    `;

    // Hoàn thành
    li.querySelector(".complete").addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    });

    // Sửa
    li.querySelector(".edit").addEventListener("click", () => {
      todoInput.value = todo.text;
      editingIndex = index;
      btnAdd.textContent = "Cập nhật";
    });

    // Xóa
    li.querySelector(".delete").addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
    });

    todoList.appendChild(li);
  });
}

// Xử lý thêm hoặc cập nhật
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text === "") return;

  if (editingIndex === -1) {
    // Thêm mới
    todos.push({ text, completed: false });
  } else {
    // Cập nhật
    todos[editingIndex].text = text;
    editingIndex = -1;
    btnAdd.textContent = "Thêm";
  }

  todoInput.value = "";
  renderTodos();
});
