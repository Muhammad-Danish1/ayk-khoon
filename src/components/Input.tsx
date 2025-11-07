import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={Colors.text.secondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, leftIcon && styles.inputWithIcon]}
          placeholderTextColor={Colors.text.disabled}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
  },
  inputError: {
    borderColor: Colors.primary,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.sm + 4,
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  errorText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
});
