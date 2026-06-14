import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';
import { getFriendlyAuthError } from '../utils/errors';

export default function LoginScreen({ navigation }) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login failed', getFriendlyAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>S</Text>
        </View>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to review your spending, income, and savings progress.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Local login</Text>
          <Text style={styles.demoText}>Register first, then login with the same email and password.</Text>
        </View>
        <AppTextInput
          autoCapitalize="none"
          autoComplete="email"
          error={errors.email}
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          value={email}
        />
        <AppTextInput
          error={errors.password}
          label="Password"
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
          value={password}
        />
        <AppButton loading={loading} onPress={handleLogin} title="Log in" />
        <AppButton
          onPress={() => navigation.navigate('ForgotPassword')}
          title="Forgot password?"
          variant="ghost"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>New to SpendWise?</Text>
        <AppButton
          onPress={() => navigation.navigate('Register')}
          title="Create an account"
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    footer: {
      gap: theme.spacing.md,
      marginTop: theme.spacing.xl,
    },
    footerText: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      textAlign: 'center',
    },
    demoBox: {
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.md,
      borderWidth: StyleSheet.hairlineWidth,
      gap: theme.spacing.xs,
      padding: theme.spacing.md,
    },
    demoText: {
      ...theme.typography.bodySmall,
      color: theme.colors.text,
      fontWeight: '700',
    },
    demoTitle: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
      textTransform: 'uppercase',
    },
    form: {
      gap: theme.spacing.lg,
    },
    hero: {
      gap: theme.spacing.md,
      marginBottom: theme.spacing.xxl,
    },
    logo: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radii.lg,
      height: 58,
      justifyContent: 'center',
      width: 58,
    },
    logoText: {
      ...theme.typography.h1,
      color: '#FFFFFF',
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textMuted,
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.text,
    },
  });
