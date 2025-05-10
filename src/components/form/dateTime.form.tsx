// import React, { useCallback, useState } from "react";
// import { Control, RegisterOptions, useController } from "react-hook-form";
// import { ColorValue, Pressable } from "react-native";
// import DateTimePicker, {
//   DateTimePickerAndroid,
// } from "@react-native-community/datetimepicker";
// import { Device } from "constants/device.constant";
// import dayjs from "dayjs";
// import { useSystemTheme } from "helpers/hooks/system.hook";

// interface IFDateTimeProps
//   extends Omit<React.ComponentProps<typeof TextInput>, "defaultValue"> {
//   control: Control<any>;
//   name: string;
//   defaultValue?: Date;
//   hint?: string;
//   format?: string;
//   modeTime?: "date" | "time";
//   is24Hour?: boolean;
//   display?: "spinner" | "default" | "clock" | "calendar";
//   rules?: Omit<
//     RegisterOptions<any, string>,
//     "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
//   >;
//   maximumDate?: Date;
//   minimumDate?: Date;
//   timeZoneName?: any;
//   positiveButton?: { label?: string; textColor?: ColorValue };
//   neutralButton?: { label?: string; textColor?: ColorValue };
//   negativeButton?: { label?: string; textColor?: ColorValue };
//   minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
// }

// /**
//  * FDateTime is Form DateTimePicker
//  */
// export default function FDateTime({
//   control,
//   hint,
//   rules,
//   format,
//   defaultValue,
//   name,
//   modeTime,
//   is24Hour,
//   minimumDate,
//   display = "spinner",
//   timeZoneName,
//   onChangeText,
//   maximumDate,
//   positiveButton,
//   neutralButton,
//   negativeButton,
//   minuteInterval,
//   disabled,
//   ...props
// }: IFDateTimeProps): React.JSX.Element {
//   const { theme } = useSystemTheme();
//   const { field, fieldState, formState } = useController({
//     control: control,
//     defaultValue: defaultValue,
//     name,
//     rules,
//   });
//   const [show, setShow] = useState(false);

//   const onChange = (_: any, selectedDate?: Date | undefined) => {
//     field.onChange?.(selectedDate);
//   };

//   const showPicker = useCallback(() => {
//     if (Device.isAndroid) {
//       DateTimePickerAndroid.open({
//         value: field.value || new Date(),
//         onChange,
//         mode: modeTime,
//         is24Hour: true,
//         display,
//         maximumDate: maximumDate,
//         minimumDate: minimumDate,
//         timeZoneName: timeZoneName,
//         positiveButton: positiveButton,
//         neutralButton: neutralButton,
//         negativeButton: neutralButton,
//         minuteInterval: minuteInterval,
//       });
//     } else {
//       setShow((old) => !old);
//     }
//   }, [field.value]);

//   return (
//     <Pressable disabled={disabled} style={s_width100} onPress={showPicker}>
//       <TextInput
//         mode={"outlined"}
//         {...props}
//         error={fieldState.invalid}
//         value={
//           field.value
//             ? dayjs(field.value).format(
//                 format ? format : modeTime === "time" ? "HH:mm" : "DD/MM/YYYY"
//               )
//             : ""
//         }
//         ref={field.ref}
//         editable={false}
//         disabled={disabled}
//         pointerEvents={"none"}
//         right={
//           <TextInput.Icon
//             icon={
//               show && Device.isIos
//                 ? "check"
//                 : modeTime === "time"
//                 ? "clock-outline"
//                 : "calendar"
//             }
//             onPress={showPicker}
//           />
//         }
//       />

//       {hint ? (
//         <HelperText type={fieldState.invalid ? "error" : "info"} visible>
//           {hint}
//         </HelperText>
//       ) : rules !== undefined && fieldState.error?.message ? (
//         <HelperText type={"error"} visible={fieldState.invalid}>
//           {fieldState.error?.message}
//         </HelperText>
//       ) : null}

//       {Device.isIos && show ? (
//         <DateTimePicker
//           minimumDate={minimumDate}
//           value={field.value || new Date()}
//           mode={modeTime}
//           onChange={onChange}
//           display={"spinner"}
//           textColor={theme.colors.text}
//           maximumDate={maximumDate}
//           timeZoneName={timeZoneName}
//           negativeButton={negativeButton}
//           positiveButton={positiveButton}
//           neutralButton={neutralButton}
//           minuteInterval={minuteInterval}
//         />
//       ) : null}
//     </Pressable>
//   );
// }
