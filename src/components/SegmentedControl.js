import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export default function SegmentedControl({ options, onChange, value }) {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            accessibilityRole="button"
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, selected ? styles.optionSelected : null]}
          >
            <Text style={[styles.text, selected ? styles.textSelected : null]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: theme.radii.lg,
      flexDirection: 'row',
      gap: theme.spacing.xs,
      padding: theme.spacing.xs,
    },
    option: {
      alignItems: 'center',
      borderRadius: theme.radii.md,
      flex: 1,
      minHeight: 44,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.md,
    },
    optionSelected: {
      backgroundColor: theme.colors.surface,
      ...theme.shadows,
    },
    text: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      fontWeight: '700',
    },
    textSelected: {
      color: theme.colors.primary,
    },
  });
