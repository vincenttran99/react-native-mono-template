import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import BText from "components/base/base.text";
import BView from "components/base/base.view";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import BScrollview from "components/base/base.scrollview";
import { MHS } from "constants/sizes.constant";
import BIcon from "components/base/base.icon";
import BSurface from "components/base/base.surface";
import BPressable from "components/base/base.pressable";
import BButton from "components/base/base.button";
import BIconButton from "components/base/base.iconButton";
import BChip from "components/base/base.chip";
import BDivider from "components/base/base.divider";
import BLazy from "components/base/base.lazy";
import BTextMulti from "components/base/base.multiText";
import BTextEllipsis from "components/base/textEllipsis/base.textEllipsis";
import BTextInput from "components/base/base.textInput";
import BWebUrlPreviewComponent from "components/web/web.urlPreview.component";

export default function IntroductionBaseScreen() {
  const { _ } = useLingui();

  return (
    <BScrollview
      estimatedItemSize={MHS._30}
      backgroundColor="background"
      paddingBottom="xxxl"
      paddingHorizontal="md"
    >
      {/* Lazy view */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Lazy view`)}
      </BText>
      <BLazy timeRender={2000}>
        <BText variant="md" color="error" marginTop="md">
          {_(msg`Suprise! You are seeing this text after 2 seconds`)}
        </BText>
      </BLazy>

      {/* Text */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`BText`)}
      </BText>
      <BText variant="sm" color="error" marginTop="md">
        {_(msg`Small error text`)}
      </BText>
      <BText variant="md" color="primary" marginTop="md">
        {_(msg`Medium primary text`)}
      </BText>
      <BText variant="lg" color="success" marginTop="md">
        {_(msg`Large success text`)}
      </BText>
      <BText variant="xl" color="warning" marginTop="md">
        {_(msg`Extra large warning text`)}
      </BText>

      {/* Multi text */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Multi text`)}
      </BText>
      <BTextMulti
        marginTop="md"
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
      <BTextEllipsis variant="md" numberOfLines={3} marginTop="md">
        {_(
          msg`This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. `
        )}
      </BTextEllipsis>

      {/* Text input */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Text input`)}
      </BText>
      <BTextInput
        placeholder={_("Enter your name")}
        containerProps={{
          marginTop: "md",
        }}
      />
      <BTextInput
        leftIcon="home"
        placeholder={_("Enter your address")}
        containerProps={{
          marginTop: "md",
        }}
      />
      <BTextInput
        leftIcon="email"
        leftIconProps={{ color: "error" }}
        rightIcon="close"
        placeholder={_("Enter your email")}
        containerProps={{
          marginTop: "md",
        }}
      />

      {/* Preview URL */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Preview URL`)}
      </BText>
      <BWebUrlPreviewComponent
        url="https://github.com/"
        gap="md"
        marginTop="md"
      >
        <BWebUrlPreviewComponent.Image width={MHS._220} height={MHS._100} />
        <BWebUrlPreviewComponent.Title fontWeight={"bold"} />
        <BWebUrlPreviewComponent.Description />
      </BWebUrlPreviewComponent>

      {/* View */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`BView`)}
      </BText>
      <BView
        backgroundColor="primary"
        width={"100%"}
        height={MHS._30}
        marginTop="md"
      />
      <BView
        backgroundColor="error"
        width={"100%"}
        height={MHS._30}
        marginTop="md"
      />
      <BView
        backgroundColor="success"
        width={"100%"}
        height={MHS._30}
        marginTop="md"
      />
      <BView
        backgroundColor="ground"
        width={"100%"}
        height={MHS._30}
        marginTop="md"
      />

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
        marginTop="md"
      >
        <BText variant="md">{_(msg`Pressable`)}</BText>
      </BPressable>

      {/* Surface */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`BSurface`)}
      </BText>
      <BSurface
        variant="md"
        padding="md"
        backgroundColor="ground"
        marginTop="md"
      >
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
        marginTop="md"
        label={_(msg`Button primary`)}
      />
      <BButton
        backgroundColor="secondary"
        justifyContent="center"
        alignItems="center"
        padding="md"
        labelColor="background"
        marginTop="md"
        label={_(msg`Button secondary`)}
      />
      <BButton
        outline
        justifyContent="center"
        alignItems="center"
        padding="md"
        marginTop="md"
        label={_(msg`Button outline`)}
      />

      {/* Icon Button */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Icon Button`)}
      </BText>
      <BIconButton icon="dog" marginTop="md" />
      <BIconButton
        icon="cat"
        backgroundColor="primary"
        alignSelf="flex-start"
        marginTop="md"
      />

      {/* Chip */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Chip`)}
      </BText>
      <BChip label={_(msg`Chip`)} alignSelf="flex-start" marginTop="md" />
      <BChip icon="dog" alignSelf="flex-start" marginTop="md" />
      <BChip
        icon="cat"
        borderColor="warning"
        iconProps={{ color: "warning" }}
        label={_(msg`Cat`)}
        alignSelf="flex-start"
        marginTop="md"
      />

      {/* Divider */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Divider`)}
      </BText>

      <BDivider backgroundColor="error" marginTop="md" />
      <BDivider bold backgroundColor="success" marginTop="md" />
      <BView height={MHS._12} />
      <BDivider bold type={"dashed"} height={MHS._4} backgroundColor="info" />
      <BView height={MHS._12} />
      <BDivider bold type={"dotted"} height={MHS._6} backgroundColor="error" />

      {/* Checkbox */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Checkbox`)}
      </BText>
      <BText variant="md" color="info" marginTop="md">
        {_(msg`Coming soon`)}
      </BText>

      {/* Radio */}
      <BText variant="xxl" fontWeight={"bold"} marginTop="xl">
        {_(msg`Radio`)}
      </BText>
      <BText variant="md" color="info" marginTop="md">
        {_(msg`Coming soon`)}
      </BText>
    </BScrollview>
  );
}

const styles = StyleSheet.create({
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
