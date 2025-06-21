import { FontSize, Radius, Space } from "@/constants/sizes.constant";
import { useSystemTheme } from "@/helpers/hooks/system.hook";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { BaseTheme } from "@shopify/restyle";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

// StyleNativeScreen: Screen to test performance and demonstrate StyleSheet usage
const StyleNativeScreen = () => {
  // Get the styles from theme
  const { styles } = useSystemTheme(createStyles);
  // Track render start time
  const renderStartRef = useRef(performance.now());
  // State to store render duration message
  const [renderDurationMsg, setRenderDurationMsg] = useState("");
  // Lingui translation hook
  const { _ } = useLingui();

  useEffect(() => {
    // Calculate and set render duration after first render
    const renderEnd = performance.now();
    setRenderDurationMsg(
      `Total time to render: ${renderEnd - renderStartRef.current} ms`
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* Display render duration */}
      <Text style={styles.title}>{renderDurationMsg}</Text>
      {/* Display static title */}
      <Text style={styles.title}>{_(msg`StyleSheet`)}</Text>
      {/* Render 1000 performance test items */}
      {Array.from({ length: 1000 }).map((item, i) => (
        <View key={i} style={styles.childView}>
          <Text style={styles.title}>{_(msg`Performance Test`)}</Text>
        </View>
      ))}
    </View>
  );
};

const createStyles = (theme: BaseTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      gap: Space.md,
      backgroundColor: theme.colors.background,
      padding: Space.md,
    },
    title: {
      fontSize: FontSize.md,
      fontWeight: "bold",
      color: theme.colors.reverse,
    },
    childView: {
      backgroundColor: theme.colors.primary,
      borderRadius: Radius.md,
      padding: Space.md,
    },
  });
};

export default StyleNativeScreen;
