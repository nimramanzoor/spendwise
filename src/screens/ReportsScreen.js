import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import Screen from '../components/Screen';
import SegmentedControl from '../components/SegmentedControl';
import { useAppTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionsContext';
import { categoryColors } from '../theme';
import {
  formatCurrency,
  isWithinCurrentMonth,
  isWithinCurrentWeek,
} from '../utils/formatters';
import { useMemo, useState } from 'react';

const filterOptions = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Weekly', value: 'weekly' },
];

export default function ReportsScreen() {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { loading, transactions } = useTransactions();
  const [filter, setFilter] = useState('monthly');
  const width = Math.min(Dimensions.get('window').width - 32, 390);

  const filteredTransactions = useMemo(() => {
    const predicate =
      filter === 'weekly' ? isWithinCurrentWeek : isWithinCurrentMonth;

    return transactions.filter((transaction) => predicate(transaction.date));
  }, [filter, transactions]);

  const analytics = useMemo(() => {
    const totals = filteredTransactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
        } else {
          acc.expenses += transaction.amount;
          acc.categories[transaction.category] =
            (acc.categories[transaction.category] || 0) + transaction.amount;
        }

        return acc;
      },
      { categories: {}, expenses: 0, income: 0 },
    );

    const chartData = Object.entries(totals.categories).map(
      ([category, amount], index) => ({
        amount,
        color:
          categoryColors[category] ||
          theme.colors.chart[index % theme.colors.chart.length],
        legendFontColor: theme.colors.text,
        legendFontSize: 12,
        name: category,
      }),
    );

    return {
      ...totals,
      balance: totals.income - totals.expenses,
      chartData,
    };
  }, [filteredTransactions, theme.colors.chart, theme.colors.text]);

  return (
    <Screen scroll contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports</Text>
        <Text style={styles.subtitle}>
          Understand where your money is going with your saved local data.
        </Text>
      </View>

      <SegmentedControl options={filterOptions} onChange={setFilter} value={filter} />

      <View style={styles.metricsRow}>
        <Card style={styles.metricCard}>
          <Text style={styles.metricLabel}>Income</Text>
          <Text style={[styles.metricValue, styles.income]}>
            {formatCurrency(analytics.income)}
          </Text>
        </Card>
        <Card style={styles.metricCard}>
          <Text style={styles.metricLabel}>Expenses</Text>
          <Text style={[styles.metricValue, styles.expense]}>
            {formatCurrency(analytics.expenses)}
          </Text>
        </Card>
      </View>

      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Spending by category</Text>
          <Text style={styles.cardCaption}>{filteredTransactions.length} entries</Text>
        </View>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </View>
        ) : analytics.chartData.length ? (
          <PieChart
            accessor="amount"
            backgroundColor="transparent"
            chartConfig={{
              backgroundGradientFrom: theme.colors.card,
              backgroundGradientTo: theme.colors.card,
              color: () => theme.colors.text,
              decimalPlaces: 0,
              labelColor: () => theme.colors.textMuted,
            }}
            data={analytics.chartData}
            hasLegend
            height={220}
            paddingLeft="0"
            width={width}
          />
        ) : (
          <EmptyState
            icon="pie-chart-outline"
            message="Expense categories will appear once you add spending for this period."
            title="No spending yet"
          />
        )}
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Net result</Text>
        <Text
          style={[
            styles.netAmount,
            analytics.balance >= 0 ? styles.income : styles.expense,
          ]}
        >
          {formatCurrency(analytics.balance)}
        </Text>
        <Text style={styles.subtitle}>
          {analytics.balance >= 0
            ? 'You are keeping more than you spend this period.'
            : 'Expenses are ahead of income for this period.'}
        </Text>
      </Card>
    </Screen>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    cardCaption: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      fontWeight: '700',
    },
    cardHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.lg,
    },
    cardTitle: {
      ...theme.typography.h3,
      color: theme.colors.text,
    },
    container: {
      gap: theme.spacing.xl,
    },
    expense: {
      color: theme.colors.danger,
    },
    header: {
      gap: theme.spacing.sm,
    },
    income: {
      color: theme.colors.success,
    },
    loadingWrap: {
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    metricCard: {
      flex: 1,
      gap: theme.spacing.sm,
    },
    metricLabel: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
      textTransform: 'uppercase',
    },
    metricsRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    metricValue: {
      ...theme.typography.h3,
      fontWeight: '800',
    },
    netAmount: {
      ...theme.typography.h1,
      marginVertical: theme.spacing.sm,
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
