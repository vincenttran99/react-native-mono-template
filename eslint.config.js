// eslint.config.js
import pluginLingui from "eslint-plugin-lingui";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import pluginReactCompiler from "eslint-plugin-react-compiler";

export default [
  // Config for Lingui
  pluginLingui.configs["flat/recommended"],

  // Config for Testing Library
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    plugins: {
      "testing-library": pluginTestingLibrary,
    },
    rules: {
      ...pluginTestingLibrary.configs.react.rules,
    },
  },

  // Config for React Compiler
  {
    files: ["**/*.[jt]s?(x)"],
    plugins: {
      "react-compiler": pluginReactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
];
