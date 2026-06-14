import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../context/ThemeContext';

export default function SplashScreen() {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, scale]);

  return (
    <LinearGradient
      colors={
        theme.isDark ? ['#061116', '#0F3D33'] : ['#ECFDF5', '#DFF7FF']
      }
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoWrap,
          {
            opacity: fade,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>S</Text>
        </View>
        <Text style={styles.title}>SpendWise</Text>
        <Text style={styles.subtitle}>Track money with calm clarity.</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing.xl,
    },
    logo: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radii.xl,
      height: 92,
      justifyContent: 'center',
      width: 92,
      ...theme.shadows,
    },
    logoText: {
      ...theme.typography.display,
      color: '#FFFFFF',
      fontSize: 42,
    },
    logoWrap: {
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textMuted,
      textAlign: 'center',
    },
    title: {
      ...theme.typography.display,
      color: theme.colors.text,
      marginTop: theme.spacing.sm,
    },
  });
