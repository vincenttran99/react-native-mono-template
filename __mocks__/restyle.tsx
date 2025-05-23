import React from "react";
import {
  render as rtlRender,
  RenderOptions,
} from "@testing-library/react-native";
import { ThemeProvider } from "@shopify/restyle";
import { LIGHT_THEME } from "@/constants/theme.constant";

function render(ui: React.ReactElement, options?: RenderOptions) {
  return rtlRender(
    <ThemeProvider theme={LIGHT_THEME}>{ui}</ThemeProvider>,
    options
  );
}

export * from "@testing-library/react-native";
export { render };
