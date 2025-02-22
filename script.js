/***** Глобальные переменные и переводы *****/
let currentLang = localStorage.getItem("selectedLanguage") || "ru";
const translations = {
  en: {
    settingsTitle: "Settings",
    changeLanguage: "Change Language",
    addTask: "Add",
    deleteTask: "Delete",
    editTask: "Edit",
    restoreTask: "Restore",
    restoreAll: "Restore All",
    clearTrash: "Clear All",
    emptyTrash: "Recycle Bin is empty",
    taskPlaceholder: "Write your task here...",
    languages: {
      ru: "Russian",
      en: "English",
      de: "German",
      cn: "Chinese",
      jp: "Japanese",
      fr: "French",
      es: "Spanish",
    },
  },
  ru: {
    settingsTitle: "Настройки",
    changeLanguage: "Сменить язык",
    addTask: "Добавить",
    deleteTask: "Удалить",
    editTask: "Редактировать",
    restoreTask: "Восстановить",
    restoreAll: "Восстановить всё",
    clearTrash: "Очистить корзину",
    emptyTrash: "Корзина пуста",
    taskPlaceholder: "Напиши задачу здесь...",
    languages: {
      ru: "Русский",
      en: "Английский",
      de: "Немецкий",
      cn: "Китайский",
      jp: "Японский",
      fr: "Французский",
      es: "Испанский",
    },
  },
  de: {
    settingsTitle: "Einstellungen",
    changeLanguage: "Sprache ändern",
    addTask: "Hinzufügen",
    deleteTask: "Löschen",
    editTask: "Bearbeiten",
    restoreTask: "Wiederherstellen",
    restoreAll: "Alle wiederherstellen",
    clearTrash: "Papierkorb leeren",
    emptyTrash: "Papierkorb ist leer",
    taskPlaceholder: "Aufgabe hier eingeben...",
    languages: {
      ru: "Russisch",
      en: "Englisch",
      de: "Deutsch",
      cn: "Chinesisch",
      jp: "Japanisch",
      fr: "Französisch",
      es: "Spanisch",
    },
  },
  cn: {
    settingsTitle: "设置",
    changeLanguage: "更改语言",
    addTask: "添加任务",
    deleteTask: "删除",
    editTask: "编辑",
    restoreTask: "恢复",
    restoreAll: "恢复所有",
    clearTrash: "清空回收站",
    emptyTrash: "回收站为空",
    taskPlaceholder: "在此输入您的任务...",
    languages: {
      ru: "俄语",
      en: "英语",
      de: "德语",
      cn: "中文",
      jp: "日语",
      fr: "法语",
      es: "西班牙语",
    },
  },
  jp: {
    settingsTitle: "設定",
    changeLanguage: "言語を変更",
    addTask: "追加",
    deleteTask: "削除",
    editTask: "編集",
    restoreTask: "復元",
    restoreAll: "すべて復元",
    clearTrash: "ゴミ箱を空にする",
    emptyTrash: "ゴミ箱は空です",
    taskPlaceholder: "ここにタスクを入力...",
    languages: {
      ru: "ロシア語",
      en: "英語",
      de: "ドイツ語",
      cn: "中国語",
      jp: "日本語",
      fr: "フランス語",
      es: "スペイン語",
    },
  },
  fr: {
    settingsTitle: "Paramètres",
    changeLanguage: "Changer de langue",
    addTask: "Ajouter",
    deleteTask: "Supprimer",
    editTask: "Modifier",
    restoreTask: "Restaurer",
    restoreAll: "Restaurer tout",
    clearTrash: "Vider la corbeille",
    emptyTrash: "La corbeille est vide",
    taskPlaceholder: "Écrivez votre tâche ici...",
    languages: {
      ru: "Russe",
      en: "Anglais",
      de: "Allemand",
      cn: "Chinois",
      jp: "Japonais",
      fr: "Français",
      es: "Espagnol",
    },
  },
  es: {
    settingsTitle: "Configuración",
    changeLanguage: "Cambiar idioma",
    addTask: "Agregar",
    deleteTask: "Eliminar",
    editTask: "Editar",
    restoreTask: "Restaurar",
    restoreAll: "Restaurar todo",
    clearTrash: "Vaciar la papelera",
    emptyTrash: "La papelera está vacía",
    taskPlaceholder: "Escribe tu tarea aquí...",
    languages: {
      ru: "Ruso",
      en: "Inglés",
      de: "Alemán",
      cn: "Chino",
      jp: "Japonés",
      fr: "Francés",
      es: "Español",
    },
  },
};
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // Создаем оверлей для анимации
  const overlay = document.createElement("div");
  overlay.classList.add("theme-transition-overlay");
  document.body.appendChild(overlay);

  // Загружаем сохраненную тему или по умолчанию ставим "dark"
  let savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme, false);

  themeToggle.addEventListener("click", () => {
    // Анимация вращения кнопки
    themeIcon.classList.add("rotating");
    setTimeout(() => themeIcon.classList.remove("rotating"), 500);

    // Переключаем тему: если светлая – меняем на тёмную и наоборот
    let newTheme = document.body.classList.contains("light-theme")
      ? "dark"
      : "light";
    applyTheme(newTheme, true);
  });

  function applyTheme(theme, animate) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      themeIcon.src = "images/002-sun.png"; // Иконка для светлой темы
    } else {
      document.body.classList.remove("light-theme");
      themeIcon.src = "images/001-full-moon.png"; // Иконка для тёмной темы
    }

    // Запускаем анимацию перехода, если animate = true
    if (animate) {
      overlay.classList.add("theme-transition");
      setTimeout(() => {
        overlay.classList.remove("theme-transition");
      }, 500);
    }

    // Сохраняем выбранную тему
    localStorage.setItem("theme", theme);
  }
});

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  currentLang = lang;
  const settingsHeader = document.querySelector(
    "#settingsDrawer .settingsContent h2"
  );
  if (settingsHeader) settingsHeader.textContent = t.settingsTitle;
  const languageToggleText = document.querySelector(
    "#languageToggle span:first-child"
  );
  if (languageToggleText) languageToggleText.textContent = t.changeLanguage;
  const addTaskBtn = document.getElementById("addTask");
  if (addTaskBtn) addTaskBtn.textContent = t.addTask;
  const taskInput = document.getElementById("taskInput");
  if (taskInput && t.taskPlaceholder) taskInput.placeholder = t.taskPlaceholder;
  const emptyTrashMsg = document.getElementById("emptyTrashMessage");
  if (emptyTrashMsg) emptyTrashMsg.textContent = t.emptyTrash;
  document
    .querySelectorAll(".editTask")
    .forEach((btn) => (btn.textContent = t.editTask));
  document
    .querySelectorAll(".deleteTask")
    .forEach((btn) => (btn.textContent = t.deleteTask));
  document
    .querySelectorAll(".restoreTask")
    .forEach((btn) => (btn.textContent = t.restoreTask));
  const restoreAllBtn = document.getElementById("restoreAllBtn");
  if (restoreAllBtn) restoreAllBtn.textContent = t.restoreAll;
  const clearTrashBtn = document.getElementById("clearTrashBtn");
  if (clearTrashBtn) clearTrashBtn.textContent = t.clearTrash;
}
applyTranslations(currentLang);

