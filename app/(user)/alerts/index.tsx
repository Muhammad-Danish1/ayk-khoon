import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../src/components/Card';
import { Colors, Spacing, Typography, BorderRadius } from '../../../src/theme';
import { mockNotifications } from '../../../src/data/mockData';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return Colors.error;
    case 'medium':
      return Colors.warning;
    case 'low':
      return Colors.info;
    default:
      return Colors.text.secondary;
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
};

export default function AlertsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.alertCard, !item.read && styles.unreadAlert]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
              <Ionicons name={item.icon as any} size={24} color={getPriorityColor(item.priority)} />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>{item.title}</Text>
              <Text style={styles.alertMessage} numberOfLines={2}>{item.message}</Text>
              <Text style={styles.alertTime}>{formatTimestamp(item.timestamp)}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    paddingTop: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  markAllButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  markAllText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['4xl'],
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    alignItems: 'flex-start',
  },
  unreadAlert: {
    backgroundColor: Colors.primaryLighter,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  alertMessage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
    lineHeight: 20,
  },
  alertTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: Spacing.xs,
    marginTop: Spacing.xs,
  },
});
