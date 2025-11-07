import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors, Spacing, Typography, Card } from '../../../../src/theme';

export default function DashboardDetailScreen() {
  const { id } = useLocalSearchParams();

  // In a real app, you would fetch dashboard details using the id
  const dashboardData = {
    id,
    title: 'Dashboard Details',
    metrics: [
      { label: 'Total Donations', value: '1,245', change: '+12%' },
      { label: 'Active Donors', value: '342', change: '+5%' },
      { label: 'Blood Requests', value: '89', change: '-3%' },
      { label: 'Inventory Level', value: '78%', change: '+2%' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{dashboardData.title}</Text>
      
      <View style={styles.metricsContainer}>
        {dashboardData.metrics.map((metric, index) => (
          <Card key={index} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricValueContainer}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={[
                styles.metricChange,
                metric.change.startsWith('+') ? styles.positiveChange : styles.negativeChange
              ]}>
                {metric.change}
              </Text>
            </View>
          </Card>
        ))}
      </View>

      <Card style={styles.detailCard}>
        <Text style={styles.detailTitle}>Dashboard Details for ID: {id}</Text>
        <Text style={styles.detailText}>
          This is a detailed view for the dashboard item. In a real application,
          this would display more comprehensive data and interactive elements.
        </Text>
      </Card>
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
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  metricCard: {
    width: '48%',
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  metricLabel: {
    ...Typography.body2,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  metricValue: {
    ...Typography.heading3,
    color: Colors.text.primary,
    marginRight: Spacing.sm,
  },
  metricChange: {
    ...Typography.body2,
    paddingBottom: 2,
  },
  positiveChange: {
    color: Colors.success,
  },
  negativeChange: {
    color: Colors.error,
  },
  detailCard: {
    padding: Spacing.lg,
  },
  detailTitle: {
    ...Typography.heading3,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  detailText: {
    ...Typography.body1,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
});
