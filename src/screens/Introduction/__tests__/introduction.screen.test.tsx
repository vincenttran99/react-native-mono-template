import React from "react";
import { fireEvent } from "@testing-library/react-native";
import IntroductionScreen from "../introduction.screen";
import {
  NAVIGATION_DOG_SCREEN,
  NAVIGATION_INTRODUCTION_BASE_SCREEN,
  NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN,
  NAVIGATION_SETTINGS_SCREEN,
} from "@/constants/navigation.constant";
import { navigateToScreenHelper } from "@/helpers/navigation.helper";
import { render } from "../../../../__mocks__/restyle";

describe("IntroductionScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId, getAllByTestId } = render(<IntroductionScreen />);

    // Check if the main component is rendered
    expect(getByTestId("safe-area-view")).toBeTruthy();

    // Check if FlashList is rendered
    expect(getByTestId("flash-list")).toBeTruthy();

    // Check the number of items in the list
    const listItems = getAllByTestId(/list-item-/);
    expect(listItems).toHaveLength(4);
  });

  it("navigates to correct screen when item is pressed", () => {
    const { getAllByTestId } = render(<IntroductionScreen />);

    // Get all pressable buttons
    const pressables = getAllByTestId(/list-item-/);

    // Check navigation when pressing the first item (Base components)
    fireEvent.press(pressables[0]);
    expect(navigateToScreenHelper).toHaveBeenCalledWith(
      NAVIGATION_INTRODUCTION_BASE_SCREEN
    );

    // Check navigation when pressing the second item (Flash List)
    fireEvent.press(pressables[1]);
    expect(navigateToScreenHelper).toHaveBeenCalledWith(
      NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN
    );

    // Check navigation when pressing the third item (Demo list query)
    fireEvent.press(pressables[2]);
    expect(navigateToScreenHelper).toHaveBeenCalledWith(NAVIGATION_DOG_SCREEN);

    // Check navigation when pressing the fourth item (Settings)
    fireEvent.press(pressables[3]);
    expect(navigateToScreenHelper).toHaveBeenCalledWith(
      NAVIGATION_SETTINGS_SCREEN
    );
  });

  it("displays correct titles for each item", () => {
    const { getAllByTestId } = render(<IntroductionScreen />);

    // Get all text components
    const textComponents = getAllByTestId("base-text");

    // Check the content of text components
    expect(textComponents[0].props.children).toBe("Base components");
    expect(textComponents[1].props.children).toBe("Flash List");
    expect(textComponents[2].props.children).toBe("Demo list query");
    expect(textComponents[3].props.children).toBe("Settings");
  });
});
