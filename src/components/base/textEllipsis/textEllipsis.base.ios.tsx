import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextLayoutEventData,
  TextStyle,
} from "react-native";
import BText from "components/base/text.base";

import { s_width100 } from "constants/styles.constant";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import BView from "../view.base";

interface IBTextProps extends React.ComponentProps<typeof BText> {
  numberOfLines: number;
  children: string;

  /**
   * Style for "Show more" or "Show less" text at the end of the string.
   */
  styleReadMoreText?: StyleProp<TextStyle>;
}

/**
 * You should provide a width for this component.
 * Must use const for this component for best ex
 * @param numberOfLines
 * @param onTextLayout
 * @param children
 * @param styleReadMoreText
 * @param style
 * @param props
 * @constructor
 */
const BTextEllipsisComponent = ({
  numberOfLines,
  children,
  styleReadMoreText,
  style,
  ...props
}: IBTextProps): React.JSX.Element => {
  const [isNeedReadMore, setIsNeedReadMore] = useState(false);
  const [stateForReRender, setStateForReRender] = useState(false);
  const [isShowAll, setIsShowAll] = useState(false);
  const textRef = useRef(children);
  const shortTextRef = useRef(children);
  const isDoneCalculateRef = useRef(false);
  const isPropsChangeRef = useRef(false);
  const { _ } = useLingui();
  const lengthNeedToCutRef = useMemo(() => _(msg`see more`).length + 5, [_]);

  useLayoutEffect(() => {
    isPropsChangeRef.current = true;
    textRef.current = children;
    setStateForReRender((old) => !old);

    return () => {
      isDoneCalculateRef.current = false;
    };
  }, [children, style, styleReadMoreText, numberOfLines]);

  const onTextLayoutOverride = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (isDoneCalculateRef.current) {
        return;
      }

      isDoneCalculateRef.current = true;
      isPropsChangeRef.current = false;
      if (event.nativeEvent?.lines?.length >= numberOfLines) {
        let shortText = "";
        for (let i = 0; i < numberOfLines; i++) {
          shortText = shortText.concat(event.nativeEvent?.lines[i].text);
        }

        shortTextRef.current = shortText.slice(0, -lengthNeedToCutRef) + "... ";
        textRef.current = shortTextRef.current;
        setIsNeedReadMore(true);
      } else {
        setIsNeedReadMore(false);
      }

      setStateForReRender((old) => !old);
    },
    [numberOfLines]
  );

  const switchShowStatus = useCallback(() => {
    if (isShowAll) {
      textRef.current = shortTextRef.current;
      setIsShowAll(false);
    } else {
      textRef.current = children;
      setIsShowAll(true);
    }
  }, [isShowAll, children]);

  return (
    <BView style={s_width100}>
      <BText
        // onTextLayout={onTextLayoutOverride}
        numberOfLines={
          isNeedReadMore && !isPropsChangeRef.current
            ? undefined
            : numberOfLines
        }
        style={[
          { width: "100%" },
          style,
          {
            opacity: isDoneCalculateRef.current
              ? StyleSheet.flatten(style || {})?.opacity
              : 0,
          },
        ]}
        {...props}
      >
        {textRef.current}
        {isNeedReadMore ? (
          <BText
            fontWeight={"bold"}
            onPress={switchShowStatus}
            style={styleReadMoreText}
          >
            {isShowAll ? " " + _(msg`hide`) : _(msg`see more`)}
          </BText>
        ) : null}
      </BText>
      {!isDoneCalculateRef.current ? (
        <BText
          onTextLayout={onTextLayoutOverride}
          disabled
          style={[
            { width: "100%" },
            style,
            { position: "absolute", opacity: 0, zIndex: -1000 },
          ]}
          {...props}
          children={children}
        />
      ) : null}
    </BView>
  );
};

const BTextEllipsis = memo(BTextEllipsisComponent);
export default BTextEllipsis;
