import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';
import { getFriendlyAuthError } from '../utils/errors';

export default function ForgotPasswordScreen({ navigation }) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert(
        'Account found',
        'This local account exists. Please go back and login with your saved password.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (resetError) {
      Alert.alert('Reset failed', getFriendlyAuthError(resetError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>
          Enter your registered email to check if the local account exists.
        </Text>
      </View>

      <View style={styles.form}>
        <AppTextInput
          autoCapitalize="none"
          autoComplete="email"
          error={error}
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          value={email}
        />
        <AppButton
          loading={loading}
          onPress={handleReset}
          title="Check account"
        />
        <AppButton
          onPress={() => navigation.goBack()}
          title="Back to login"
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
