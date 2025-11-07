import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
}) => {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    styles[`${variant}Text` as keyof typeof styles] as TextStyle,
    styles[`${size}Text` as keyof typeof styles] as TextStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.white : Colors.primary}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: Colors.primary,
    ...Shadows.sm,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  sm: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  md: {
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.lg,
  },
  lg: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: Typography.fontWeight.semibold,
  },
  primaryText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
  },
  outlineText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
  },
  ghostText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
  },
  smText: {
    fontSize: Typography.fontSize.sm,
  },
  mdText: {
    fontSize: Typography.fontSize.base,
  },
  lgText: {
    fontSize: Typography.fontSize.lg,
  },
});
