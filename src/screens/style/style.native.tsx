import { FontSize, Radius, Space } from "@/constants/sizes.constant";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useTheme } from "@shopify/restyle";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";

// StyleNativeScreen: Screen to test performance and demonstrate StyleSheet usage
const StyleNativeScreen = () => {
  // Track render start time
  const renderStartRef = React.useRef(performance.now());
  // State to store render duration message
  const [renderDurationMsg, setRenderDurationMsg] = React.useState("");
  // Get theme from Restyle
  const theme = useTheme();
  // Memoize styles to avoid unnecessary recalculations
  const styles = useMemo(() => {
    console.log("goi lai");
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        gap: Space.md,
        padding: Space.md,
      },
      title: {
        color: theme.colors.reverse,
        fontSize: FontSize.md,
        fontWeight: "bold",
      },
      childView: {
        backgroundColor: theme.colors.primary,
        borderRadius: Radius.md,
        padding: Space.md,
      },
    });
  }, [theme]);
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

export default StyleNativeScreen;
