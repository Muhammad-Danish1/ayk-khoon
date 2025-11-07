import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../src/theme';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark, Colors.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <View style={styles.iconBackground}>
            <Ionicons name="water" size={80} color={Colors.white} />
          </View>
        </Animated.View>
        <Text style={styles.title}>BloodLink+</Text>
        <Text style={styles.subtitle}>Saving Lives Together</Text>
      </Animated.View>
      
      <Animated.View style={[styles.bottomText, { opacity: fadeAnim }]}>
        <Text style={styles.tagline}>Connecting Heroes, One Drop at a Time</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['5xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginTop: Spacing.md,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.white,
    marginTop: Spacing.sm,
    opacity: 0.9,
  },
  bottomText: {
    position: 'absolute',
    bottom: Spacing['4xl'],
  },
  tagline: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    opacity: 0.8,
    letterSpacing: 0.5,
  },
});
