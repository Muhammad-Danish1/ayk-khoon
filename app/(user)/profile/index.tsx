import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography } from '../../../../src/theme';

const profile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  bloodType: 'A+',
  lastDonation: 'Nov 15, 2023',
  totalDonations: 5,
  location: 'New York, USA',
};

const menuItems = [
  { id: 'edit', title: 'Edit Profile', icon: 'person-outline' },
  { id: 'donations', title: 'My Donations', icon: 'water-outline' },
  { id: 'requests', title: 'My Requests', icon: 'notifications-outline' },
  { id: 'saved', title: 'Saved Blood Banks', icon: 'bookmark-outline' },
  { id: 'settings', title: 'Settings', icon: 'settings-outline' },
  { id: 'help', title: 'Help & Support', icon: 'help-circle-outline' },
  { id: 'about', title: 'About Us', icon: 'information-circle-outline' },
  { id: 'logout', title: 'Logout', icon: 'log-out-outline', color: Colors.error },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleMenuItemPress = (id: string) => {
    if (id === 'logout') {
      // Handle logout
      router.replace('/(auth)/login');
    } else if (id === 'edit') {
      router.push('/(onboarding)/profile-setup');
    } else if (id === 'donations') {
      router.push('/(user)/history');
    } else if (id === 'requests') {
      router.push('/(user)/alerts');
    }
    // Add navigation for other menu items as needed
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.totalDonations}</Text>
            <Text style={styles.statLabel}>Donations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.primary }]}>{profile.bloodType}</Text>
            <Text style={styles.statLabel}>Blood Type</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.lastDonation}</Text>
            <Text style={styles.statLabel}>Last Donation</Text>
          </View>
        </View>
      </View>
      
      {/* Location */}
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={20} color={Colors.primary} />
        <Text style={styles.locationText}>{profile.location}</Text>
        <TouchableOpacity style={styles.changeLocationButton}>
          <Text style={styles.changeLocationText}>Change</Text>
        </TouchableOpacity>
      </View>
      
      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item.id)}
          >
            <View style={styles.menuIconContainer}>
              <Ionicons 
                name={item.icon as any} 
                size={22} 
                color={item.color || Colors.text.primary} 
              />
            </View>
            <Text style={[styles.menuText, item.color && { color: item.color }]}>
              {item.title}
            </Text>
            <MaterialIcons 
              name="keyboard-arrow-right" 
              size={24} 
              color={Colors.text.tertiary} 
            />
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  profileHeader: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  name: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xxs,
  },
  email: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xxs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border.light,
    marginHorizontal: Spacing.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  locationText: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  changeLocationButton: {
    padding: Spacing.xs,
  },
  changeLocationText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  menuContainer: {
    marginTop: Spacing.md,
    backgroundColor: Colors.white,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  menuIconContainer: {
    width: 40,
  },
  menuText: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  versionContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  versionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
  },
});
