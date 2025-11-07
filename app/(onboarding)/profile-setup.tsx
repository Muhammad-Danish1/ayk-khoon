import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Input } from "../../src/components";
import { BorderRadius, Colors, Shadows, Spacing, Typography } from "../../src/theme";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    bloodGroup: "",
    location: "",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleComplete = () => {
    if (!formData.phone || !formData.name || !formData.bloodGroup || !formData.location) {
      Alert.alert("Incomplete", "Please fill in all fields");
      return;
    }

    console.log("Profile completed:", formData);
    router.replace("/(user)/home");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.iconBackground}>
            <Ionicons name="person-add" size={48} color={Colors.white} />
          </View>
          <Text style={styles.headerTitle}>Complete Your Profile</Text>
          <Text style={styles.headerSubtitle}>
            Help us connect you with donors and requests
          </Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                leftIcon="person-outline"
                containerStyle={styles.inputContainer}
              />

              <Input
                label="Phone Number"
                placeholder="+92 300 1234567"
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                keyboardType="phone-pad"
                leftIcon="call-outline"
                containerStyle={styles.inputContainer}
              />

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Blood Group</Text>
                <View style={styles.bloodTypeContainer}>
                  {bloodTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.bloodTypeItem,
                        formData.bloodGroup === type && styles.bloodTypeItemActive,
                      ]}
                      onPress={() =>
                        setFormData({ ...formData, bloodGroup: type })
                      }
                    >
                      <Text
                        style={[
                          styles.bloodTypeText,
                          formData.bloodGroup === type &&
                            styles.bloodTypeTextActive,
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Input
                label="Location"
                placeholder="Enter your city or address"
                value={formData.location}
                onChangeText={(text) =>
                  setFormData({ ...formData, location: text })
                }
                leftIcon="location-outline"
                containerStyle={styles.inputContainer}
                multiline
                numberOfLines={2}
              />

              <View style={styles.mapPlaceholder}>
                <Ionicons name="map-outline" size={48} color={Colors.primary} />
                <Text style={styles.mapText}>Location Map</Text>
                <Text style={styles.mapSubtext}>Your location helps find nearby donors</Text>
              </View>

              <Button
                title="Complete Profile"
                onPress={handleComplete}
                style={styles.completeButton}
                rightIcon={
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={Colors.white}
                    style={{ marginLeft: Spacing.xs }}
                  />
                }
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: Spacing['2xl'],
    paddingHorizontal: Spacing.xl,
    borderBottomLeftRadius: BorderRadius['3xl'],
    borderBottomRightRadius: BorderRadius['3xl'],
  },
  headerContent: {
    alignItems: 'center',
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    maxWidth: '85%',
    lineHeight: 22,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    marginTop: -Spacing.xl,
  },
  form: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius['3xl'],
    borderTopRightRadius: BorderRadius['3xl'],
    padding: Spacing.xl,
    paddingTop: Spacing['2xl'],
    flex: 1,
    ...Shadows.lg,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  bloodTypeItem: {
    width: '22%',
    aspectRatio: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.lg,
    margin: Spacing.xs,
    backgroundColor: Colors.white,
  },
  bloodTypeItemActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  bloodTypeText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  bloodTypeTextActive: {
    color: Colors.white,
  },
  mapPlaceholder: {
    height: 160,
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderStyle: 'dashed',
    marginBottom: Spacing.xl,
  },
  mapText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginTop: Spacing.sm,
  },
  mapSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  completeButton: {
    marginTop: Spacing.md,
  },
});
