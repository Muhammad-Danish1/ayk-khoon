import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '../theme';

interface FABProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
}

export const FAB: React.FC<FABProps> = ({ onPress, icon, label }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
      {icon && <Ionicons name={icon} size={24} color={Colors.white} />}
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
  },
  label: {
    color: Colors.white,
    fontSize: 12,
    marginTop: 2,
  },
});
