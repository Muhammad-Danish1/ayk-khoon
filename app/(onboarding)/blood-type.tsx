import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../src/components/Button";
import { Colors, Spacing, Typography } from "../../src/theme";

const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function BloodTypeScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What's your blood type?</Text>
        <Text style={styles.subtitle}>
          This helps us match you with compatible recipients
        </Text>

        <View style={styles.bloodTypeContainer}>
          {bloodTypes.map((type) => (
            <View
              key={type}
              style={[
                styles.bloodTypeButton,
                selectedType === type && styles.bloodTypeButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.bloodTypeText,
                  selectedType === type && styles.bloodTypeTextActive,
                ]}
                onPress={() => setSelectedType(type)}
              >
                {type}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={() => router.push("/(onboarding)/location")}
          disabled={!selectedType}
        />
        <Button
          title="Skip for now"
          variant="text"
          onPress={() => router.push("/(onboarding)/location")}
          textStyle={styles.skipText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.xl,
  },
  content: {
    flex: 1,
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
    marginBottom: Spacing.xl,
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -Spacing.xs,
  },
  bloodTypeButton: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.light,
    borderRadius: 12,
    margin: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  bloodTypeButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  bloodTypeText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  bloodTypeTextActive: {
    color: Colors.white,
  },
  footer: {
    paddingTop: Spacing.xl,
  },
  skipText: {
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
