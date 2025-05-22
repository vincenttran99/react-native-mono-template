import React, { useCallback } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import { ILabelValue } from "@/models/system.model";
import BChip, { BChipProps } from "@/components/base/base.chip";
import BView from "@/components/base/base.view";
import BText from "@/components/base/base.text";

export type FChipItem = ILabelValue & {
  icon?: string;
};

export type FSelectChipProps = {
  control: Control<any>;
  name: string;
  defaultValue?: FChipItem[];
  hint?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  initData: FChipItem[];
  onValueChange?: (values: FChipItem[]) => void;
  multi?: boolean;
  chipProps?: BChipProps;
};

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
const FSelectChip = ({
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
}: FSelectChipProps): React.JSX.Element => {
  const { field, fieldState, formState } = useController({
    control: control,
    defaultValue: defaultValue,
    name,
    rules,
  });

  const onValueChangeSwitch = useCallback(
    (valueSelected: FChipItem) => {
      let newValues = valueSelected;
      if (multi) {
        let indexOfChip = field.value?.findIndex(
          (item: FChipItem) => item?.value === valueSelected?.value
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

  const renderChip = (item: FChipItem) => {
    let selected =
      field.value.findIndex(
        (chip: FChipItem) => chip?.value === item?.value
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
    <BView width={"100%"} style={style}>
      <BView
        flexDirection="row"
        alignItems="center"
        gap="xxs"
        style={containerStyle}
      >
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
};

export default FSelectChip;
