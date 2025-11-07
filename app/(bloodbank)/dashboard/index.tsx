import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography } from '../../../src/theme';
import { Card } from '../../../src/components/Card';

// Mock data
const stats = [
  { id: '1', label: 'Total Donations', value: '1,245', icon: 'water', color: Colors.primary },
  { id: '2', label: 'Active Donors', value: '89', icon: 'people', color: Colors.success },
  { id: '3', label: 'Blood Requests', value: '24', icon: 'notifications', color: Colors.warning },
  { id: '4', label: 'Low Stock', value: '3', icon: 'warning', color: Colors.error },
];

const recentActivities = [
  { id: '1', type: 'donation', donor: 'John Doe', bloodType: 'A+', time: '2 hours ago' },
  { id: '2', type: 'request', patient: 'Sarah Wilson', bloodType: 'B-', time: '5 hours ago' },
  { id: '3', type: 'donation', donor: 'Mike Johnson', bloodType: 'O+', time: '1 day ago' },
  { id: '4', type: 'donation', donor: 'Emma Davis', bloodType: 'AB+', time: '2 days ago' },
];

const bloodStock = [
  { type: 'A+', percentage: 65, amount: '12 units' },
  { type: 'A-', percentage: 30, amount: '5 units' },
  { type: 'B+', percentage: 45, amount: '8 units' },
  { type: 'B-', percentage: 20, amount: '3 units' },
  { type: 'O+', percentage: 80, amount: '15 units' },
  { type: 'O-', percentage: 15, amount: '2 units' },
  { type: 'AB+', percentage: 25, amount: '4 units' },
  { type: 'AB-', percentage: 10, amount: '1 unit' },
];

export default function BloodBankDashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.bankName}>City Blood Bank</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.text.primary} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsContainer}
      >
        {stats.map((stat) => (
          <Card key={stat.id} style={[styles.statCard, { borderLeftColor: stat.color }]}>
            <View style={styles.statIconContainer}>
              <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(bloodbank)/stock')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
            <MaterialIcons name="inventory" size={24} color={Colors.primary} />
          </View>
          <Text style={styles.actionText}>Manage Stock</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(bloodbank)/requests')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="list" size={24} color={Colors.success} />
          </View>
          <Text style={styles.actionText}>View Requests</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(bloodbank)/reports')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
            <MaterialIcons name="assessment" size={24} color={Colors.secondary} />
          </View>
          <Text style={styles.actionText}>Generate Report</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionIcon, { backgroundColor: '#E8EAF6' }]}>
            <Ionicons name="person-add" size={24} color={Colors.info} />
          </View>
          <Text style={styles.actionText}>Add Donor</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activities */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <Card style={styles.activitiesCard}>
        {recentActivities.map((activity, index) => (
          <View key={activity.id}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: activity.type === 'donation' ? '#E3F2FD' : '#FFF3E0' }]}>
                <Ionicons 
                  name={activity.type === 'donation' ? 'water' : 'notifications'} 
                  size={20} 
                  color={activity.type === 'donation' ? Colors.primary : Colors.warning} 
                />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>
                  {activity.type === 'donation' 
                    ? `${activity.donor} donated blood` 
                    : `New request from ${activity.patient}`}
                </Text>
                <Text style={styles.activityTime}>
                  <Text style={[styles.bloodType, { color: Colors.primary }]}>{activity.bloodType} </Text>
                  • {activity.time}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
            </View>
            {index < recentActivities.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </Card>

      {/* Blood Stock */}
      <View style={[styles.sectionHeader, { marginTop: Spacing.lg }]}>
        <Text style={styles.sectionTitle}>Blood Stock</Text>
        <TouchableOpacity onPress={() => router.push('/(bloodbank)/stock')}>
          <Text style={styles.seeAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <Card style={styles.bloodStockCard}>
        <View style={styles.bloodStockGrid}>
          {bloodStock.map((item) => (
            <View key={item.type} style={styles.bloodStockItem}>
              <View style={styles.bloodTypeContainer}>
                <Text style={[styles.bloodTypeText, { color: item.percentage < 20 ? Colors.error : Colors.text.primary }]}>
                  {item.type}
                </Text>
                <Text style={styles.bloodAmount}>{item.amount}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { 
                      width: `${item.percentage}%`,
                      backgroundColor: item.percentage < 20 
                        ? Colors.error 
                        : item.percentage < 50 
                          ? Colors.warning 
                          : Colors.success,
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
  },
  bankName: {
    fontSize: Typography.fontSize['xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginTop: Spacing.xxs,
  },
  notificationButton: {
    position: 'relative',
    padding: Spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
  statsContainer: {
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  statCard: {
    width: 160,
    padding: Spacing.md,
    marginRight: Spacing.md,
    borderLeftWidth: 4,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: Typography.fontSize['xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xxs,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    width: '48%',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: Spacing.xs,
    alignItems: 'center',
    ...Shadows.small,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  activitiesCard: {
    padding: 0,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
    marginBottom: Spacing.xxs,
  },
  activityTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
  bloodType: {
    fontWeight: Typography.fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginLeft: 72,
  },
  bloodStockCard: {
    padding: 0,
    overflow: 'hidden',
  },
  bloodStockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bloodStockItem: {
    width: '50%',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.border.light,
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  bloodTypeText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
  bloodAmount: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: Colors.border.light,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
});
