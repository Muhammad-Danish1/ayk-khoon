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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = () => {
    // Dummy function - in a real app, this would send a password reset email
    console.log("Reset password for:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail-open-outline" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a password reset link to {email}
          </Text>
          <Button
            title="Back to Login"
            onPress={() => router.replace("/(auth)/login")}
            style={styles.button}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
        <Text style={styles.headerSubtitle}>
          Enter your email to receive a password reset link
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail-outline"
            />

            <Button
              title="Send Reset Link"
              onPress={handleResetPassword}
              style={styles.button}
            />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Remember your password? </Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                <Text style={styles.signupLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  headerGradient: {
    paddingTop: Spacing["3xl"] + 20,
    paddingBottom: Spacing["2xl"],
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
    fontSize: Typography.fontSize["3xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginBottom: Spacing.xs,
    marginTop: Spacing.xl,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    opacity: 0.9,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    marginTop: -Spacing.lg,
  },
  form: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    ...Shadows.lg,
  },
  button: {
    marginTop: Spacing.md,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryLighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    lineHeight: 24,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.xl,
  },
  signupText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  signupLink: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
});
