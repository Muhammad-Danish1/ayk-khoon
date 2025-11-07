import { Platform } from 'react-native';

export const Typography = {
  fontFamily: {
    regular: Platform.select({ ios: 'SF Pro Display', android: 'Roboto', default: 'System' }),
    medium: Platform.select({ ios: 'SF Pro Display', android: 'Roboto', default: 'System' }),
    semibold: Platform.select({ ios: 'SF Pro Display', android: 'Roboto', default: 'System' }),
    bold: Platform.select({ ios: 'SF Pro Display', android: 'Roboto', default: 'System' }),
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 42,
    '7xl': 48,
  },
  
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 30,
    '2xl': 32,
    '3xl': 38,
    '4xl': 42,
    '5xl': 44,
    '6xl': 52,
    '7xl': 60,
  },
  
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
};
