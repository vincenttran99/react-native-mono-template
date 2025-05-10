import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useSystemStore } from "store/system.store";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "components/base/view.base";
import BText from "components/base/text.base";
import { APP_LANGUAGES, AppLanguage } from "constants/languages.constant";

const LanguageSettingsScreen = () => {
  const navigation = useNavigation();
  const { appLanguage, updateState } = useSystemStore();
  const { _ } = useLingui();

  const handleGoBack = () => {
    navigation.goBack();
  };
  console.log(appLanguage);

  const handleSelectLanguage = useCallback(
    (languageCode: AppLanguage) => {
      updateState({ appLanguage: languageCode });
    },
    [updateState]
  );

  return (
    <ScrollView style={styles.content}>
      {/* Render other languages */}
      {APP_LANGUAGES.map((language) => (
        <TouchableOpacity
          key={language.code2}
          style={styles.languageRow}
          onPress={() => handleSelectLanguage(language.code2)}
        >
          <BText style={styles.languageText}>{language.name}</BText>
          <BView
            style={[
              styles.radioButton,
              appLanguage === language.code2 && styles.radioButtonSelected,
            ]}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  languageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0,
  },
  languageText: {
    fontSize: 18,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  radioButtonSelected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 6,
    borderColor: "#FFCC33",
    backgroundColor: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 16,
  },
});

export default LanguageSettingsScreen;
