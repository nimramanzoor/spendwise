import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export default function Card({ children, style }) {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return <View style={[styles.card, style]}>{children}</View>;
}

const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.lg,
      borderWidth: StyleSheet.hairlineWidth,
      padding: theme.spacing.lg,
      ...theme.shadows,
    },
  });
