import React from "react";
import { StyleSheet } from "react-native";
import BText from "components/base/text.base";
import BView from "components/base/view.base";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import BScrollview from "components/base/scrollview.base";
import { MHS } from "constants/sizes.constant";
import BIcon from "components/base/icon.base";
import BSurface from "components/base/surface.base";
import BPressable from "components/base/pressable.base";
import BButton from "components/base/button.base";
import BIconButton from "components/base/iconButton.base";
import BChip from "components/base/chip.base";
import BDivider from "components/base/divider.base";
import BLazy from "components/base/lazy.base";
import BTextMulti from "components/base/multiText.base";
import BTextEllipsis from "components/base/textEllipsis/textEllipsis.base";
import BPreviewUrl from "components/base/previewUrl.base";
import BTextInput from "components/base/textInput.base";

export default function BaseScreen() {
  const { _ } = useLingui();

  return (
    <BScrollview
      backgroundColor="background"
      paddingHorizontal="xl"
      contentContainerStyle={styles.contentContainerStyle}
    >
      {/* Lazy view */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Lazy view`)}
      </BText>
      <BLazy timeRender={2000}>
        <BText variant="md" color="error">
          {_(msg`Suprise! You are seeing this text after 2 seconds`)}
        </BText>
      </BLazy>

      {/* Text */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`BText`)}
      </BText>
      <BText variant="sm" color="error">
        {_(msg`Small error text`)}
      </BText>
      <BText variant="md" color="primary">
        {_(msg`Medium primary text`)}
      </BText>
      <BText variant="lg" color="success">
        {_(msg`Large success text`)}
      </BText>
      <BText variant="xl" color="warning">
        {_(msg`Extra large warning text`)}
      </BText>

      {/* Multi text */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Multi text`)}
      </BText>
      <BTextMulti
        style1={styles.text1}
        style2={styles.text2}
        style3={styles.text3}
        style4={styles.text4}
      >
        {"Haha |||Hoho |||Hehe |||Hihi"}
      </BTextMulti>

      {/* Text Ellipsis */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Text Ellipsis`)}
      </BText>
      <BTextEllipsis variant="md" numberOfLines={3}>
        {_(
          msg`This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. `
        )}
      </BTextEllipsis>

      {/* Text input */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Text input`)}
      </BText>
      <BTextInput placeholder={_("Enter your name")} />
      <BTextInput leftIcon="home" placeholder={_("Enter your address")} />
      <BTextInput
        leftIcon="email"
        leftIconProps={{ color: "error" }}
        rightIcon="close"
        placeholder={_("Enter your email")}
      />

      {/* Preview URL */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Preview URL`)}
      </BText>
      <BPreviewUrl url="https://github.com/" gap="md">
        <BPreviewUrl.Image width={MHS._220} height={MHS._100} />
        <BPreviewUrl.Title fontWeight={"bold"} />
        <BPreviewUrl.Description />
      </BPreviewUrl>

      {/* View */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`BView`)}
      </BText>
      <BView backgroundColor="primary" width={"100%"} height={MHS._30} />
      <BView backgroundColor="error" width={"100%"} height={MHS._30} />
      <BView backgroundColor="success" width={"100%"} height={MHS._30} />
      <BView backgroundColor="ground" width={"100%"} height={MHS._30} />

      {/* Icon */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`BIcon`)}
      </BText>
      <BIcon name="dog" size={MHS._40} color="primary" />
      <BIcon name="cat" size={MHS._40} color="error" />
      <BIcon name="bird" size={MHS._40} color="success" />

      {/* Pressable */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`BPressable`)}
      </BText>
      <BPressable
        backgroundColor="info"
        justifyContent="center"
        alignItems="center"
        padding="md"
      >
        <BText variant="md">{_(msg`Pressable`)}</BText>
      </BPressable>

      {/* Surface */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`BSurface`)}
      </BText>
      <BSurface variant="md" padding="md" backgroundColor="ground">
        <BText variant="md">{_(msg`Surface`)}</BText>
      </BSurface>

      {/* Button */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Button`)}
      </BText>
      <BButton
        backgroundColor="primary"
        justifyContent="center"
        alignItems="center"
        padding="md"
        label={_(msg`Button primary`)}
      />
      <BButton
        backgroundColor="secondary"
        justifyContent="center"
        alignItems="center"
        padding="md"
        labelColor="background"
        label={_(msg`Button secondary`)}
      />
      <BButton
        outline
        justifyContent="center"
        alignItems="center"
        padding="md"
        label={_(msg`Button outline`)}
      />

      {/* Icon Button */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Icon Button`)}
      </BText>
      <BIconButton icon="dog" />
      <BIconButton
        icon="cat"
        backgroundColor="primary"
        alignSelf="flex-start"
      />

      {/* Chip */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Chip`)}
      </BText>
      <BChip label={_(msg`Chip`)} alignSelf="flex-start" />
      <BChip icon="dog" alignSelf="flex-start" />
      <BChip
        icon="cat"
        borderColor="warning"
        iconProps={{ color: "warning" }}
        label={_(msg`Cat`)}
        alignSelf="flex-start"
      />

      {/* Divider */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Divider`)}
      </BText>

      <BDivider backgroundColor="error" />
      <BDivider bold backgroundColor="success" />
      <BDivider bold type={"dashed"} height={MHS._4} backgroundColor="info" />
      <BDivider bold type={"dotted"} height={MHS._6} backgroundColor="error" />

      {/* Checkbox */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Checkbox`)}
      </BText>
      <BText variant="md" color="info">
        {_(msg`Coming soon`)}
      </BText>

      {/* Radio */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Radio`)}
      </BText>
      <BText variant="md" color="info">
        {_(msg`Coming soon`)}
      </BText>
    </BScrollview>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: MHS._6,
    paddingBottom: MHS._100,
  },
  text1: {
    fontSize: 26,
    color: "red",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 22,
    color: "green",
    fontWeight: "normal",
  },
  text3: {
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  text4: {
    fontSize: 14,
    color: "orange",
    fontWeight: "normal",
    textDecorationLine: "underline",
  },
});
