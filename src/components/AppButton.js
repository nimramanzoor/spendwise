import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';

export default function AppButton({
  disabled = false,
  icon,
  loading = false,
  onPress,
  style,
  title,
  variant = 'primary',
}) {
  const theme = useAppTheme();
  const styles = createStyles(theme, variant, disabled || loading);
  const iconColor =
    variant === 'primary' || variant === 'danger'
      ? '#FFFFFF'
      : theme.colors.primary;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled ? styles.pressed : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} />
      ) : (
        <View style={styles.content}>
          {icon ? <Ionicons color={iconColor} name={icon} size={20} /> : null}
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const getVariantStyles = (theme, variant) => {
  if (variant === 'secondary') {
    return {
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.border,
      textColor: theme.colors.primary,
    };
  }

  if (variant === 'danger') {
    return {
      backgroundColor: theme.colors.danger,
      borderColor: theme.colors.danger,
      textColor: '#FFFFFF',
    };
  }

  if (variant === 'ghost') {
    return {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: theme.colors.primary,
    };
  }

  return {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    textColor: '#FFFFFF',
  };
};

const createStyles = (theme, variant, disabled) => {
  const variantStyles = getVariantStyles(theme, variant);

  return StyleSheet.create({
    button: {
      minHeight: 54,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radii.md,
      borderWidth: 1,
      backgroundColor: variantStyles.backgroundColor,
      borderColor: variantStyles.borderColor,
      opacity: disabled ? 0.64 : 1,
      paddingHorizontal: theme.spacing.lg,
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.sm,
      justifyContent: 'center',
    },
    pressed: {
      transform: [{ scale: 0.98 }],
    },
    text: {
      ...theme.typography.button,
      color: variantStyles.textColor,
    },
  });
};
