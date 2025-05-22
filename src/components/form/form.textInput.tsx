import React, { useCallback } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";

import BTextInput, { BTextInputProps } from "@/components/base/base.textInput";
import BView from "@/components/base/base.view";
import BText from "@/components/base/base.text";

export type FTextInputProps = BTextInputProps & {
  control: Control<any>;
  name: string;
  defaultValue?: string;
  hint?: string;
  containerStyle?: StyleProp<ViewStyle>;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
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
const FTextInput = ({
  control,
  hint,
  rules,
  defaultValue = "",
  name,
  onChangeText,
  style,
  containerStyle = {},
  ...props
}: FTextInputProps): React.JSX.Element => {
  const { field, fieldState, formState } = useController({
    control: control,
    defaultValue: defaultValue,
    name,
    rules,
  });

  const onChangeTextOverride = useCallback(
    (text: string) => {
      field.onChange?.(text);
      onChangeText?.(text);
    },
    [field.onChange]
  );

  return (
    <BView width={"100%"} style={containerStyle}>
      <BTextInput
        onChangeText={onChangeTextOverride}
        allowFontScaling={false}
        {...props}
        style={style}
        error={fieldState.invalid}
        // value={field.value}
        ref={field.ref}
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
};

export default FTextInput;
