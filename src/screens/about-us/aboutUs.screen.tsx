import React from "react";
import { StyleSheet, Linking } from "react-native";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";

import BView from "@/components/base/base.view";
import BText from "@/components/base/base.text";
import BScrollview from "@/components/base/base.scrollview";
import BImage from "@/components/base/base.image";
import BButton from "@/components/base/base.button";
import BDivider from "@/components/base/base.divider";
import BSurface from "@/components/base/base.surface";
import BIcon from "@/components/base/base.icon";
import { MHS } from "@/constants/sizes.constant";
import { DEVICE } from "@/constants/system.constant";
import { useSystemStore } from "@/store/system.store";

export default function AboutUsScreen() {
  const { _ } = useLingui();
  const theme = useSystemStore((state) => state.theme);

  const handleOpenGitHub = () => {
    Linking.openURL(
      "https://github.com/vincenttran99/react-native-mono-template"
    );
  };

  const handleOpenDocs = () => {
    Linking.openURL(
      "https://vincenttran99.github.io/react-native-mono-template/"
    );
  };

  return (
    <BScrollview
      backgroundColor="background"
      contentContainerStyle={styles.contentContainerStyle}
    >
      {/* Header */}
      <BView alignItems="center" paddingVertical="xl">
        <BImage
          source={
            theme === "light"
              ? require("@/assets/images/splash-icon-light.png")
              : require("@/assets/images/splash-icon-dark.png")
          }
          style={styles.logo}
          contentFit="contain"
        />
        <BText variant="xxxl" fontWeight="bold" marginTop="md">
          React Native Mono Template
        </BText>
      </BView>

      <BDivider />

      {/* Badges */}
      <BView style={styles.badgesContainer}>
        <BSurface variant="xs" style={styles.badge}>
          <BText variant="xs">expo</BText>
        </BSurface>
        <BSurface variant="xs" style={styles.badge}>
          <BText variant="xs">react-native</BText>
        </BSurface>
        <BSurface variant="xs" style={styles.badge}>
          <BText variant="xs">typescript</BText>
        </BSurface>
      </BView>

      {/* Introduction */}
      <BView marginTop="lg">
        <BText variant="lg" fontWeight="bold">
          {_(msg`Introduction`)}
        </BText>
        <BText variant="md" marginTop="sm">
          {_(
            msg`A template for your next React Native project, focusing on application performance optimization: Expo, TypeScript, ReStyle, Flashlist, Legend list, Husky, Lint-Staged, react-navigation, react-query, react-hook-form, Lingui, I18n, etc...`
          )}
        </BText>
      </BView>

      {/* Key Features */}
      <BView marginTop="lg">
        <BText variant="lg" fontWeight="bold">
          {_(msg`Key Features`)}
        </BText>

        <BView marginTop="sm">
          {keyFeatures.map((feature, index) => (
            <BView key={index} flexDirection="row" marginTop="xs">
              <BIcon name="check-circle" color="success" size={MHS._20} />
              <BText variant="md" marginLeft="xs">
                {_(feature)}
              </BText>
            </BView>
          ))}
        </BView>
      </BView>

      {/* Maintenance */}
      <BView marginTop="lg">
        <BText variant="lg" fontWeight="bold">
          {_(msg`Maintenance and Development`)}
        </BText>
        <BText variant="md" marginTop="sm">
          {_(
            msg`I am committed to continuously improving this template to build React Native applications faster. To achieve this goal, I regularly add new features and fix discovered bugs.`
          )}
        </BText>
      </BView>

      {/* Buttons */}
      <BView marginTop="xl" gap="md">
        <BButton
          label={_(msg`View on GitHub`)}
          leftIcon="github"
          onPress={handleOpenGitHub}
        />
        <BButton
          label={_(msg`View Documentation`)}
          leftIcon="book-open-page-variant"
          onPress={handleOpenDocs}
          backgroundColor="info"
        />
      </BView>

      {/* License */}
      <BView marginTop="xl" alignItems="center">
        <BText variant="sm" color="secondary">
          {_(msg`This project is licensed under MIT.`)}
        </BText>
        <BText variant="sm" color="secondary" marginTop="xs">
          © 2023 Vincent Tran
        </BText>
      </BView>
    </BScrollview>
  );
}

const keyFeatures = [
  msg`Performance optimization with multiple compilation techniques`,
  msg`Latest Expo SDK: Leverage the Expo ecosystem to the fullest`,
  msg`Easy multilingual integration within 30 seconds with Lingui`,
  msg`Interesting components like multi-format text, collapsible/expandable text`,
  msg`TypeScript to enhance code quality and prevent errors`,
  msg`Customizable UI built with Shopify/restyle`,
  msg`Support for multi-environment builds (Production, Staging, Development)`,
  msg`Husky for Git Hooks: Automate git hooks and enforce code standards`,
  msg`Clear project structure with Absolute Imports`,
  msg`Authentication flow implementation using Zustand and react-native-mmkv`,
  msg`React Query and axios for efficient data fetching`,
  msg`Robust form handling with react-hook-form`,
  msg`Robust form handling with react-hook-form`,
  msg`Unit testing setup with Jest and React Testing Library`,
  msg`E2E testing capabilities with Maestro for comprehensive app testing`,
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: MHS._24,
    paddingBottom: MHS._40,
  },
  contentContainer: {
    gap: MHS._12,
  },
  logo: {
    width: DEVICE.width * 0.4,
    height: DEVICE.width * 0.4,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: MHS._8,
    marginTop: MHS._16,
  },
  badge: {
    paddingHorizontal: MHS._8,
    paddingVertical: MHS._4,
    borderRadius: MHS._4,
  },
});
