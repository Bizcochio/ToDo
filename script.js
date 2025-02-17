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
          <button class="editTask">✏️ Edit</button>
          <button class="deleteTask">🗑️ Delete</button>
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

document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");

  // Создаем кнопку-тоггл корзины в виде иконки
  const trashToggle = document.createElement("button");
  trashToggle.id = "trashToggle";
  trashToggle.innerHTML = '<i class="fas fa-trash"></i>';
  document.body.appendChild(trashToggle);

  // Создаем контейнер для корзины
  const trashContainer = document.createElement("div");
  trashContainer.id = "trashContainer";
  trashContainer.style.display = "none";
  document.body.appendChild(trashContainer);

  // В контейнере корзины создаем блок для тасков
  const trashTasksContainer = document.createElement("div");
  trashTasksContainer.id = "trashTasksContainer";
  trashContainer.appendChild(trashTasksContainer);

  // Сообщение "Корзина пуста"
  const emptyMsg = document.createElement("p");
  emptyMsg.id = "emptyTrashMessage";
  emptyMsg.textContent = "Recycle Bin is empty";
  trashTasksContainer.appendChild(emptyMsg);

  // Контейнер для кнопок внизу корзины
  const trashButtonsContainer = document.createElement("div");
  trashButtonsContainer.id = "trashButtonsContainer";
  trashContainer.appendChild(trashButtonsContainer);

  // Кнопка "Восстановить всё"
  const restoreAllBtn = document.createElement("button");
  restoreAllBtn.id = "restoreAllBtn";
  restoreAllBtn.textContent = "Restore all";
  trashButtonsContainer.appendChild(restoreAllBtn);

  // Кнопка "Очистить корзину"
  const clearTrashBtn = document.createElement("button");
  clearTrashBtn.id = "clearTrashBtn";
  clearTrashBtn.textContent = "Clear all";
  trashButtonsContainer.appendChild(clearTrashBtn);

  // Тоггл корзины по клику по иконке
  trashToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    trashContainer.style.display =
      trashContainer.style.display === "none" ? "block" : "none";
  });

  // Закрытие корзины при клике вне её
  document.addEventListener("click", (e) => {
    if (
      trashContainer.style.display === "block" &&
      !trashContainer.contains(e.target) &&
      e.target !== trashToggle
    ) {
      trashContainer.style.display = "none";
    }
  });

  // Обновление UI корзины: показываем сообщение "Корзина пуста", если нет тасков
  function updateTrashUI() {
    const tasksInTrash = trashTasksContainer.querySelectorAll(".task.inTrash");
    emptyMsg.style.display = tasksInTrash.length === 0 ? "block" : "none";
  }

  // Перемещение таска в корзину
  function moveToTrash(task) {
    task.classList.add("removing");
    setTimeout(() => {
      task.classList.remove("removing");
      task.classList.add("inTrash");
      trashTasksContainer.appendChild(task);
      updateTrashUI();
    }, 300);
  }

  // Восстановление таска из корзины
  function restoreTask(task) {
    task.classList.remove("inTrash");
    taskList.appendChild(task);
    updateTrashUI();
  }

  // Обеспечиваем наличие кнопки "Восстановить" в таске (если ее нет, добавляем)
  function ensureRestoreButton(task) {
    let restoreBtn = task.querySelector(".restoreTask");
    if (!restoreBtn) {
      restoreBtn = document.createElement("button");
      restoreBtn.classList.add("restoreTask");
      restoreBtn.textContent = "Restore";
      task.appendChild(restoreBtn);
      restoreBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        restoreTask(task);
      });
    }
  }

  // Заменяем обработчик "Удалить": теперь таск перемещается в корзину
  function replaceDeleteEvent(task) {
    const delBtn = task.querySelector(".deleteTask");
    if (!delBtn) return;
    const newDelBtn = delBtn.cloneNode(true);
    delBtn.parentNode.replaceChild(newDelBtn, delBtn);
    newDelBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      ensureRestoreButton(task);
      moveToTrash(task);
    });
  }

  // Обрабатываем все существующие таски
  document.querySelectorAll("#taskList .task").forEach((task) => {
    replaceDeleteEvent(task);
  });

  // Следим за новыми тасками (динамически добавляемыми)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.classList.contains("task")
          ) {
            replaceDeleteEvent(node);
          }
        });
      }
    }
  });
  observer.observe(taskList, { childList: true });

  // "Восстановить всё" — возвращает все таски из корзины в список
  restoreAllBtn.addEventListener("click", () => {
    const tasksInTrash = trashTasksContainer.querySelectorAll(".task.inTrash");
    tasksInTrash.forEach((task) => {
      restoreTask(task);
    });
  });

  // "Очистить корзину" — удаляет все таски из DOM
  clearTrashBtn.addEventListener("click", () => {
    const tasksInTrash = trashTasksContainer.querySelectorAll(".task.inTrash");
    tasksInTrash.forEach((task) => {
      task.remove();
    });
    updateTrashUI();
  });

  updateTrashUI();
});

