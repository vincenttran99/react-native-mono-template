// import React, { useCallback, useEffect, useState } from "react";
// import { Menu } from "react-native-paper";
// import { Control, RegisterOptions, useController } from "react-hook-form";
// import { StyleSheet } from "react-native";
// import { MHS } from "@/constants/sizes.constant";
// import { useSystemTheme } from "@/helpers/hooks/system.hook";
//
// import { ILabelValue } from "@/models/system.model";
// import BButton from "@/components/base/base.button";

// interface IFMenuSelectProps {
//   control: Control<any>;
//   name: string;
//   defaultValue?: { value: any; label?: string };
//   rules?: Omit<
//     RegisterOptions<any, string>,
//     "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
//   >;
//   disabled?: boolean;
//   initData: ILabelValue[];
//   onValueChange?: (value: ILabelValue) => void;
//   buttonProps?: Omit<React.ComponentProps<typeof BButton>, "children">;
// }

// export default function FMenuSelect({
//   control,
//   rules,
//   defaultValue,
//   name,
//   disabled,
//   buttonProps,
//   initData = [],
//   onValueChange,
// }: IFMenuSelectProps): React.JSX.Element {
//   const { styles } = useSystemTheme(createStyles);
//   const { field } = useController({
//     control: control,
//     defaultValue: defaultValue,
//     name,
//     rules,
//   });
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const [data, setData] = useState<ILabelValue[]>(initData);

//   useEffect(() => {
//     setData(initData);
//   }, [initData]);

//   const openMenu = useCallback(() => setMenuVisible(true), []);
//   const closeMenu = useCallback(() => setMenuVisible(false), []);

//   const onPressItem = useCallback(
//     (value: ILabelValue) => {
//       onValueChange?.(value);
//       field.onChange?.(value);
//       closeMenu();
//     },
//     [onValueChange]
//   );

//   const renderItem = useCallback(
//     (item: ILabelValue) => {
//       return (
//         <Menu.Item
//           key={item.value}
//           onPress={() => onPressItem(item)}
//           title={item.label}
//         />
//       );
//     },
//     [field?.value]
//   );

//   return (
//     <Menu
//       visible={menuVisible}
//       onDismiss={closeMenu}
//       anchor={
//         <BButton
//           disabled={disabled}
//           size={"xxs"}
//           labelStyle={styles.labelStyle}
//           style={styles.btnStyle}
//           mode={"elevated"}
//           onPress={openMenu}
//           {...buttonProps}
//         >
//           {field?.value?.label}
//         </BButton>
//       }
//     >
//       {data.map(renderItem)}
//     </Menu>
//   );
// }

// const createStyles = (theme: ITheme) => {
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     labelStyle: {
//       marginHorizontal: MHS._10,
//       marginVertical: MHS._4,
//     },
//     btnStyle: {
//       borderRadius: MHS._6,
//     },
//   });
// };
