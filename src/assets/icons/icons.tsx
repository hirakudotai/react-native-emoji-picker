import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  style?: any;
}

export const XIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M18 6l-12 12" />
    <Path d="M6 6l12 12" />
  </Svg>
);

export const SearchIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <Path d="M21 21l-6 -6" />
  </Svg>
);

export const MoodSmileIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <Path d="M9 10l.01 0" />
    <Path d="M15 10l.01 0" />
    <Path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
  </Svg>
);

export const UserIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <Path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </Svg>
);

export const LeafIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
    <Path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
  </Svg>
);

export const PizzaIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M12 21.5c-3.04 0 -5.952 -.714 -8.5 -1.983l8.5 -16.517l8.5 16.517a19.09 19.09 0 0 1 -8.5 1.983z" />
    <Path d="M5.38 15.866a14.94 14.94 0 0 0 6.815 1.634a14.944 14.944 0 0 0 6.502 -1.479" />
    <Path d="M13 11.01v-.01" />
    <Path d="M11 14v-.01" />
    <Path d="M8 15v-.01" />
    <Path d="M16 12.01v-.01" />
  </Svg>
);

export const CarIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <Path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <Path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
  </Svg>
);

export const DeviceGamepadIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z" />
    <Path d="M6 12h4m-2 -2v4" />
    <Path d="M15 11l0 .01" />
    <Path d="M18 13l0 .01" />
  </Svg>
);

export const BulbIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
    <Path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
    <Path d="M9.7 17l4.6 0" />
  </Svg>
);

export const HashIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M5 9l14 0" />
    <Path d="M5 15l14 0" />
    <Path d="M11 4l-4 16" />
    <Path d="M17 4l-4 16" />
  </Svg>
);

export const FlagIcon = ({ size = 24, color = '#000', style }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
    <Path d="M5 21v-7" />
  </Svg>
); 