import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export type BLazyProps = {
  children: React.ReactNode;
  timeRender: number;
  haveIndicator?: boolean;
};

const BLazy = ({ haveIndicator = true, ...props }: BLazyProps) => {
  const [allowRender, setAllowRender] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setAllowRender(true);
    }, props.timeRender);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  if (!allowRender) return haveIndicator ? <ActivityIndicator /> : null;

  return <>{props.children}</>;
};

export default BLazy;
