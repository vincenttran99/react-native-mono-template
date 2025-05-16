import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ActivityIndicator } from "react-native";
import { Device } from "constants/device.constant";
import BView from "components/base/base.view";

export type GlobalLoadingComponentRef = {
  showLoading: (autoHide: boolean, duration?: number) => void;
  hideLoading: Function;
};

const GlobalLoading = (
  _: any,
  ref: React.ForwardedRef<GlobalLoadingComponentRef>
) => {
  const [isLoading, setLoading] = useState(false);
  const timeoutRef = useRef<number>(null);

  useImperativeHandle(
    ref,
    () => ({
      showLoading,
      hideLoading,
    }),
    []
  );

  const showLoading = useCallback(
    (autoHide: boolean = true, duration: number = 10000) => {
      setLoading(true);
      /**
       * Auto hide Loading if loading more than 10 seconds
       */
      if (autoHide) {
        timeoutRef.current = setTimeout(() => {
          setLoading(false);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }, duration);
      }
    },
    []
  );

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <BView
      position="absolute"
      width={Device.width}
      height={Device.height}
      backgroundColor="backdrop"
      justifyContent="center"
      alignItems="center"
    >
      <ActivityIndicator size="large" />
    </BView>
  );
};

const LoadingGlobalComponent = memo(forwardRef(GlobalLoading));
export default LoadingGlobalComponent;
