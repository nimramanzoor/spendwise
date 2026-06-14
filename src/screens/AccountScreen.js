import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import Card from '../components/Card';
import Screen from '../components/Screen';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';

export default function AccountScreen() {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Logout failed', error.message);
    }
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.subtitle}>Manage your SpendWise session.</Text>
      </View>

      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(user?.displayName || user?.email || 'S').slice(0, 1).toUpperCase()}
          </Text>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.name}>
            {user?.displayName || 'SpendWise member'}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </Card>

      

      <AppButton
        icon="log-out-outline"
        onPress={handleLogout}
        title="Log out"
        variant="danger"
      />
    </Screen>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    avatar: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radii.pill,
      height: 58,
      justifyContent: 'center',
      width: 58,
    },
    avatarText: {
      ...theme.typography.h2,
      color: '#FFFFFF',
    },
    container: {
      gap: theme.spacing.xl,
    },
    email: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
    },
    header: {
      gap: theme.spacing.sm,
    },
    name: {
      ...theme.typography.h3,
      color: theme.colors.text,
    },
    notice: {
      gap: theme.spacing.sm,
    },
    noticeText: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
    },
    noticeTitle: {
      ...theme.typography.h3,
      color: theme.colors.text,
    },
    profileCard: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.lg,
    },
    profileText: {
      flex: 1,
      minWidth: 0,
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
