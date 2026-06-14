import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categoryColors } from '../theme';
import { useAppTheme } from '../context/ThemeContext';
import { formatCurrency, formatShortDate } from '../utils/formatters';

const categoryIcons = {
  Salary: 'briefcase-outline',
  Freelance: 'laptop-outline',
  Investments: 'trending-up-outline',
  Food: 'restaurant-outline',
  Transport: 'car-outline',
  Shopping: 'bag-outline',
  Bills: 'document-text-outline',
  Health: 'medkit-outline',
  Entertainment: 'film-outline',
  Other: 'apps-outline',
};

export default function TransactionCard({ onPress, transaction }) {
  const theme = useAppTheme();
  const styles = createStyles(theme, transaction.type);
  const categoryColor = categoryColors[transaction.category] || theme.colors.primary;
  const icon = categoryIcons[transaction.category] || categoryIcons.Other;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed ? styles.pressed : null]}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${categoryColor}20` }]}>
        <Ionicons color={categoryColor} name={icon} size={22} />
      </View>
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>
          {transaction.title}
        </Text>
        <Text numberOfLines={1} style={styles.meta}>
          {transaction.category} • {formatShortDate(transaction.date)}
        </Text>
      </View>
      <Text style={styles.amount}>
        {transaction.type === 'income' ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </Text>
    </Pressable>
  );
}

const createStyles = (theme, type) =>
  StyleSheet.create({
    amount: {
      ...theme.typography.bodySmall,
      color: type === 'income' ? theme.colors.success : theme.colors.danger,
      fontWeight: '800',
      maxWidth: 112,
      textAlign: 'right',
    },
    card: {
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.lg,
      borderWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      gap: theme.spacing.md,
      padding: theme.spacing.md,
    },
    details: {
      flex: 1,
      minWidth: 0,
    },
    iconWrap: {
      alignItems: 'center',
      borderRadius: theme.radii.md,
      height: 46,
      justifyContent: 'center',
      width: 46,
    },
    meta: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      marginTop: 2,
    },
    pressed: {
      opacity: 0.76,
      transform: [{ scale: 0.99 }],
    },
    title: {
      ...theme.typography.body,
      color: theme.colors.text,
      fontWeight: '700',
    },
  });
