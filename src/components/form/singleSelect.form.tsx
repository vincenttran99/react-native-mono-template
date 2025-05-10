import React, { useCallback, useEffect, useRef, useState } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";
import {
  s_row_justifyBetween_itemsCenter,
  s_width100,
} from "constants/styles.constant";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import BText from "components/base/text.base";
import { MHS } from "constants/sizes.constant";

import BDivider from "components/base/divider.base";
import BCheckBox from "components/base/checkbox.base";

import { ILabelValue } from "models/system.model";
import BackdropBottomSheetComponent from "components/base/backdrop.bottomSheet.component";
import debounce from "lodash.debounce";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/view.base";
import BTextInput, { BTextInputProps } from "components/base/textInput.base";

export interface ISingleSelectItem extends ILabelValue {
  [key: string]: any;
}

type IFSingleSelectProps = BTextInputProps & {
  control: Control<any>;
  name: string;
  defaultValue?: { value: any; label?: string };
  hint?: string;
  label?: string;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  search?: boolean;
  disabled?: boolean;
  searchPlaceHolder?: string;
  onChangeSearchValue?: (value: string) => Promise<ISingleSelectItem[]>;
  heightSelectBox?: string | number;
  initData: ISingleSelectItem[];
  onValueChange?: (value: ISingleSelectItem) => void;
  renderItem?: (
    item: ISingleSelectItem,
    currentValue: ISingleSelectItem,
    onPress: (value: ISingleSelectItem) => void
  ) => React.JSX.Element;
};

export default function FSingleSelect({
  control,
  hint,
  rules,
  defaultValue,
  name,
  renderItem,
  onChangeText,
  disabled,
  search = false,
  searchPlaceHolder,
  onChangeSearchValue,
  heightSelectBox = "50%",
  initData = [],
  onValueChange,
  style,
  label = "",
  ...props
}: IFSingleSelectProps): React.JSX.Element {
  const { field, fieldState } = useController({
    control: control,
    defaultValue: defaultValue,
    name,
    rules,
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { _ } = useLingui();
  const [data, setData] = useState<ISingleSelectItem[]>(initData);
  useEffect(() => {
    setData(initData);
  }, [initData]);

  const showPicker = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [field.value]);

  const onPressItem = useCallback(
    (value: ISingleSelectItem) => {
      onValueChange?.(value);
      field.onChange?.(value);
      bottomSheetModalRef.current?.dismiss();
    },
    [onValueChange]
  );

  const renderItemDefault = useCallback(
    ({ item }: { item: ISingleSelectItem }) => {
      if (renderItem) {
        return renderItem(item, field?.value, onPressItem);
      }

      return (
        <Pressable style={styles.viewItem} onPress={() => onPressItem(item)}>
          <BText
            variant={"md"}
            fontWeight={field?.value?.value === item.value ? "bold" : "normal"}
            // color={
            //   field?.value?.value === item.value
            //     ? theme.colors.primary
            //     : theme.colors.text
            // }
          >
            {String(item?.label || item?.value)}
          </BText>

          {field?.value?.value === item.value ? (
            <BCheckBox style={{ borderRadius: 1000 }} isChecked />
          ) : null}
        </Pressable>
      );
    },
    [field?.value, renderItem]
  );

  const SearchBar = useCallback(() => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const onSearch = useCallback(
      async (
        text: string,
        initData: ISingleSelectItem[],
        onChangeSearchValue?: (value: string) => Promise<ISingleSelectItem[]>
      ) => {
        let valueSearch = text.trim().toLowerCase();
        if (valueSearch.length === 0) {
          setData(initData);
        } else {
          if (typeof onChangeSearchValue === "function") {
            let newData = await onChangeSearchValue(valueSearch);
            setData(newData);
          } else {
            setData(() =>
              initData.filter((item) =>
                item.label.toLowerCase().includes(valueSearch)
              )
            );
          }
        }
      },
      []
    );

    const onSearchDebounce = useCallback(
      debounce(onSearch, onChangeSearchValue ? 500 : 200),
      []
    );

    const onChangeText = useCallback(
      (text: string) => {
        setSearchQuery(text);
        onSearchDebounce(text, initData, onChangeSearchValue);
      },
      [initData, onChangeSearchValue]
    );

    return (
      <BTextInput
        placeholder={searchPlaceHolder || _(msg`Tìm kiếm`)}
        onChangeText={onChangeText}
        value={searchQuery}
        maxFontSizeMultiplier={1}
        allowFontScaling={false}
        style={styles.searchBar}
      />
    );
  }, [styles, initData, onChangeSearchValue]);

  const keyExtractor = useCallback(
    (_: any, index: number) => index.toString(),
    []
  );

  return (
    <Pressable disabled={disabled} style={s_width100} onPress={showPicker}>
      <BTextInput
        {...props}
        style={[style, { textAlign: "auto" }]}
        error={fieldState.invalid}
        value={
          field.value ? String(field.value?.label || field.value?.value) : ""
        }
        ref={field.ref}
        editable={false}
        pointerEvents={"none"}
        rightIcon="arrow-down-drop-circle-outline"
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={[heightSelectBox]}
        handleComponent={null}
        backdropComponent={BackdropBottomSheetComponent}
        style={styles.viewBottomSheet}
        onDismiss={() => setData(initData)}
        enableDynamicSizing={false}
      >
        <BView style={s_row_justifyBetween_itemsCenter}>
          <BText variant={"md"}>{label}</BText>
          <Pressable onPress={() => bottomSheetModalRef.current?.dismiss()}>
            <BText
            // color={theme.colors.primary}
            >
              {_(msg`Đóng`)}
            </BText>
          </Pressable>
        </BView>
        {search ? <SearchBar /> : null}
        <BottomSheetFlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItemDefault}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => <BDivider />}
        />
      </BottomSheetModal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewItem: {
    paddingVertical: MHS._12,
    ...s_row_justifyBetween_itemsCenter,
  },
  viewBottomSheet: {
    paddingHorizontal: MHS._16,
    paddingTop: MHS._22,
  },
  contentContainerStyle: {
    paddingTop: MHS._12,
    paddingBottom: MHS._36,
  },
  searchBar: {
    marginTop: MHS._12,
    marginBottom: MHS._6,
  },
});
