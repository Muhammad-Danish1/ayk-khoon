import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from '../../../../src/components/Card';
import { Colors, Spacing, Typography } from '../../../../src/theme';

const history = [
  {
    id: '1',
    type: 'donation',
    title: 'Blood Donation',
    date: 'Nov 15, 2023',
    location: 'City Blood Bank',
    bloodType: 'A+',
    status: 'completed',
  },
  {
    id: '2',
    type: 'request',
    title: 'Blood Request',
    date: 'Oct 28, 2023',
    location: 'General Hospital',
    bloodType: 'O+',
    status: 'completed',
  },
  {
    id: '3',
    type: 'donation',
    title: 'Blood Donation',
    date: 'Sep 5, 2023',
    location: 'Red Cross Center',
    bloodType: 'A+',
    status: 'completed',
  },
  // Add more history items as needed
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return Colors.success;
    case 'pending':
      return Colors.warning;
    case 'cancelled':
      return Colors.error;
    default:
      return Colors.text.secondary;
  }
};

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.status) + '20' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(item.status) }
                ]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>
            
            <View style={styles.historyDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>{item.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailValue}>{item.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Blood Type:</Text>
                <Text style={[styles.detailValue, styles.bloodType]}>{item.bloodType}</Text>
              </View>
            </View>
            
            {item.type === 'donation' && (
              <View style={styles.donationBadge}>
                <Text style={styles.donationText}>You donated blood</Text>
              </View>
            )}
            {item.type === 'request' && (
              <View style={styles.requestBadge}>
                <Text style={styles.requestText}>You requested blood</Text>
              </View>
            )}
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
  historyCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  historyTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  historyDetails: {
    marginTop: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  detailLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    width: 80,
  },
  detailValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    flex: 1,
  },
  bloodType: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  donationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  donationText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  requestBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: `${Colors.secondary}10`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  requestText: {
    color: Colors.secondary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
});
