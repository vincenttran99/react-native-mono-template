jest.mock("react-native-keyboard-controller", () =>
  require("react-native-keyboard-controller/jest")
);

jest.mock("react-native-device-info", () =>
  require("react-native-device-info/jest/react-native-device-info-mock")
);

jest.mock("@lingui/react", () => ({
  useLingui: () => ({
    _: (text) => text.message || text,
  }),
}));
