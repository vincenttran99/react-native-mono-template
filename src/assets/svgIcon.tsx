import React from "react";
import { ViewStyle } from "react-native";

import { SvgXml } from "react-native-svg";
import { MHS } from "constants/sizes.constant";

interface ISVGProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

/**
 * You can use special svg and customize their color (fill="${color}"), size
 */

export const SVGIconEmpty = ({
  size = MHS._12,
  color = "white",
  ...props
}: ISVGProps) => {
  const xml = `
<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 512 512">
<path fill="#dde5e8" d="M422.4,153.6V448a64,64,0,0,1-64,64H76.8a64,64,0,0,1-64-64V64a64,64,0,0,1,64-64H268.93Z"/>
<path fill="#9bbdc6" d="M422.4,153.6H332.8a64,64,0,0,1-64-64V0h.13Z"/>
<path fill="#afc3c9" d="M217.6,256a12.8,12.8,0,0,1-12.8,12.8H128A12.8,12.8,0,0,1,115.2,256h0A12.8,12.8,0,0,1,128,243.2h76.8A12.8,12.8,0,0,1,217.6,256Z"/>
<path fill="#afc3c9" d="M294.4,307.2A12.8,12.8,0,0,1,281.6,320H128a12.8,12.8,0,0,1-12.8-12.8h0A12.8,12.8,0,0,1,128,294.4H281.6a12.8,12.8,0,0,1,12.8,12.8Z"/>
<path fill="#afc3c9" d="M294,358.4a12.8,12.8,0,0,1-12.8,12.8H128a12.8,12.8,0,0,1-12.8-12.8h0A12.8,12.8,0,0,1,128,345.6H281.22A12.8,12.8,0,0,1,294,358.4Z"/>
<path fill="#e04848" d="M499.2,422.4a89.62,89.62,0,0,1-143.3,71.74,92.74,92.74,0,0,1-18-18A89.62,89.62,0,0,1,463.3,350.66a92.72,92.72,0,0,1,18,18A89.31,89.31,0,0,1,499.2,422.4Z"/>
<path fill="#9e2d2d" d="M481.34,368.7,355.9,494.14a92.74,92.74,0,0,1-18-18L463.3,350.66A92.72,92.72,0,0,1,481.34,368.7Z"/>
</svg>
`;
  return <SvgXml xml={xml} width={size} height={size} {...props} />;
};
