import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAppTheme } from '../context/ThemeContext';

export default function CategoryPicker({ categories, label, onValueChange, value }) {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.pickerWrap}>
        <Picker
          dropdownIconColor={theme.colors.text}
          onValueChange={onValueChange}
          selectedValue={value}
          style={styles.picker}
        >
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.sm,
    },
    label: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
      textTransform: 'uppercase',
    },
    picker: {
      color: theme.colors.text,
      minHeight: 54,
    },
    pickerWrap: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      overflow: 'hidden',
    },
  });