/***** ЛОГИКА ToDo List *****/

const inputField = document.getElementById("taskInput");
const addButton = document.getElementById("addTask");
const taskListElem = document.getElementById("taskList");

function addTask() {
  const taskText = inputField.value.trim();
  if (!taskText) return;

  const t = translations[currentLang] || translations["ru"];

  const li = document.createElement("li");
  li.classList.add("task"); // Добавляем без анимации

  li.innerHTML = `
  <button class="completeTask">✔</button>
  <span class="taskText">${taskText.replace(/\n/g, "<br>")}</span>
  <button class="menuButton"><i class="fas fa-ellipsis-h"></i></button>
  <div class="taskMenu">
    <button class="editTask">${t.editTask}</button>
    <button class="deleteTask">${t.deleteTask}</button>
  </div>
`;

  li.style.opacity = "0";
  li.style.transform = "translateY(-10px)";

  // Добавляем таск в начало списка
  taskListElem.prepend(li);

  // Даем браузеру немного времени обработать добавление, а потом включаем анимацию
  setTimeout(() => {
    li.style.opacity = "1";
    li.style.transform = "translateY(0)";
    li.style.transition =
      "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
  }, 10);

  inputField.value = "";
  setupMenu(li);
  taskListElem.prepend(li);
  inputField.value = "";

  setupMenu(li);
  setupDragAndDrop(li);
  setupCompletion(li);

  // Обработчик удаления через корзину
  li.querySelector(".deleteTask").addEventListener("click", (e) => {
    e.stopPropagation();
    li.classList.add("removing");
    setTimeout(() => li.remove(), 500);
  });
  // Обработчик редактирования
  li.querySelector(".editTask").addEventListener("click", (e) => {
    e.stopPropagation();
    editTask(li);
  });
}
addButton.addEventListener("click", addTask);
inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    addTask();
  }
  if (event.key === "Tab" && event.shiftKey) {
    event.preventDefault();
    const start = inputField.selectionStart;
    inputField.value =
      inputField.value.substring(0, start) +
      "\n" +
      inputField.value.substring(start);
    inputField.selectionStart = inputField.selectionEnd = start + 1;
  }
});

