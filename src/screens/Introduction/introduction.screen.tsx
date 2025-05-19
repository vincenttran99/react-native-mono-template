import React, { useCallback } from "react";
import { MHS } from "constants/sizes.constant";
import BText from "components/base/base.text";

import BView from "components/base/base.view";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import BFlashList from "components/base/base.flashList";
import BDivider from "components/base/base.divider";
import BSafeAreaView from "components/base/base.safeAreaView";
import {
  NAVIGATION_INTRODUCTION_BASE_SCREEN,
  NAVIGATION_INTRODUCTION_FLASHLIST_OPTIMIZE_SCREEN,
  NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN,
} from "constants/navigation.constant";
import BPressable from "components/base/base.pressable";
import { navigateNavHelper } from "helpers/navigation.helper";

export default function IntroductionScreen() {
  const { _ } = useLingui();

  const DATA = [
    {
      title: _(msg`Base components`),
      screen: NAVIGATION_INTRODUCTION_BASE_SCREEN,
    },
    {
      title: _(msg`Flash List basic`),
      screen: NAVIGATION_INTRODUCTION_FLASHLIST_SCREEN,
    },
    {
      title: _(msg`Flash List optimize`),
      screen: NAVIGATION_INTRODUCTION_FLASHLIST_OPTIMIZE_SCREEN,
    },
  ];

  const renderItem = useCallback(
    ({ item }: { item: { title: string; screen: string } }) => {
      return (
        <BPressable
          height={MHS._60}
          justifyContent="center"
          paddingHorizontal="xl"
          onPress={() => navigateNavHelper(item.screen)}
        >
          <BText fontWeight={"bold"} variant="xl" numberOfLines={1}>
            {item.title}
          </BText>
        </BPressable>
      );
    },
    []
  );

  return (
    <BSafeAreaView backgroundColor="background" flex={1}>
      <BFlashList
        keyAttribute={"screen"}
        estimatedItemSize={MHS._60}
        data={DATA}
        renderItem={renderItem}
        ItemSeparatorComponent={BDivider}
      />
    </BSafeAreaView>
  );
}