document.addEventListener("DOMContentLoaded", () => {
  // Создаем кнопку меню (гамбургер)

  // Создаем выдвижную шторку настроек

  document.body.appendChild(settingsDrawer);

  // Клик по кнопке — открыть/закрыть шторку
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsDrawer.classList.toggle("open");
    menuButton.classList.toggle("moved");
  });

  // Закрываем шторку, если кликнули вне неё
  document.addEventListener("click", (e) => {
    // если шторка открыта и клик не по ней и не по кнопке
    if (
      settingsDrawer.classList.contains("open") &&
      !settingsDrawer.contains(e.target) &&
      e.target !== menuButton
    ) {
      settingsDrawer.classList.remove("open");
      menuButton.classList.remove("moved");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // --- Твой уже существующий код для кнопки и шторки настроек ---
  const menuButton = document.createElement("button");
  menuButton.id = "settingsMenuButton";
  menuButton.innerHTML = "&#9776;";
  document.body.appendChild(menuButton);

  const settingsDrawer = document.createElement("div");
  settingsDrawer.id = "settingsDrawer";
  // Вставляем в шторку наши настройки, включая пункт "Сменить язык"
  settingsDrawer.innerHTML = `
    <div class="settingsContent">
      <h2>Настройки</h2>

      <!-- Пункт меню: Сменить язык -->
      <div class="settingsItem" id="languageToggle">
        <span>Сменить язык</span>
        <span class="arrowIcon">▼</span>
      </div>

      <!-- Подменю языков с флагами (скрыто, пока не кликнем на "Сменить язык") -->
      <div class="languageSubmenu" id="languageSubmenu">
        <div class="languageOption" data-lang="de">
          <img src="https://flagcdn.com/h40/de.png" alt="German Flag" class="flagIcon">
          Немецкий
        </div>
        <div class="languageOption" data-lang="en">
          <img src="https://flagcdn.com/h40/gb.png" alt="English Flag" class="flagIcon">
          Английский
        </div>
        <div class="languageOption" data-lang="ru">
          <img src="https://flagcdn.com/h40/ru.png" alt="Russian Flag" class="flagIcon">
          Русский
        </div>
        <div class="languageOption" data-lang="cn">
          <img src="https://flagcdn.com/h40/cn.png" alt="Chinese Flag" class="flagIcon">
          Китайский
        </div>
        <div class="languageOption" data-lang="jp">
          <img src="https://flagcdn.com/h40/jp.png" alt="Japanese Flag" class="flagIcon">
          Японский
        </div>
        <div class="languageOption" data-lang="fr">
          <img src="https://flagcdn.com/h40/fr.png" alt="French Flag" class="flagIcon">
          Французский
        </div>
        <div class="languageOption" data-lang="es">
          <img src="https://flagcdn.com/h40/es.png" alt="Spanish Flag" class="flagIcon">
          Испанский
        </div>
      </div>
      <!-- Здесь могут быть другие пункты настроек, которые ты добавишь позже -->
    </div>
  `;
  document.body.appendChild(settingsDrawer);

  // Твоё существующее переключение шторки
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsDrawer.classList.toggle("open");
    menuButton.classList.toggle("moved");
  });

  // Закрыть шторку, если клик вне её
  document.addEventListener("click", (e) => {
    if (
      settingsDrawer.classList.contains("open") &&
      !settingsDrawer.contains(e.target) &&
      e.target !== menuButton
    ) {
      settingsDrawer.classList.remove("open");
      menuButton.classList.remove("moved");
    }
  });

  // --- Новая часть: логика для раскрытия/скрытия списка языков ---
  const languageToggle = settingsDrawer.querySelector("#languageToggle");
  const languageSubmenu = settingsDrawer.querySelector("#languageSubmenu");

  // При клике на "Сменить язык" показываем/скрываем подменю
  languageToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    languageSubmenu.classList.toggle("open");
  });

  // --- Новая часть: обрабатываем клик по каждому флагу ---
  const languageOptions = settingsDrawer.querySelectorAll(".languageOption");
  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedLang = option.getAttribute("data-lang");
      // Тут можно вызвать твою функцию смены языка
      alert("Вы выбрали язык: " + selectedLang);

      // Допустим, ты захочешь в будущем менять текст на сайте:
      // changeLanguage(selectedLang);

      // После выбора можно скрыть подменю, если захочешь:
      // languageSubmenu.classList.remove("open");
    });
  });
});
