import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors, Spacing, Typography, Card } from '../../../src/theme';

export default function StockDetailScreen() {
  const { id } = useLocalSearchParams();

  // Mock data for stock details
  const stockItem = {
    id,
    bloodType: 'A+',
    unitsAvailable: 15,
    lastUpdated: '2023-11-06',
    expiryDate: '2023-12-20',
    location: 'Main Storage',
    status: 'Good',
    history: [
      { date: '2023-11-01', action: 'Added', units: 5, by: 'Admin' },
      { date: '2023-10-28', action: 'Used', units: 2, by: 'Dr. Smith' },
      { date: '2023-10-20', action: 'Added', units: 12, by: 'Admin' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Blood Stock Details</Text>
      
      <Card style={styles.infoCard}>
        <View style={styles.bloodTypeContainer}>
          <Text style={styles.bloodType}>{stockItem.bloodType}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: stockItem.status === 'Good' ? Colors.success + '20' : Colors.warning + '20' }
          ]}>
            <Text style={[
              styles.statusText,
              { color: stockItem.status === 'Good' ? Colors.success : Colors.warning }
            ]}>
              {stockItem.status}
            </Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Units Available:</Text>
          <Text style={styles.detailValue}>{stockItem.unitsAvailable} units</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Updated:</Text>
          <Text style={styles.detailValue}>{stockItem.lastUpdated}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Expiry Date:</Text>
          <Text style={styles.detailValue}>{stockItem.expiryDate}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{stockItem.location}</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Stock History</Text>
      
      {stockItem.history.map((item, index) => (
        <Card key={index} style={styles.historyItem}>
          <View style={styles.historyLeft}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyAction}>
              {item.action} {item.units} unit{item.units > 1 ? 's' : ''}
            </Text>
          </View>
          <Text style={styles.historyBy}>by {item.by}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  title: {
    ...Typography.heading1,
    marginBottom: Spacing.lg,
    color: Colors.text.primary,
  },
  infoCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  bloodType: {
    ...Typography.heading1,
    color: Colors.primary,
    marginRight: Spacing.md,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    ...Typography.body2,
    color: Colors.text.secondary,
  },
  detailValue: {
    ...Typography.body1,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: Spacing.md,
    color: Colors.text.primary,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  historyLeft: {
    flex: 1,
  },
  historyDate: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  historyAction: {
    ...Typography.body1,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  historyBy: {
    ...Typography.body2,
    color: Colors.text.secondary,
  },
});
