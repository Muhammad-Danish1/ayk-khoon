import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    bloodType: "",
    dateOfBirth: "",
    gender: "",
    weight: "",
    lastDonation: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female", "Other", "Prefer not to say"];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form and navigate to home
      console.log("Form submitted:", formData);
      router.replace("/(user)");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicatorContainer}>
      {[1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <View
            style={[
              styles.stepIndicator,
              i === step
                ? styles.stepIndicatorActive
                : i < step
                ? styles.stepIndicatorCompleted
                : null,
            ]}
          >
            {i < step ? (
              <Ionicons name="checkmark" size={16} color={Colors.white} />
            ) : (
              <Text
                style={[
                  styles.stepNumber,
                  i === step && styles.stepNumberActive,
                ]}
              >
                {i}
              </Text>
            )}
          </View>
          {i < 3 && <View style={styles.stepDivider} />}
        </React.Fragment>
      ))}
    </View>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <Text style={styles.stepSubtitle}>
              Let's start with your basic information
            </Text>

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(text) =>
                setFormData({ ...formData, fullName: text })
              }
              leftIcon="person-outline"
              containerStyle={styles.inputContainer}
            />

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Blood Type</Text>
              <View style={styles.bloodTypeContainer}>
                {bloodTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.bloodTypeItem,
                      formData.bloodType === type && styles.bloodTypeItemActive,
                    ]}
                    onPress={() =>
                      setFormData({ ...formData, bloodType: type })
                    }
                  >
                    <Text
                      style={[
                        styles.bloodTypeText,
                        formData.bloodType === type &&
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
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              value={formData.dateOfBirth}
              onChangeText={(text) =>
                setFormData({ ...formData, dateOfBirth: text })
              }
              leftIcon="calendar-outline"
              containerStyle={styles.inputContainer}
            />
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Health Information</Text>
            <Text style={styles.stepSubtitle}>
              Help us understand your donation eligibility
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderContainer}>
                {genders.map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderItem,
                      formData.gender === gender && styles.genderItemActive,
                    ]}
                    onPress={() =>
                      setFormData({ ...formData, gender })
                    }
                  >
                    <Text
                      style={[
                        styles.genderText,
                        formData.gender === gender && styles.genderTextActive,
                      ]}
                    >
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Input
              label="Weight (kg)"
              placeholder="Enter your weight"
              value={formData.weight}
              onChangeText={(text) =>
                setFormData({ ...formData, weight: text })
              }
              keyboardType="numeric"
              leftIcon="scale-outline"
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Last Donation Date"
              placeholder="Select date"
              value={formData.lastDonation}
              onChangeText={(text) =>
                setFormData({ ...formData, lastDonation: text })
              }
              leftIcon="calendar-outline"
              rightIcon="calendar"
              containerStyle={styles.inputContainer}
            />
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Location</Text>
            <Text style={styles.stepSubtitle}>
              Help us find donors near you
            </Text>

            <Input
              label="Address"
              placeholder="Enter your address"
              value={formData.address}
              onChangeText={(text) =>
                setFormData({ ...formData, address: text })
              }
              leftIcon="location-outline"
              containerStyle={styles.inputContainer}
            />

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 2, marginRight: Spacing.sm }]}>
                <Input
                  label="City"
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(text) =>
                    setFormData({ ...formData, city: text })
                  }
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1, marginRight: Spacing.sm }]}>
                <Input
                  label="State"
                  placeholder="State"
                  value={formData.state}
                  onChangeText={(text) =>
                    setFormData({ ...formData, state: text })
                  }
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1.5 }]}>
                <Input
                  label="Postal Code"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChangeText={(text) =>
                    setFormData({ ...formData, postalCode: text })
                  }
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.mapPlaceholder}>
              <Ionicons name="map-outline" size={48} color={Colors.primary} />
              <Text style={styles.mapText}>Map View</Text>
              <Text style={styles.mapSubtext}>Your location will be shown here</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {step === 1
            ? "Personal Details"
            : step === 2
            ? "Health Info"
            : "Location"}
        </Text>
        <Text style={styles.headerSubtitle}>
          Step {step} of 3 • {step === 1 ? "Personal" : step === 2 ? "Health" : "Location"}
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.formContainer}>
          {renderStepIndicator()}
          <View style={styles.form}>{renderStep()}</View>
          <Button
            title={step === 3 ? "Complete Profile" : "Continue"}
            onPress={handleNext}
            style={styles.continueButton}
            rightIcon={
              step < 3 ? (
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={Colors.white}
                  style={{ marginLeft: Spacing.xs }}
                />
              ) : (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.white}
                  style={{ marginLeft: Spacing.xs }}
                />
              )
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerGradient: {
    paddingTop: Spacing["3xl"] + 20,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    borderBottomLeftRadius: BorderRadius["3xl"],
    borderBottomRightRadius: BorderRadius["3xl"],
  },
  backButton: {
    position: 'absolute',
    top: Spacing.xl,
    left: Spacing.lg,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    opacity: 0.9,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    marginTop: -Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  form: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    ...Shadows.lg,
    flex: 1,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndicatorActive: {
    backgroundColor: Colors.primary,
  },
  stepIndicatorCompleted: {
    backgroundColor: Colors.success,
  },
  stepDivider: {
    width: 40,
    height: 2,
    backgroundColor: Colors.gray200,
    marginHorizontal: 4,
  },
  stepNumber: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.secondary,
  },
  stepNumberActive: {
    color: Colors.white,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  stepSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  bloodTypeItem: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    margin: Spacing.xs,
  },
  bloodTypeItemActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  bloodTypeText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  bloodTypeTextActive: {
    color: Colors.white,
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  genderItem: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    margin: Spacing.xs,
  },
  genderItemActive: {
    backgroundColor: Colors.primaryLighter,
    borderColor: Colors.primary,
  },
  genderText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
  },
  genderTextActive: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -Spacing.sm,
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderStyle: 'dashed',
    marginTop: Spacing.sm,
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
  },
  continueButton: {
    marginTop: 'auto',
    marginHorizontal: Spacing.xl,
  },
});
