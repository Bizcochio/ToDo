document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JavaScript подключен!");

  const input = document.getElementById("taskInput");
  const button = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  console.log("🔹 Input:", input);
  console.log("🔹 Button:", button);
  console.log("🔹 Task List:", taskList);
});

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("addTask");

  button.addEventListener("click", () => {
    console.log("🟢 Кнопка нажата!");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("taskInput");
  const button = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  button.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li);
    input.value = ""; // Очищаем поле ввода

    console.log(`✅ Добавлена задача: ${taskText}`);
  });
});
