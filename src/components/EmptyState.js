import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';

export default function EmptyState({
  icon = 'receipt-outline',
  message,
  title = 'Nothing here yet',
}) {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons color={theme.colors.primary} name={icon} size={26} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: theme.spacing.sm,
      padding: theme.spacing.xl,
    },
    iconWrap: {
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: theme.radii.pill,
      height: 56,
      justifyContent: 'center',
      width: 56,
    },
    message: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      textAlign: 'center',
    },
    title: {
      ...theme.typography.h3,
      color: theme.colors.text,
      textAlign: 'center',
    },
  });
