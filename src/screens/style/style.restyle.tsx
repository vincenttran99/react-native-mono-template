import BText from "@/components/base/base.text";
import BView from "@/components/base/base.view";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import React, { useEffect } from "react";

// StyleRestyleScreen: Screen to test performance and demonstrate Restyle usage
const StyleRestyleScreen = () => {
  // Track render start time
  const renderStartRef = React.useRef(performance.now());
  // State to store render duration message
  const [renderDurationMsg, setRenderDurationMsg] = React.useState("");

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
    <BView flex={1} backgroundColor="background" gap="md" padding="md">
      {/* Display render duration */}
      <BText color="reverse" variant="md" fontWeight={"bold"}>
        {renderDurationMsg}
      </BText>
      {/* Display static title */}
      <BText color="reverse" variant="md" fontWeight={"bold"}>
        {_(msg`Shopify/Restyle`)}
      </BText>
      {/* Render 1000 performance test items */}
      {Array.from({ length: 1000 }).map((item, i) => (
        <BView key={i} backgroundColor="primary" borderRadius="md" padding="md">
          <BText color="reverse" variant="md" fontWeight={"bold"}>
            {_(msg`Performance Test`)}
          </BText>
        </BView>
      ))}
    </BView>
  );
};

export default StyleRestyleScreen;
