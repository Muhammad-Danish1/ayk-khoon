import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from '../../../../src/components/Card';
import { Colors, Spacing, Typography } from '../../../../src/theme';

const alerts = [
  {
    id: '1',
    title: 'Blood Donation Reminder',
    message: 'You are eligible to donate blood again. Your next donation date is Dec 15, 2023.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    title: 'Request Accepted',
    message: 'Your blood request has been accepted by City Hospital. Please check your messages.',
    time: '1 day ago',
    read: true,
  },
  // Add more alerts as needed
];

export default function AlertsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={[styles.alertCard, !item.read && styles.unreadAlert]}>
            <Text style={styles.alertTitle}>{item.title}</Text>
            <Text style={styles.alertMessage}>{item.message}</Text>
            <Text style={styles.alertTime}>{item.time}</Text>
            {!item.read && <View style={styles.unreadBadge} />}
          </Card>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  alertCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
    position: 'relative',
  },
  unreadAlert: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  alertTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  alertMessage: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  alertTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
  },
  unreadBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
});
