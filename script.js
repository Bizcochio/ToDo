document.addEventListener("DOMContentLoaded", () => {
  // ===================
  // 0. Глобальные переменные и переводы
  // ===================
  let currentLang = localStorage.getItem("selectedLanguage") || "ru";

  const translations = {
    en: {
      settingsTitle: "Settings",
      changeLanguage: "Change Language",
      addTask: "Add Task",
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
      addTask: "Добавить задачу",
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
      addTask: "Aufgabe hinzufügen",
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
      addTask: "タスクを追加",
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
      addTask: "Ajouter une tâche",
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
      addTask: "Agregar tarea",
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

  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;
    currentLang = lang;

    // Обновляем заголовок настроек
    const settingsHeader = document.querySelector(
      "#settingsDrawer .settingsContent h2"
    );
    if (settingsHeader) {
      settingsHeader.textContent = t.settingsTitle;
    }

    // Пункт "Сменить язык"
    const languageToggleText = document.querySelector(
      "#languageToggle span:first-child"
    );
    if (languageToggleText) {
      languageToggleText.textContent = t.changeLanguage;
    }

    // Кнопка "Добавить задачу"
    const addTaskBtn = document.getElementById("addTask");
    if (addTaskBtn) {
      addTaskBtn.textContent = t.addTask;
    }

    // Placeholder поля ввода
    const taskInput = document.getElementById("taskInput");
    if (taskInput && t.taskPlaceholder) {
      taskInput.placeholder = t.taskPlaceholder;
    }

    // Сообщение в корзине
    const emptyTrashMsg = document.getElementById("emptyTrashMessage");
    if (emptyTrashMsg) {
      emptyTrashMsg.textContent = t.emptyTrash;
    }

    // Кнопки "Edit", "Delete", "Restore" в существующих задачах
    document.querySelectorAll(".editTask").forEach((btn) => {
      btn.textContent = t.editTask;
    });
    document.querySelectorAll(".deleteTask").forEach((btn) => {
      btn.textContent = t.deleteTask;
    });
    document.querySelectorAll(".restoreTask").forEach((btn) => {
      btn.textContent = t.restoreTask;
    });

    // Кнопки "Restore all" и "Clear all"
    const restoreAllBtn = document.getElementById("restoreAllBtn");
    if (restoreAllBtn) {
      restoreAllBtn.textContent = t.restoreAll;
    }
    const clearTrashBtn = document.getElementById("clearTrashBtn");
    if (clearTrashBtn) {
      clearTrashBtn.textContent = t.clearTrash;
    }
  }

  // Применяем язык при загрузке
  applyTranslations(currentLang);

  // ===================
  // 1. ToDo List
  // ===================
  const inputField = document.getElementById("taskInput");
  const addButton = document.getElementById("addTask");
  const taskListElem = document.getElementById("taskList");

  function addTask() {
    const taskText = inputField.value.trim();
    if (!taskText) return;

    // Текущие переводы
    const t = translations[currentLang] || translations["ru"];

    const li = document.createElement("li");
    li.classList.add("task", "fadeIn");

    li.innerHTML = `
      <button class="completeTask">✔</button>
      <span class="taskText">${taskText.replace(/\n/g, "<br>")}</span>
      <button class="menuButton"><i class="fas fa-ellipsis-h"></i></button>
      <div class="taskMenu">
        <button class="editTask">${t.editTask}</button>
        <button class="deleteTask">${t.deleteTask}</button>
      </div>
    `;

    taskListElem.appendChild(li);
    inputField.value = "";

    setupMenu(li);

    // "Выполнено"
    li.querySelector(".completeTask").addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    // "Удалить"
    li.querySelector(".deleteTask").addEventListener("click", (e) => {
      e.stopPropagation();
      li.classList.add("removing");
      setTimeout(() => li.remove(), 500);
    });

    // "Редактировать"
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
        if (openMenu !== menu) {
          openMenu.classList.remove("visible");
        }
      });
      menu.classList.toggle("visible");
    });

    // Ховер (показ меню)
    button.addEventListener("mouseenter", () => menu.classList.add("visible"));
    button.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!menu.matches(":hover") && !button.matches(":hover")) {
          menu.classList.remove("visible");
        }
      }, 200);
    });
    menu.addEventListener("mouseenter", () => menu.classList.add("visible"));
    menu.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!menu.matches(":hover") && !button.matches(":hover")) {
          menu.classList.remove("visible");
        }
      }, 200);
    });
  }

  // Закрываем меню при клике вне него
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".taskMenu.visible").forEach((menu) => {
      if (!menu.contains(e.target)) {
        menu.classList.remove("visible");
      }
    });
  });

  // ===================
  // 2. Корзина (Trash)
  // ===================
  const trashToggle = document.getElementById("trashToggle");
  const trashContainer = document.getElementById("trashContainer");
  const trashTasksContainer = document.getElementById("trashTasksContainer");
  const emptyMsg = document.getElementById("emptyTrashMessage");
  const trashButtonsContainer = document.getElementById(
    "trashButtonsContainer"
  );
  const restoreAllBtn = document.getElementById("restoreAllBtn");
  const clearTrashBtn = document.getElementById("clearTrashBtn");

  trashToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    trashContainer.style.display =
      trashContainer.style.display === "none" ? "block" : "none";
  });

  document.addEventListener("click", (e) => {
    if (
      trashContainer.style.display === "block" &&
      !trashContainer.contains(e.target) &&
      e.target !== trashToggle
    ) {
      trashContainer.style.display = "none";
    }
  });

  function updateTrashUI() {
    const tasksInTrash = trashTasksContainer.querySelectorAll(".task.inTrash");
    emptyMsg.style.display = tasksInTrash.length === 0 ? "block" : "none";
  }

  function moveToTrash(task) {
    task.classList.add("removing");
    setTimeout(() => {
      task.classList.remove("removing");
      task.classList.add("inTrash");
      trashTasksContainer.appendChild(task);
      updateTrashUI();
    }, 300);
  }

  function restoreTask(task) {
    task.classList.remove("inTrash");
    taskListElem.appendChild(task);
    updateTrashUI();
  }

  function ensureRestoreButton(task) {
    let restoreBtn = task.querySelector(".restoreTask");
    if (!restoreBtn) {
      restoreBtn = document.createElement("button");
      restoreBtn.classList.add("restoreTask");
      restoreBtn.textContent = translations[currentLang].restoreTask;
      task.appendChild(restoreBtn);
      restoreBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        restoreTask(task);
      });
    }
  }

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

  // Подключаем удаление к существующим задачам
  document.querySelectorAll("#taskList .task").forEach((task) => {
    replaceDeleteEvent(task);
  });

  // Следим за появлением новых задач
  const observer = new MutationObserver((mutations) => {
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
  observer.observe(taskList, { childList: true });

  restoreAllBtn.addEventListener("click", () => {
    const tasksInTrash = trashTasksContainer.querySelectorAll(".task.inTrash");
    tasksInTrash.forEach((task) => {
      restoreTask(task);
    });
  });

  clearTrashBtn.addEventListener("click", () => {
    const tasksInTrash = trashTasksContainer.querySelectorAll(".task.inTrash");
    tasksInTrash.forEach((task) => {
      task.remove();
    });
    updateTrashUI();
  });

  updateTrashUI();

  // ===================
  // 3. Шторка настроек (переключение языка)
  // ===================
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
});
