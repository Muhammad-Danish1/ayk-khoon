import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../src/components/Button";
import { Input } from "../../src/components/Input";
import { Colors, Spacing, Typography } from "../../src/theme";

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];

export default function LocationScreen() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showCityList, setShowCityList] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Where are you located?</Text>
        <Text style={styles.subtitle}>
          This helps us show you relevant blood donation opportunities
        </Text>

        <View style={styles.inputContainer}>
          <Input
            label="City"
            placeholder="Select your city"
            value={selectedCity || ""}
            onFocus={() => setShowCityList(true)}
            showSoftInputOnFocus={false}
            rightIcon={
              <Ionicons
                name={showCityList ? "chevron-up" : "chevron-down"}
                size={20}
                color={Colors.text.secondary}
              />
            }
          />

          {showCityList && (
            <View style={styles.cityList}>
              {cities.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={[
                    styles.cityItem,
                    selectedCity === city && styles.cityItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedCity(city);
                    setShowCityList(false);
                  }}
                >
                  <Text
                    style={[
                      styles.cityText,
                      selectedCity === city && styles.cityTextSelected,
                    ]}
                  >
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={() => router.push("/(tabs)")}
          disabled={!selectedCity}
        />
        <Button
          title="Skip for now"
          variant="text"
          onPress={() => router.push("/(tabs)")}
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
  inputContainer: {
    position: 'relative',
    zIndex: 10,
  },
  cityList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
    maxHeight: 200,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cityItem: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  cityItemSelected: {
    backgroundColor: Colors.primaryLight,
  },
  cityText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  cityTextSelected: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
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
