import React, { forwardRef, useCallback, useEffect } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";

import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import BView from "components/base/view.base";
import { s_width100 } from "constants/styles.constant";
import BText from "components/base/text.base";
import BTextInput, { BTextInputProps } from "components/base/textInput.base";

interface IFTextInputProps extends BTextInputProps {
  control: Control<any>;
  name: string;
  defaultValue?: string;
  containerStyle?: StyleProp<ViewStyle>;
  hint?: string;
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
const FTextInputBottomSheet = forwardRef(
  (
    {
      control,
      hint,
      rules,
      defaultValue = "",
      name,
      containerStyle = {},
      onChangeText,
      style,
      onFocus,
      onBlur,
      ...props
    }: IFTextInputProps,
    ref
  ): React.JSX.Element => {
    const { field, fieldState, formState } = useController({
      control: control,
      defaultValue: defaultValue,
      name,
      rules,
    });
    const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

    useEffect(() => {
      return () => {
        // Reset the flag on unmount
        shouldHandleKeyboardEvents.value = false;
      };
    }, [shouldHandleKeyboardEvents]);
    //#endregion

    //#region callbacks
    const handleOnFocus = useCallback(
      (args: any) => {
        shouldHandleKeyboardEvents.value = true;
        if (onFocus) {
          onFocus?.(args);
        }
      },
      [onFocus, shouldHandleKeyboardEvents]
    );
    const handleOnBlur = useCallback(
      (args: any) => {
        shouldHandleKeyboardEvents.value = false;
        if (onBlur) {
          onBlur?.(args);
        }
      },
      [onBlur, shouldHandleKeyboardEvents]
    );
    //#endregion

    const onChangeTextOverride = useCallback(
      (text: string) => {
        field.onChange?.(text);
        onChangeText?.(text);
      },
      [field.onChange]
    );

    return (
      <BView style={[s_width100, containerStyle]}>
        <BTextInput
          onChangeText={onChangeTextOverride}
          allowFontScaling={false}
          {...props}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          style={[style, { textAlign: "auto" }]}
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
  }
);

export default FTextInputBottomSheet;
