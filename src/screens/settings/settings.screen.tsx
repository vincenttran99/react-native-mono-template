import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useSystemStore } from "store/system.store";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/base.view";
import BText from "components/base/base.text";
import { LANGUAGES_MAP_CODE2 } from "constants/languages.constant";
import { Pressable } from "react-native-gesture-handler";
import { NAVIGATION_SETTINGS_LANGUAGE_SCREEN } from "constants/navigation.constant";
import { navigateNavHelper } from "helpers/navigation.helper";

const SettingsScreen = () => {
  const { theme, appLanguage, updateState } = useSystemStore();
  const { _ } = useLingui();

  return (
    <BView backgroundColor="background" style={styles.container}>
      <BView style={styles.content}>
        {/* Remember me */}
        <BView style={styles.optionRow}>
          <BText style={styles.optionText}>{_(msg`Dark Mode`)}</BText>
          <Switch
            value={theme === "dark"}
            onValueChange={() =>
              updateState({ theme: theme === "dark" ? "light" : "dark" })
            }
            trackColor={{ false: "#E5E5E5", true: "#FFCC33" }}
            thumbColor="#FFFFFF"
          />
        </BView>

        {/* Face ID */}
        <Pressable
          onPress={() => navigateNavHelper(NAVIGATION_SETTINGS_LANGUAGE_SCREEN)}
        >
          <BView style={styles.optionRow}>
            <BText style={styles.optionText}>{_(msg`Language`)}</BText>
            <BText style={styles.optionText}>
              {LANGUAGES_MAP_CODE2?.[appLanguage]?.local}
            </BText>
          </BView>
        </Pressable>
      </BView>
    </BView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  optionText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#FFF8E7",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
});

export default SettingsScreen;
