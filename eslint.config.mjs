import globals from "globals";
import pluginsJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules/", "dist/", "build/", "*.min.js"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      semi: ["error", "always"], // Требует точку с запятой
      quotes: ["error", "double"], // Требует двойные кавычки
      "no-unused-vars": "warn", // Предупреждает про неиспользуемые переменные
      "no-console": "warn", // Предупреждает про console.log
      eqeqeq: "error", // Запрещает `==`, требует `===`
      "no-constant-condition": "error", // Запрещает бесконечные циклы while(true)
      "no-new-object": "error", // Предупреждает про бесполезное создание объектов
      "no-undef": "error", // Запрещает использование необъявленных переменных
      "no-unused-vars": "warn", // Предупреждает про неиспользуемые переменные (частая причина утечек)
      "no-magic-numbers": [
        "warn",
        {
          ignore: [
            0, 1, 2, 3, 4, 100, 200, 300, 400, 500, 1000, 2000, 3000, 5000,
          ],
        },
      ], // Предупреждает про магические числа (код становится чище)
      "no-undef": "off", // Отключаем ошибки про document и localStorage
    },
  },
];
