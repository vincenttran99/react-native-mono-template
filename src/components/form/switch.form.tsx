import React, { useCallback } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, Switch, ViewStyle } from "react-native";
import { s_width100 } from "constants/styles.constant";
import BView from "components/base/view.base";
import BText from "components/base/text.base";

interface IFSwitchProps extends React.ComponentProps<typeof Switch> {
  control: Control<any>;
  name: string;
  defaultValue?: boolean;
  hint?: string;
  containerStyle?: StyleProp<ViewStyle>;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
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
export default function FSwitch({
  control,
  hint,
  rules,
  defaultValue = true,
  name,
  onValueChange,
  style,
  containerStyle = {},
  ...props
}: IFSwitchProps): React.JSX.Element {
  const { field, fieldState, formState } = useController({
    control: control,
    defaultValue: defaultValue,
    name,
    rules,
  });

  const onValueChangeSwitch = useCallback(
    (value: boolean) => {
      field.onChange?.(value);
      onValueChange?.(value);
    },
    [field.onChange]
  );

  return (
    <BView style={[s_width100, containerStyle]}>
      <Switch
        value={field.value}
        onValueChange={onValueChangeSwitch}
        {...props}
      />

      {hint ? (
        <BText
          color={fieldState.invalid ? "error" : "info"}
          variant="xs"
          paddingTop="xxs"
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
