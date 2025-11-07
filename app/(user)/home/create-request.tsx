import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Picker } from "../../../src/components";
import { Colors, Spacing, Typography } from "../../../src/theme";

const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const urgencyLevels = [
  { label: "Urgent (Within 6 hours)", value: "urgent" },
  { label: "High (Within 24 hours)", value: "high" },
  { label: "Normal (Within 3 days)", value: "normal" },
];

const hospitals = [
  { id: 1, name: "Aga Khan University Hospital" },
  { id: 2, name: "Jinnah Postgraduate Medical Centre" },
  { id: 3, name: "Civil Hospital Karachi" },
  { id: 4, name: "Liaquat National Hospital" },
  { id: 5, name: "Ziauddin Hospital" },
];

export default function CreateRequestScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    units: "1",
    hospital: "",
    urgency: "",
    requiredDate: "",
    requiredTime: "",
    notes: "",
    contactNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.patientName || !formData.bloodType || !formData.hospital || 
        !formData.urgency || !formData.requiredDate || !formData.requiredTime) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Request submitted:", formData);
      setIsSubmitting(false);
      Alert.alert("Success", "Blood request has been submitted successfully!");
      router.back();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>New Blood Request</Text>
          <Text style={styles.subtitle}>Fill in the details to request blood</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Patient Name *"
            placeholder="Enter patient's full name"
            value={formData.patientName}
            onChangeText={(text) => handleInputChange("patientName", text)}
            leftIcon="person-outline"
          />

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
              <Text style={styles.label}>Blood Type *</Text>
              <Picker
                selectedValue={formData.bloodType}
                onValueChange={(value) => handleInputChange("bloodType", value)}
                placeholder="Select blood type"
                items={bloodTypes.map(type => ({ label: type, value: type }))}
              />
            </View>
            
            <View style={[styles.inputGroup, { width: 100 }]}>
              <Text style={styles.label}>Units *</Text>
              <Input
                value={formData.units}
                onChangeText={(text) => handleInputChange("units", text)}
                keyboardType="numeric"
                style={styles.unitInput}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hospital *</Text>
            <Picker
              selectedValue={formData.hospital}
              onValueChange={(value) => handleInputChange("hospital", value)}
              placeholder="Select hospital"
              items={hospitals.map(h => ({ label: h.name, value: h.name }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Urgency Level *</Text>
            <View style={styles.urgencyContainer}>
              {urgencyLevels.map((level) => (
                <TouchableOpacity
                  key={level.value}
                  style={[
                    styles.urgencyButton,
                    formData.urgency === level.value && styles.urgencyButtonActive,
                  ]}
                  onPress={() => handleInputChange("urgency", level.value)}
                >
                  <Ionicons
                    name={
                      level.value === "urgent"
                        ? "warning"
                        : level.value === "high"
                        ? "alert"
                        : "time"
                    }
                    size={16}
                    color={
                      formData.urgency === level.value
                        ? Colors.white
                        : Colors.primary
                    }
                  />
                  <Text
                    style={[
                      styles.urgencyButtonText,
                      formData.urgency === level.value &&
                        styles.urgencyButtonTextActive,
                    ]}
                  >
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: Spacing.sm }]}>
              <Text style={styles.label}>Required Date *</Text>
              <Input
                placeholder="Select date"
                value={formData.requiredDate}
                onChangeText={(text) => handleInputChange("requiredDate", text)}
                leftIcon="calendar-outline"
                rightIcon="chevron-down"
                onPressIn={() => {
                  // In a real app, show date picker here
                  handleInputChange("requiredDate", new Date().toISOString().split('T')[0]);
                }}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Time *</Text>
              <Input
                placeholder="Select time"
                value={formData.requiredTime}
                onChangeText={(text) => handleInputChange("requiredTime", text)}
                leftIcon="time-outline"
                rightIcon="chevron-down"
                onPressIn={() => {
                  // In a real app, show time picker here
                  handleInputChange("requiredTime", "12:00 PM");
                }}
              />
            </View>
          </View>

          <Input
            label="Contact Number *"
            placeholder="Your contact number"
            value={formData.contactNumber}
            onChangeText={(text) => handleInputChange("contactNumber", text)}
            leftIcon="call-outline"
            keyboardType="phone-pad"
          />

          <Input
            label="Additional Notes"
            placeholder="Any additional information..."
            value={formData.notes}
            onChangeText={(text) => handleInputChange("notes", text)}
            multiline
            numberOfLines={4}
            style={styles.notesInput}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={isSubmitting ? "Submitting..." : "Submit Request"}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  scrollView: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
  },
  form: {
    marginBottom: Spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -Spacing.sm,
    marginBottom: Spacing.md,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  unitInput: {
    textAlign: 'center',
  },
  urgencyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
    marginTop: Spacing.sm,
  },
  urgencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border.light,
    margin: Spacing.xs,
    backgroundColor: Colors.white,
  },
  urgencyButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  urgencyButtonText: {
    marginLeft: Spacing.xs,
    color: Colors.text.primary,
    fontSize: Typography.fontSize.sm,
  },
  urgencyButtonTextActive: {
    color: Colors.white,
  },
  notesInput: {
    textAlignVertical: 'top',
    minHeight: 100,
    paddingTop: Spacing.md,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    backgroundColor: Colors.white,
  },
});
