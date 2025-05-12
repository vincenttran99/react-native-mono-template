module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@lingui/babel-plugin-lingui-macro",
      "react-native-reanimated/plugin",
    ],
  };
};
