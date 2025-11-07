import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "../../src/components/Button";
import { Colors, Spacing, Typography } from "../../src/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/welcome.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to BloodLink</Text>
        <Text style={styles.subtitle}>
          Join our community of blood donors and help save lives today
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={() => router.push("/(onboarding)/profile-setup")}
          style={styles.button}
        />
        <Button
          title="I already have an account"
          variant="text"
          onPress={() => router.push("/(auth)/login")}
          textStyle={styles.loginText}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
    lineHeight: 24,
  },
  footer: {
    paddingBottom: Spacing.xl,
    width: '100%',
  },
  button: {
    marginBottom: Spacing.md,
  },
  loginText: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});
