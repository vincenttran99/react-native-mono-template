import React, { useCallback } from "react";
import { MHS } from "@/constants/sizes.constant";
import BText from "@/components/base/base.text";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import BFlashList from "@/components/base/base.flashList";
import BDivider from "@/components/base/base.divider";
import BSafeAreaView from "@/components/base/base.safeAreaView";
import {
  NAVIGATION_DOG_SCREEN,
  NAVIGATION_INTRODUCTION_BASE_SCREEN,
  NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN,
  NAVIGATION_SETTINGS_SCREEN,
} from "@/constants/navigation.constant";
import BPressable from "@/components/base/base.pressable";
import { navigateToScreenHelper } from "@/helpers/navigation.helper";
import { AppStackParamList } from "@/models/navigation.model";

export default function IntroductionScreen() {
  const { _ } = useLingui();

  const DATA = [
    {
      title: _(msg`Base components`),
      screen: NAVIGATION_INTRODUCTION_BASE_SCREEN,
    },
    {
      title: _(msg`Flash List`),
      screen: NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN,
    },
    {
      title: _(msg`Demo list query`),
      screen: NAVIGATION_DOG_SCREEN,
    },
    {
      title: _(msg`Settings`),
      screen: NAVIGATION_SETTINGS_SCREEN,
    },
  ];

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: { title: string; screen: keyof AppStackParamList };
      index: number;
    }) => {
      return (
        <BPressable
          testID={`list-item-${index}`}
          height={MHS._60}
          justifyContent="center"
          paddingHorizontal="xl"
          onPress={() => navigateToScreenHelper(item.screen, undefined)}
        >
          <BText
            testID="base-text"
            fontWeight={"bold"}
            variant="xl"
            numberOfLines={1}
          >
            {item.title}
          </BText>
        </BPressable>
      );
    },
    []
  );

  return (
    <BSafeAreaView
      testID="safe-area-view"
      backgroundColor="background"
      flex={1}
    >
      <BFlashList
        testID="flash-list"
        keyAttribute={"screen"}
        estimatedItemSize={MHS._60}
        data={DATA}
        renderItem={renderItem}
        ItemSeparatorComponent={BDivider}
      />
    </BSafeAreaView>
  );
}
