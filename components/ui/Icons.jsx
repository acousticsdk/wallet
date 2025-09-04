import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect, Mask, Circle, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

export function BankIcon({ size = 24, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 134 134" fill="none">
      <Rect 
        x="0.0649414" 
        width="133.548" 
        height="133.548" 
        rx="66.7742" 
        fill="white" 
        fillOpacity="0.1"
      />
      <Path 
        d="M66.8391 34.8359L38.0972 50.0433V56.1263H95.581V50.0433M80.4537 62.2092V83.4995H89.5301V62.2092M38.0972 98.7069H95.581V89.5825H38.0972M62.3009 62.2092V83.4995H71.3773V62.2092M44.1481 62.2092V83.4995H53.2245V62.2092H44.1481Z" 
        fill={color}
      />
    </Svg>
  );
}

export function CryptoIcon({ size = 24, color = '#FFFFFF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M12 2L2 7L12 12L22 7L12 2Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M2 17L12 22L22 17" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M2 12L12 17L22 12" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}