import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/formatters';

const Metric = ({ icon, label, value, tone }) => {
  const theme = useAppTheme();
  const toneColor = getToneColor(tone);
  const styles = createMetricStyles(theme);

  return (
    <View style={styles.metric}>
      <View style={styles.metricIcon}>
        <Ionicons color={toneColor} name={icon} size={16} />
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text numberOfLines={1} style={styles.metricValue}>
        {formatCurrency(value)}
      </Text>
    </View>
  );
};

export default function SummaryCard({ summary }) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const gradientColors = theme.isDark
    ? ['#0F3D33', '#0B2B3D']
    : ['#10B981', '#0EA5E9'];

  return (
    <LinearGradient colors={gradientColors} style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.label}>Total Balance</Text>
          <Text numberOfLines={1} style={styles.balance}>
            {formatCurrency(summary.totalBalance)}
          </Text>
        </View>
        <View style={styles.mark}>
          <Ionicons color="#FFFFFF" name="wallet-outline" size={24} />
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <Metric
          icon="arrow-down-circle-outline"
          label="Income"
          tone="income"
          value={summary.totalIncome}
        />
        <Metric
          icon="arrow-up-circle-outline"
          label="Expenses"
          tone="expense"
          value={summary.totalExpenses}
        />
        <Metric
          icon="leaf-outline"
          label="Savings"
          tone="savings"
          value={summary.savings}
        />
      </View>
    </LinearGradient>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    balance: {
      ...theme.typography.display,
      color: '#FFFFFF',
      marginTop: theme.spacing.xs,
    },
    card: {
      borderRadius: theme.radii.xl,
      gap: theme.spacing.xl,
      overflow: 'hidden',
      padding: theme.spacing.xl,
      ...theme.shadows,
    },
    headerRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      ...theme.typography.bodySmall,
      color: 'rgba(255,255,255,0.78)',
      fontWeight: '700',
    },
    mark: {
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.18)',
      borderRadius: theme.radii.pill,
      height: 52,
      justifyContent: 'center',
      width: 52,
    },
    metricsGrid: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
  });

const getToneColor = (tone) => {
  if (tone === 'expense') {
    return '#FCA5A5';
  }

  if (tone === 'savings') {
    return '#BBF7D0';
  }

  return '#BFDBFE';
};

const createMetricStyles = (theme) => {
  return StyleSheet.create({
    metric: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.14)',
      borderColor: 'rgba(255,255,255,0.2)',
      borderRadius: theme.radii.md,
      borderWidth: StyleSheet.hairlineWidth,
      minHeight: 92,
      padding: theme.spacing.md,
    },
    metricIcon: {
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.16)',
      borderRadius: theme.radii.pill,
      height: 28,
      justifyContent: 'center',
      marginBottom: theme.spacing.sm,
      width: 28,
    },
    metricLabel: {
      ...theme.typography.caption,
      color: 'rgba(255,255,255,0.72)',
      marginBottom: theme.spacing.xs,
    },
    metricValue: {
      ...theme.typography.bodySmall,
      color: '#FFFFFF',
      fontWeight: '800',
    },
  });
};
