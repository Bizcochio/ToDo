document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("taskInput");
  const button = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.classList.add("task", "fadeIn");

    li.innerHTML = `
      <button class="completeTask">✔</button>
      <span class="taskText">${taskText.replace(/\n/g, "<br>")}</span>
      <button class="menuButton"><i class="fas fa-ellipsis-h"></i></button>
      <div class="taskMenu">
          <button class="editTask">✏️ Редактировать</button>
          <button class="deleteTask">🗑️ Удалить</button>
      </div>
    `;

    taskList.appendChild(li);
    input.value = "";

    // Настраиваем меню для нового таска
    setupMenu(li);

    // Кнопка "Выполнено"
    li.querySelector(".completeTask").addEventListener("click", function () {
      let task = this.closest(".task");
      task.classList.toggle("completed");
    });

    // Удаление таска
    li.querySelector(".deleteTask").addEventListener("click", function (e) {
      e.stopPropagation();
      li.classList.add("removing");
      setTimeout(() => li.remove(), 500);
    });

    // Редактирование таска
    li.querySelector(".editTask").addEventListener("click", function (e) {
      e.stopPropagation();
      editTask(li);
    });
  }

  button.addEventListener("click", addTask);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addTask();
    }
    if (event.key === "Tab" && event.shiftKey) {
      event.preventDefault();
      const start = input.selectionStart;
      input.value =
        input.value.substring(0, start) + "\n" + input.value.substring(start);
      input.selectionStart = input.selectionEnd = start + 1;
    }
  });

  function editTask(li) {
    const taskSpan = li.querySelector(".taskText");
    const oldText = taskSpan.innerHTML.replace(/<br>/g, "\n");

    const input = document.createElement("textarea");
    input.value = oldText;
    input.classList.add("editInput");

    taskSpan.replaceWith(input);
    input.focus();

    input.addEventListener("blur", saveEdit);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        saveEdit();
      }
    });

    function saveEdit() {
      const newText = input.value.trim();
      if (newText === "") {
        input.value = oldText;
      }
      const newSpan = document.createElement("span");
      newSpan.classList.add("taskText");
      newSpan.innerHTML = input.value.replace(/\n/g, "<br>");
      input.replaceWith(newSpan);
    }
  }

  function setupMenu(taskElement) {
    const button = taskElement.querySelector(".menuButton");
    const menu = taskElement.querySelector(".taskMenu");

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      // Закрываем все другие открытые меню
      document.querySelectorAll(".taskMenu.visible").forEach((openMenu) => {
        if (openMenu !== menu) {
          openMenu.classList.remove("visible");
        }
      });

      // Переключаем текущее меню
      menu.classList.toggle("visible");
    });
  }

  // Закрываем меню при клике вне него
  document.addEventListener("click", (event) => {
    document.querySelectorAll(".taskMenu.visible").forEach((menu) => {
      if (!menu.contains(event.target)) {
        menu.classList.remove("visible");
      }
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    function setupMenu(taskElement) {
      const button = taskElement.querySelector(".menuButton");
      const menu = taskElement.querySelector(".taskMenu");

      function showMenu() {
        // Закрываем все другие открытые меню
        document.querySelectorAll(".taskMenu.visible").forEach((openMenu) => {
          if (openMenu !== menu) {
            openMenu.classList.remove("visible");
          }
        });

        // Показываем текущее меню
        menu.classList.add("visible");
      }

      function hideMenu() {
        setTimeout(() => {
          if (!menu.matches(":hover") && !button.matches(":hover")) {
            menu.classList.remove("visible");
          }
        }, 200); // Задержка для плавности
      }

      button.addEventListener("mouseenter", showMenu);
      button.addEventListener("mouseleave", hideMenu);
      menu.addEventListener("mouseenter", showMenu);
      menu.addEventListener("mouseleave", hideMenu);
    }

    // Применяем настройку меню ко всем уже существующим задачам
    document.querySelectorAll(".task").forEach(setupMenu);
  });
});