function editTask(li) {
  const taskSpan = li.querySelector(".taskText");
  const oldText = taskSpan.innerHTML.replace(/<br>/g, "\n");
  const textArea = document.createElement("textarea");
  textArea.classList.add("editInput");
  textArea.value = oldText;
  taskSpan.replaceWith(textArea);
  textArea.focus();
  function saveEdit() {
    const newText = textArea.value.trim() || oldText;
    const newSpan = document.createElement("span");
    newSpan.classList.add("taskText");
    newSpan.innerHTML = newText.replace(/\n/g, "<br>");
    textArea.replaceWith(newSpan);
  }
  textArea.addEventListener("blur", saveEdit);
  textArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      saveEdit();
    }
  });
}

function setupMenu(taskElement) {
  const button = taskElement.querySelector(".menuButton");
  const menu = taskElement.querySelector(".taskMenu");
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".taskMenu.visible").forEach((openMenu) => {
      if (openMenu !== menu) openMenu.classList.remove("visible");
    });
    menu.classList.toggle("visible");
  });
  button.addEventListener("mouseenter", () => menu.classList.add("visible"));
  button.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!menu.matches(":hover") && !button.matches(":hover"))
        menu.classList.remove("visible");
    }, 200);
  });
  menu.addEventListener("mouseenter", () => menu.classList.add("visible"));
  menu.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!menu.matches(":hover") && !button.matches(":hover"))
        menu.classList.remove("visible");
    }, 200);
  });
}
document.addEventListener("click", (e) => {
  document.querySelectorAll(".taskMenu.visible").forEach((menu) => {
    if (!menu.contains(e.target)) menu.classList.remove("visible");
  });
});

// Обработка выполнения таска: если не выполнен – запускаем анимацию спуска и перемещаем в конец; если выполнен – возвращаем в начало

function setupCompletion(taskElement) {
  const completeButton = taskElement.querySelector(".completeTask");
  completeButton.addEventListener("click", () => {
    if (!taskElement.classList.contains("completed")) {
      // Отмечаем задачу выполненной и запускаем анимацию спуска
      taskElement.classList.add("completed");
      taskElement.classList.add("slide-down");
      setTimeout(() => {
        taskElement.classList.remove("slide-down");

        // Перебираем все задачи, чтобы найти первую выполненную задачу
        const tasks = Array.from(taskListElem.children);
        let inserted = false;
        for (let i = 0; i < tasks.length; i++) {
          // Если встречаем задачу, которая уже выполнена и не является текущей
          if (
            tasks[i].classList.contains("completed") &&
            tasks[i] !== taskElement
          ) {
            taskListElem.insertBefore(taskElement, tasks[i]);
            inserted = true;
            break;
          }
        }
        // Если не найдено ни одной выполненной задачи – добавляем в конец
        if (!inserted) {
          taskListElem.appendChild(taskElement);
        }
      }, 400);
    } else {
      // Если снимаем отметку о выполнении, возвращаем задачу в начало общего списка
      taskElement.classList.remove("completed");
      taskListElem.prepend(taskElement);
    }
  });
}

/* Drag & Drop для тасков */
function setupDragAndDrop(taskElement) {
  taskElement.addEventListener("dragstart", (e) => {
    e.dataTransfer.effectAllowed = "move";
    taskElement.classList.add("dragging");
  });
  taskElement.addEventListener("dragend", () => {
    taskElement.classList.remove("dragging");
  });
  taskElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    taskElement.classList.add("drag-over");
  });
  taskElement.addEventListener("dragleave", () => {
    taskElement.classList.remove("drag-over");
  });
  taskElement.addEventListener("drop", (e) => {
    e.preventDefault();
    taskElement.classList.remove("drag-over");
    const draggingItem = document.querySelector(".dragging");
    if (draggingItem && draggingItem !== taskElement) {
      let tasks = Array.from(taskListElem.children);
      let draggingIndex = tasks.indexOf(draggingItem);
      let targetIndex = tasks.indexOf(taskElement);
      if (draggingIndex < targetIndex) {
        taskListElem.insertBefore(draggingItem, taskElement.nextSibling);
      } else {
        taskListElem.insertBefore(draggingItem, taskElement);
      }
    }
  });
}

/***** Функционал корзины (Trash) *****/

// Элементы корзины
const trashToggle = document.getElementById("trashToggle");
const trashContainer = document.getElementById("trashContainer");
const trashTasksContainer = document.getElementById("trashTasksContainer");
const emptyTrashMessage = document.getElementById("emptyTrashMessage");
const restoreAllBtn = document.getElementById("restoreAllBtn");
const clearTrashBtn = document.getElementById("clearTrashBtn");

