import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export default function AppTextInput({
  error,
  label,
  style,
  inputStyle,
  ...props
}) {
  const theme = useAppTheme();
  const styles = createStyles(theme, Boolean(error));

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, inputStyle]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const createStyles = (theme, hasError) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.sm,
    },
    label: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
      textTransform: 'uppercase',
    },
    input: {
      ...theme.typography.body,
      minHeight: 54,
      borderColor: hasError ? theme.colors.danger : theme.colors.border,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      color: theme.colors.text,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.surface,
    },
    error: {
      ...theme.typography.caption,
      color: theme.colors.danger,
    },
  });
