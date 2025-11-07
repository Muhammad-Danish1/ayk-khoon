import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';

interface StatusBadgeProps {
  status: 'available' | 'busy' | 'unavailable' | 'pending' | 'fulfilled' | 'cancelled' | 'open' | 'accepted';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'available':
      case 'open':
        return { label: 'Available', color: Colors.status.available };
      case 'busy':
        return { label: 'Busy', color: Colors.status.busy };
      case 'unavailable':
        return { label: 'Not Available', color: Colors.status.unavailable };
      case 'pending':
        return { label: 'Pending', color: Colors.status.pending };
      case 'fulfilled':
      case 'accepted':
        return { label: status === 'fulfilled' ? 'Fulfilled' : 'Accepted', color: Colors.status.fulfilled };
      case 'cancelled':
        return { label: 'Cancelled', color: Colors.status.cancelled };
      default:
        return { label: status, color: Colors.grayDark };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.color + '20' }, size === 'sm' && styles.badgeSm]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.label, { color: config.color }, size === 'sm' && styles.labelSm]}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  badgeSm: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.xs,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  labelSm: {
    fontSize: Typography.fontSize.xs,
  },
});
