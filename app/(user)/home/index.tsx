import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '../../../src/theme';
import { mockRequests, mockDonors } from '../../../src/data/mockData';

const userStats = {
  donations: 5,
  nextDonation: "Dec 15, 2024",
  bloodType: "A+",
  lastDonation: "Sep 20, 2024",
};

const urgentRequests = mockRequests.filter(req => req.urgency === 'high').slice(0, 3);
const nearbyDonors = mockDonors.slice(0, 4);

const QuickAction = ({ icon, label, onPress, color }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress}>
    <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.quickActionText}>{label}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderUrgentRequest = ({ item }) => (
    <TouchableOpacity 
      style={styles.urgentRequestCard}
      onPress={() => router.push(`/(user)/home/request-detail?id=${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.urgentBadge}>
        <Ionicons name="alert-circle" size={14} color={Colors.white} />
        <Text style={styles.urgentBadgeText}>URGENT</Text>
      </View>
      <View style={[styles.bloodTypeBadgeInCard, { backgroundColor: Colors.bloodGroups[item.bloodGroup] + '20' }]}>
        <Text style={[styles.bloodTypeTextInCard, { color: Colors.bloodGroups[item.bloodGroup] }]}>
          {item.bloodGroup}
        </Text>
      </View>
      <Text style={styles.patientName}>{item.seekerName}</Text>
      <Text style={styles.requestQuantity}>{item.quantity} needed</Text>
      <View style={styles.hospitalInfo}>
        <Ionicons name="location-outline" size={14} color={Colors.text.secondary} />
        <Text style={styles.hospitalText} numberOfLines={1}>{item.hospital}</Text>
      </View>
      <View style={styles.timeAgoContainer}>
        <Ionicons name="calendar-outline" size={14} color={Colors.primary} />
        <Text style={styles.distanceText}>By {item.neededBy}</Text>
      </View>
      <TouchableOpacity style={styles.donateButton}>
        <Text style={styles.donateButtonText}>Respond</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderNearbyDonor = ({ item }) => (
    <TouchableOpacity 
      style={styles.donorCard}
      onPress={() => router.push(`/(user)/home/find-donors?id=${item.id}`)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.profilePhoto }} style={styles.donorAvatar} />
      <View style={styles.donorInfo}>
        <Text style={styles.donorName}>{item.name}</Text>
        <View style={styles.donorBloodType}>
          <Ionicons name="water" size={12} color={Colors.primary} />
          <Text style={styles.donorBloodTypeText}>{item.bloodGroup}</Text>
        </View>
        <View style={styles.donorLocation}>
          <Ionicons name="location-outline" size={12} color={Colors.text.secondary} />
          <Text style={styles.donorLocationText}>{item.distance.toFixed(1)} km away</Text>
        </View>
      </View>
      <View style={[styles.availabilityBadge, { 
        backgroundColor: item.availability === 'available' ? Colors.success + '20' : Colors.text.tertiary + '20' 
      }]}>
        <View style={[styles.availabilityDot, { 
          backgroundColor: item.availability === 'available' ? Colors.success : Colors.text.tertiary 
        }]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>Alex Johnson</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={24} color={Colors.primary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.donations}</Text>
          <Text style={styles.statLabel}>Donations</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.nextDonation}</Text>
          <Text style={styles.statLabel}>Next Donation</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={styles.bloodTypeBadge}>
            <Text style={styles.bloodTypeText}>{userStats.bloodType}</Text>
          </View>
          <Text style={styles.statLabel}>Blood Type</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <QuickAction
            icon="water"
            label="Donate"
            color={Colors.primary}
            onPress={() => router.push('/donate')}
          />
          <QuickAction
            icon="search"
            label="Find Donors"
            color={Colors.secondary}
            onPress={() => router.push('/find-donors')}
          />
          <QuickAction
            icon="heart"
            label="Request Blood"
            color={Colors.danger}
            onPress={() => router.push('/request-blood')}
          />
          <QuickAction
            icon="calendar"
            label="Appointments"
            color={Colors.success}
            onPress={() => router.push('/appointments')}
          />
        </View>
      </View>

      {/* Urgent Requests */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Urgent Requests</Text>
          <TouchableOpacity onPress={() => router.push('/urgent-requests')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={urgentRequests}
          renderItem={renderUrgentRequest}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.urgentRequestsList}
        />
      </View>

      {/* Nearby Donors */}
      <View style={[styles.section, { marginBottom: Spacing.xl }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Donors</Text>
          <TouchableOpacity onPress={() => router.push('/(user)/home/find-donors')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={nearbyDonors}
          renderItem={renderNearbyDonor}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.donorsList}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingTop: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
  },
  userName: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginTop: -Spacing.xs,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLighter,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border.light,
    marginVertical: -Spacing.sm,
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  bloodTypeBadge: {
    backgroundColor: Colors.dangerLighter,
    borderRadius: BorderRadius.full,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  bloodTypeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.danger,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  seeAllText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  quickAction: {
    alignItems: 'center',
    width: '23%',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  quickActionText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  urgentRequestsList: {
    paddingLeft: Spacing.xl,
    paddingRight: Spacing.md,
  },
  urgentRequestCard: {
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginRight: Spacing.lg,
    ...Shadows.sm,
  },
  urgentBadge: {
    flexDirection: 'row',
    backgroundColor: Colors.dangerLighter,
    alignSelf: 'flex-start',
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  urgentBadgeText: {
    color: Colors.danger,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.xxs,
  },
  patientName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xxs,
  },
  hospitalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  hospitalText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.xxs,
  },
  distanceText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
    marginLeft: Spacing.xs,
  },
  timeAgoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  timeAgoText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginLeft: Spacing.xxs,
  },
  donateButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  donateButtonText: {
    color: Colors.white,
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.sm,
  },
  bloodTypeBadgeInCard: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.xs,
  },
  bloodTypeTextInCard: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  requestQuantity: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  donorsList: {
    paddingLeft: Spacing.xl,
    paddingRight: Spacing.md,
  },
  donorCard: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginRight: Spacing.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  donorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: Spacing.sm,
  },
  donorInfo: {
    alignItems: 'center',
    width: '100%',
  },
  donorName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xxs,
    textAlign: 'center',
  },
  donorBloodType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxs,
  },
  donorBloodTypeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: Spacing.xxs,
  },
  donorLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  donorLocationText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginLeft: Spacing.xxs,
  },
  availabilityBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  campsList: {
    paddingLeft: Spacing.xl,
    paddingRight: Spacing.md,
  },
  campCard: {
    width: 220,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginRight: Spacing.lg,
    flexDirection: 'row',
    ...Shadows.sm,
  },
  campDate: {
    backgroundColor: Colors.primaryLighter,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    width: 50,
  },
  campDay: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    lineHeight: 24,
  },
  campMonth: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    textTransform: 'uppercase',
    marginTop: -2,
  },
  campInfo: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  campName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.xxs,
  },
  campLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxs,
  },
  campLocationText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginLeft: Spacing.xxs,
  },
  campDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  campDistanceText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    marginLeft: Spacing.xxs,
  },
  registerButton: {
    position: 'absolute',
    bottom: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.primaryLighter,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
  },
  registerButtonText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
  },
});
