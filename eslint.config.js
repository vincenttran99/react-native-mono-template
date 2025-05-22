import pluginLingui from "eslint-plugin-lingui";
import pluginTestingLibrary from "eslint-plugin-testing-library";

export default [
  pluginLingui.configs["flat/recommended"],
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      'testing-library': pluginTestingLibrary
    },
    rules: {
      ...pluginTestingLibrary.configs.react.rules
    }
  }
];
