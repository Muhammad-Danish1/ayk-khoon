import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'flat';
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'elevated' }) => {
  return (
    <View style={[styles.card, styles[variant], style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  elevated: {
    ...Shadows.sm,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  flat: {
    backgroundColor: Colors.background.secondary,
  },
});
