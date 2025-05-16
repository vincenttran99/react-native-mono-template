import React from "react";
import { StyleProp, TextStyle } from "react-native";
import BText, { BTextProps } from "components/base/base.text";

export type BTextMultiProps = Omit<BTextProps, "children" | "style"> & {
  children: string;

  [key: string]: any;
};

type MultiStyles = {
  [key in `style${1 | 2 | 3 | 4 | 5}`]?: StyleProp<TextStyle>;
};

/**
 * If you want to have different styles in the same text, use the ||| separator (e.g., Hello |||every|||body).
 * Additionally, provide style1, style2, ...stylex (unlimited x) corresponding to the number of text segments when we split the string by the ||| character.
 * @param children
 * @param props
 * @constructor
 */
const BTextMulti = ({ children, ...props }: BTextMultiProps & MultiStyles) => {
  const renderMultiText = () => {
    let contentSegments = children.split("|||");
    let currentStyle: StyleProp<TextStyle> = {};
    return contentSegments.map((contentSegment, index) => {
      currentStyle = [
        currentStyle,
        props[`style${Math.min(index, 21) + 1}`] || {},
      ];
      return (
        <BText {...props} key={index.toString()} style={currentStyle}>
          {contentSegment}
        </BText>
      );
    });
  };

  return <BText {...props}>{renderMultiText()}</BText>;
};

export default BTextMulti;