// Функция открытия/закрытия корзины
trashToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  // Если корзина скрыта или не установлено свойство display – показываем, иначе скрываем
  if (
    trashContainer.style.display === "none" ||
    trashContainer.style.display === ""
  ) {
    trashContainer.style.display = "block";
  } else {
    trashContainer.style.display = "none";
  }
});

// Функция обновления UI корзины (показывает сообщение, если корзина пуста)
function updateTrashUI() {
  const tasksInTrash = trashTasksContainer.querySelectorAll(".task.inTrash");
  emptyTrashMessage.style.display =
    tasksInTrash.length === 0 ? "block" : "none";
}

// Функция перемещения задачи в корзину с анимацией
function moveToTrash(task) {
  task.classList.add("removing");
  setTimeout(() => {
    task.classList.remove("removing");
    task.classList.add("inTrash");
    trashTasksContainer.appendChild(task);
    updateTrashUI();
  }, 300);
}

// Функция восстановления задачи из корзины
function restoreTask(task) {
  task.classList.remove("inTrash");
  // Восстанавливаем в конец основного списка (можно изменить на prepend, если нужно)
  document.getElementById("taskList").appendChild(task);
  updateTrashUI();
}

function ensureRestoreButton(task) {
  let restoreBtn = task.querySelector(".restoreTask");
  if (!restoreBtn) {
    restoreBtn = document.createElement("button");
    restoreBtn.classList.add("restoreTask");

    // Теперь использует перевод в зависимости от выбранного языка
    restoreBtn.textContent =
      translations[currentLang]?.restoreTask || "Restore";

    restoreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      restoreTask(task);
    });

    task.appendChild(restoreBtn);
  }
}

// Переподключаем обработчик для кнопки "Удалить", чтобы таск уходил в корзину
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

// Для всех существующих тасков в списке подключаем обработчик удаления
document.querySelectorAll("#taskList .task").forEach((task) => {
  replaceDeleteEvent(task);
});

// Если новые таски добавляются динамически, следим за ними
const trashObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
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
  });
});
trashObserver.observe(document.getElementById("taskList"), {
  childList: true,
});

// Обработчик кнопки "Восстановить всё"
restoreAllBtn.addEventListener("click", () => {
  const tasksInTrash = trashTasksContainer.querySelectorAll(".task.inTrash");
  tasksInTrash.forEach((task) => restoreTask(task));
});

// Обработчик кнопки "Очистить корзину"
clearTrashBtn.addEventListener("click", () => {
  const tasksInTrash = trashTasksContainer.querySelectorAll(".task.inTrash");
  tasksInTrash.forEach((task) => task.remove());
  updateTrashUI();
});

// Первоначальное обновление UI корзины
updateTrashUI();

// Дополнительно, если у тебя есть обработчик клика по document, чтобы закрывать корзину при клике вне её:
document.addEventListener("click", (e) => {
  if (
    trashContainer.style.display === "block" &&
    !trashContainer.contains(e.target) &&
    e.target !== trashToggle
  ) {
    trashContainer.style.display = "none";
  }
});

/* Шторка настроек и переключение языка */
const settingsButton = document.getElementById("settingsMenuButton");
const settingsDrawer = document.getElementById("settingsDrawer");
settingsButton.addEventListener("click", (e) => {
  e.stopPropagation();
  settingsDrawer.classList.toggle("open");
  settingsButton.classList.toggle("moved");
});
document.addEventListener("click", (e) => {
  if (
    settingsDrawer.classList.contains("open") &&
    !settingsDrawer.contains(e.target) &&
    e.target !== settingsButton
  ) {
    settingsDrawer.classList.remove("open");
    settingsButton.classList.remove("moved");
  }
});
const languageToggleElem = document.getElementById("languageToggle");
const languageSubmenuElem = document.getElementById("languageSubmenu");
languageToggleElem.addEventListener("click", (e) => {
  e.stopPropagation();
  languageSubmenuElem.classList.toggle("open");
});
document.querySelectorAll(".languageOption").forEach((option) => {
  option.addEventListener("click", () => {
    const selectedLang = option.getAttribute("data-lang");
    applyTranslations(selectedLang);
    localStorage.setItem("selectedLanguage", selectedLang);
    languageSubmenuElem.classList.remove("open");
  });
});

/* Генерация пикселей через JS */
document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < 60; i++) {
    let star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.animationDuration = Math.random() * 4 + 2 + "s";
    star.style.animationDelay = Math.random() * 2 + "s";
    document.body.appendChild(star);
  }
});
