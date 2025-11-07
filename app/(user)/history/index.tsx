import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../src/components/Card';
import { StatusBadge } from '../../../src/components/StatusBadge';
import { Colors, Spacing, Typography, BorderRadius } from '../../../src/theme';
import { mockDonationHistory } from '../../../src/data/mockData';

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
      <Text style={styles.title}>Donation History</Text>
      
      <FlatList
        data={mockDonationHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.historyCard} variant="elevated">
            <View style={styles.iconTypeContainer}>
              <View style={[
                styles.typeIcon,
                { backgroundColor: item.type === 'donation' ? Colors.success + '20' : Colors.secondary + '20' }
              ]}>
                <Ionicons 
                  name={item.type === 'donation' ? 'water' : 'medkit'} 
                  size={24} 
                  color={item.type === 'donation' ? Colors.success : Colors.secondary} 
                />
              </View>
              <View style={styles.historyContent}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyTitle}>
                    {item.type === 'donation' ? 'Blood Donation' : 'Blood Request'}
                  </Text>
                  <StatusBadge status={item.status as any} size="sm" />
                </View>
                
                <View style={styles.historyDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color={Colors.text.secondary} />
                    <Text style={styles.detailValue}>{item.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={16} color={Colors.text.secondary} />
                    <Text style={styles.detailValue}>{item.location}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="water" size={16} color={Colors.primary} />
                    <Text style={[styles.detailValue, styles.bloodType]}>{item.bloodGroup}</Text>
                    <Text style={styles.quantityText}> • {item.quantity}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
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
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingBottom: Spacing['4xl'],
  },
  historyCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  iconTypeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  historyContent: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  historyTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    flex: 1,
  },
  historyDetails: {
    gap: Spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  bloodType: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  quantityText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
  },
});
