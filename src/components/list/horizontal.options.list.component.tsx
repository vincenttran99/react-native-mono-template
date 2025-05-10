import React, { useCallback, useState } from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ILabelValue } from "models/system.model";

import BChip from "components/base/chip.base";
import { s_row_itemsCenter_gapXxs } from "constants/styles.constant";
import { BTextProps } from "components/base/text.base";

export interface IHorizontalOptionsListComponentProps extends ScrollViewProps {
  data: ILabelValue[];
  initIndex?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: BTextProps;
  onItemSelected?: (item: ILabelValue) => void;
}

export default function HorizontalOptionsListComponent({
  data,
  initIndex = 0,
  contentContainerStyle,
  itemContainerStyle,
  onItemSelected,
  labelStyle,
}: IHorizontalOptionsListComponentProps) {
  const [selectedItem, setSelectedItem] = useState<ILabelValue>(
    data?.[initIndex]
  );

  const pressItem = useCallback((item: ILabelValue) => {
    setSelectedItem(item);
    onItemSelected?.(item);
  }, []);

  const renderTime = useCallback(
    (item: ILabelValue, index: number) => {
      let isSelected = selectedItem.value === item.value;
      return (
        <BChip
          style={itemContainerStyle}
          isSelected={isSelected}
          onPress={() => pressItem(item)}
          key={index.toString()}
          label={item.label}
          labelProps={labelStyle}
        />
      );
    },
    [selectedItem]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[s_row_itemsCenter_gapXxs, contentContainerStyle]}
    >
      {data.map(renderTime)}
    </ScrollView>
  );
}
