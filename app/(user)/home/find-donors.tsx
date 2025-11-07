import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Card } from '../../../../src/theme';

type Donor = {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  lastDonation: string;
  available: boolean;
  distance: string;
};

const donors: Donor[] = [
  {
    id: '1',
    name: 'John Doe',
    bloodType: 'A+',
    location: 'Downtown',
    lastDonation: '2 months ago',
    available: true,
    distance: '1.2 km',
  },
  // Add more donor data as needed
];

export default function FindDonorsScreen() {
  const router = useRouter();

  const renderDonorItem = ({ item }: { item: Donor }) => (
    <Card style={styles.donorCard}>
      <View style={styles.donorHeader}>
        <View style={styles.bloodTypeBadge}>
          <Text style={styles.bloodTypeText}>{item.bloodType}</Text>
        </View>
        <Text style={styles.donorName}>{item.name}</Text>
        <View style={[styles.availabilityBadge, { 
          backgroundColor: item.available ? Colors.success + '20' : Colors.error + '20'
        }]}>
          <Text style={[styles.availabilityText, {
            color: item.available ? Colors.success : Colors.error
          }]}>
            {item.available ? 'Available' : 'Not Available'}
          </Text>
        </View>
      </View>
      
      <View style={styles.donorDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color={Colors.text.secondary} />
          <Text style={styles.detailText}>{item.location}</Text>
          <Text style={styles.distanceText}>{item.distance} away</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color={Colors.text.secondary} />
          <Text style={styles.detailText}>Last donation: {item.lastDonation}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.viewProfileButton}
        onPress={() => router.push(`/donor-profile/${item.id}`)}
      >
        <Text style={styles.viewProfileButtonText}>View Profile</Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Donors</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={Colors.text.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by blood type or location"
            placeholderTextColor={Colors.text.secondary}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollView}
        >
          <TouchableOpacity style={[styles.filterChip, styles.activeFilterChip]}>
            <Text style={[styles.filterChipText, styles.activeFilterChipText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Available Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>B+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>O+</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={donors}
        renderItem={renderDonorItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.donorsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={64} color={Colors.text.secondary} />
            <Text style={styles.emptyStateTitle}>No Donors Found</Text>
            <Text style={styles.emptyStateText}>Try adjusting your search or filters</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerTitle: {
    ...Typography.heading2,
    color: Colors.white,
  },
  searchContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    ...Typography.body1,
    color: Colors.text.primary,
  },
  filterButton: {
    padding: Spacing.xs,
  },
  filtersContainer: {
    backgroundColor: Colors.white,
    paddingBottom: Spacing.md,
  },
  filtersScrollView: {
    paddingHorizontal: Spacing.lg,
  },
  filterChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
    backgroundColor: Colors.background,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  activeFilterChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  activeFilterChipText: {
    color: Colors.white,
    fontWeight: '600',
  },
  donorsList: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  donorCard: {
    marginBottom: Spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  donorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  bloodTypeBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.error + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  bloodTypeText: {
    ...Typography.heading3,
    color: Colors.error,
  },
  donorName: {
    ...Typography.heading3,
    color: Colors.text.primary,
    flex: 1,
  },
  availabilityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: 12,
  },
  availabilityText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  donorDetails: {
    padding: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  detailText: {
    ...Typography.body2,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
    marginRight: 'auto',
  },
  distanceText: {
    ...Typography.caption,
    color: Colors.primary,
    marginLeft: Spacing.sm,
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  viewProfileButtonText: {
    ...Typography.button,
    color: Colors.primary,
    marginRight: Spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  emptyStateTitle: {
    ...Typography.heading3,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  emptyStateText: {
    ...Typography.body1,
    color: Colors.text.secondary,
    textAlign: 'center',
    maxWidth: 250,
  },
});
