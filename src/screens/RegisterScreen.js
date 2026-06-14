import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';
import { getFriendlyAuthError } from '../utils/errors';

export default function RegisterScreen({ navigation }) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    }

    if (password.length < 6) {
      nextErrors.password = 'Use at least 6 characters.';
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords must match.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      setLoading(false);
      Alert.alert(
        'Account created',
        'Registration successful. Please login with the same email and password.',
      );
      navigation.replace('Login');
    } catch (error) {
      setLoading(false);
      Alert.alert('Registration failed', getFriendlyAuthError(error));
    }
  };

  return (
    <Screen scroll contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          Start tracking every income stream and expense in one clean dashboard.
        </Text>
      </View>

      <View style={styles.form}>
        <AppTextInput
          error={errors.name}
          label="Full name"
          onChangeText={setName}
          placeholder="Your name"
          value={name}
        />
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
          placeholder="At least 6 characters"
          secureTextEntry
          value={password}
        />
        <AppTextInput
          error={errors.confirmPassword}
          label="Confirm password"
          onChangeText={setConfirmPassword}
          placeholder="Repeat your password"
          secureTextEntry
          value={confirmPassword}
        />
        <AppButton
          loading={loading}
          onPress={handleRegister}
          title="Create account"
        />
        <AppButton
          onPress={() => navigation.goBack()}
          title="I already have an account"
          variant="ghost"
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
    form: {
      gap: theme.spacing.lg,
    },
    header: {
      gap: theme.spacing.md,
      marginBottom: theme.spacing.xxl,
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
