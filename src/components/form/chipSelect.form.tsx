import React, { useCallback } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import { ILabelValue } from "models/system.model";
import BChip, { BChipProps } from "components/base/chip.base";
import {
  s_row_itemsCenter_gapXxs,
  s_width100,
} from "constants/styles.constant";
import BView from "components/base/view.base";
import BText from "components/base/text.base";

export interface IFChipElement extends ILabelValue {
  icon?: string;
}

interface IFChipSelectProps {
  control: Control<any>;
  name: string;
  defaultValue?: IFChipElement[];
  hint?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  initData: IFChipElement[];
  onValueChange?: (values: IFChipElement[]) => void;
  multi?: boolean;
  chipProps?: BChipProps;
}

/**
 * FTextInput is Form TextInput
 * @param control
 * @param info
 * @param rules
 * @param defaultValue
 * @param name
 * @param onChangeText
 * @param props
 * @constructor
 */
export default function FChipSelect({
  control,
  hint,
  rules,
  defaultValue = [],
  name,
  onValueChange,
  initData = [],
  style,
  multi = false,
  containerStyle = {},
  chipProps,
  ...props
}: IFChipSelectProps): React.JSX.Element {
  const { field, fieldState, formState } = useController({
    control: control,
    defaultValue: defaultValue,
    name,
    rules,
  });

  const onValueChangeSwitch = useCallback(
    (valueSelected: IFChipElement) => {
      let newValues = valueSelected;
      if (multi) {
        let indexOfChip = field.value?.findIndex(
          (item: IFChipElement) => item?.value === valueSelected?.value
        );
        if (indexOfChip === -1) {
          field.onChange?.([...field.value, newValues]);
          onValueChange?.([...field.value, newValues]);
        } else {
          let newArr = [...field.value];
          newArr.splice(indexOfChip, 1);
          field.onChange?.(newArr);
          onValueChange?.(newArr);
        }
      } else {
        field.onChange?.([valueSelected]);
        onValueChange?.([valueSelected]);
      }
    },
    [field, multi]
  );

  const renderChip = (item: IFChipElement) => {
    let selected =
      field.value.findIndex(
        (chip: IFChipElement) => chip?.value === item?.value
      ) !== -1;
    return (
      <BChip
        isSelected={selected}
        key={item.value}
        onPress={() => onValueChangeSwitch(item)}
        {...chipProps}
        icon={item?.icon}
      >
        {item?.label}
      </BChip>
    );
  };

  return (
    <BView style={[s_width100, style]}>
      <BView style={[s_row_itemsCenter_gapXxs, containerStyle]}>
        {initData.map(renderChip)}
      </BView>

      {hint ? (
        <BText
          variant="xs"
          paddingTop="xxs"
          color={fieldState.invalid ? "error" : "info"}
          visible
        >
          {hint}
        </BText>
      ) : rules !== undefined && fieldState.error?.message ? (
        <BText
          variant="xs"
          paddingTop="xxs"
          color={"error"}
          visible={fieldState.invalid}
        >
          {fieldState.error?.message}
        </BText>
      ) : null}
    </BView>
  );
}
