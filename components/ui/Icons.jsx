import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect, Mask, Circle, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

export function BankIcon({ size = 24, color = '#FFFFFF' }) {
  return (
   <svg width="58" height="65" viewBox="0 0 58 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.8391 0.835938L0.097168 16.0433V22.1263H57.581V16.0433M42.4537 28.2092V49.4995H51.5301V28.2092M0.097168 64.7069H57.581V55.5825H0.097168M24.3009 28.2092V49.4995H33.3773V28.2092M6.1481 28.2092V49.4995H15.2245V28.2092H6.1481Z" fill="white"/>
</svg>

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