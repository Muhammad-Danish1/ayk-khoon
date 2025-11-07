import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BorderRadius, Colors, Spacing, Typography } from "../../src/theme";
import { Button } from "../../src/components";

// Dummy data - in a real app, this would come from an API
const donorData = {
  id: "1",
  name: "Alex Johnson",
  bloodType: "A+",
  location: "Downtown, New York",
  distance: "1.2 km away",
  lastDonation: "2 months ago",
  availability: "Available to donate",
  rating: 4.8,
  totalDonations: 12,
  bio: "Regular blood donor passionate about saving lives. Available for donations and always happy to help in emergencies.",
  contact: {
    phone: "+1 (555) 123-4567",
    email: "alex.johnson@example.com",
  },
  stats: [
    { label: "Donations", value: "12" },
    { label: "Lives Saved", value: "36+" },
    { label: "Last Donation", value: "2 months" },
  ],
  compatibility: [
    { type: "A+", compatible: true },
    { type: "A-", compatible: true },
    { type: "B+", compatible: false },
    { type: "B-", compatible: false },
    { type: "O+", compatible: false },
    { type: "O-", compatible: false },
    { type: "AB+", compatible: true },
    { type: "AB-", compatible: true },
  ],
  badges: ["Hero Donor", "Platinum Member", "Emergency Responder"],
};

export default function DonorProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handleRequestBlood = () => {
    router.push(`/request-blood?donorId=${id}`);
  };

  const handleMessage = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={Colors.text.primary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Donor Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {donorData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
            </View>
          </View>

          <Text style={styles.donorName}>{donorData.name}</Text>
          <View style={styles.bloodTypeBadge}>
            <Text style={styles.bloodTypeText}>{donorData.bloodType}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons
              name="location-outline"
              size={16}
              color={Colors.text.secondary}
            />
            <Text style={styles.locationText}>
              {donorData.location} • {donorData.distance}
            </Text>
          </View>

          <View style={styles.availabilityBadge}>
            <View style={styles.availabilityDot} />
            <Text style={styles.availabilityText}>
              {donorData.availability}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {donorData.stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{donorData.bio}</Text>
        </View>

        {/* Blood Compatibility */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blood Compatibility</Text>
          <View style={styles.compatibilityContainer}>
            {donorData.compatibility.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.bloodTypeCompatibility,
                  item.compatible
                    ? styles.compatible
                    : styles.notCompatible,
                ]}
              >
                <Text
                  style={[
                    styles.bloodTypeCompatibilityText,
                    item.compatible && { color: Colors.white },
                  ]}
                >
                  {item.type}
                </Text>
                <Ionicons
                  name={item.compatible ? "checkmark" : "close"}
                  size={16}
                  color={item.compatible ? Colors.white : Colors.text.secondary}
                  style={{ marginLeft: 4 }}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgesContainer}>
            {donorData.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Ionicons
                  name="ribbon"
                  size={16}
                  color={Colors.primary}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactItem}>
            <Ionicons
              name="call-outline"
              size={20}
              color={Colors.primary}
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>{donorData.contact.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={Colors.primary}
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>{donorData.contact.email}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.messageButton]}
          onPress={handleMessage}
        >
          <Ionicons name="chatbubble-ellipses" size={20} color={Colors.primary} />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.requestButton]}
          onPress={handleRequestBlood}
        >
          <Ionicons name="water" size={20} color={Colors.white} />
          <Text style={styles.requestButtonText}>Request Blood</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  profileHeader: {
    alignItems: "center",
    padding: Spacing.xl,
    backgroundColor: Colors.white,
    marginBottom: Spacing.sm,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryLighter,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 2,
  },
  donorName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  bloodTypeBadge: {
    backgroundColor: Colors.dangerLighter,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  bloodTypeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.danger,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  locationText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.xxs,
  },
  availabilityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.successLighter,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: Spacing.xxs,
  },
  availabilityText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.successDark,
    fontWeight: Typography.fontWeight.medium,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xxs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
  section: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  bioText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  compatibilityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -Spacing.xxs,
  },
  bloodTypeCompatibility: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
    margin: Spacing.xxs,
  },
  compatible: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  notCompatible: {
    backgroundColor: Colors.gray50,
  },
  bloodTypeCompatibilityText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -Spacing.xxs,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryLighter,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    margin: Spacing.xxs,
  },
  badgeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  contactIcon: {
    marginRight: Spacing.sm,
  },
  contactText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
  },
  actionButtons: {
    flexDirection: "row",
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.xs,
  },
  messageButton: {
    backgroundColor: Colors.gray50,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  requestButton: {
    backgroundColor: Colors.primary,
  },
  messageButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
    marginLeft: Spacing.xs,
  },
  requestButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.white,
    marginLeft: Spacing.xs,
  },
});
