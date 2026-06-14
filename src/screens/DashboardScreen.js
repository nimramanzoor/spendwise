import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import Screen from '../components/Screen';
import SummaryCard from '../components/SummaryCard';
import TransactionCard from '../components/TransactionCard';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionsContext';

export default function DashboardScreen({ navigation }) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { user } = useAuth();
  const { error, loading, summary, transactions } = useTransactions();
  const recentTransactions = transactions.slice(0, 6);

  const openTransactionForm = (params) => {
    navigation.getParent()?.navigate('TransactionForm', params);
  };

  return (
    <Screen scroll contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text numberOfLines={1} style={styles.name}>
            {user?.displayName || user?.email || 'SpendWise user'}
          </Text>
        </View>
      </View>

      <SummaryCard summary={summary} />

      <View style={styles.actionRow}>
        <AppButton
          icon="add-circle-outline"
          onPress={() => openTransactionForm({ mode: 'add', type: 'income' })}
          style={styles.actionButton}
          title="Income"
        />
        <AppButton
          icon="remove-circle-outline"
          onPress={() => openTransactionForm({ mode: 'add', type: 'expense' })}
          style={styles.actionButton}
          title="Expense"
          variant="secondary"
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <Text style={styles.sectionCount}>{transactions.length} total</Text>
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </View>
      ) : error ? (
        <EmptyState
          icon="cloud-offline-outline"
          message={error.message}
          title="Could not load transactions"
        />
      ) : recentTransactions.length ? (
        <View style={styles.list}>
          {recentTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              onPress={() =>
                openTransactionForm({
                  mode: 'edit',
                  transaction,
                  type: transaction.type,
                })
              }
              transaction={transaction}
            />
          ))}
        </View>
      ) : (
        <EmptyState
          message="Add your first income or expense to see your money story here."
          title="No transactions yet"
        />
      )}
    </Screen>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    actionButton: {
      flex: 1,
    },
    actionRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    container: {
      gap: theme.spacing.xl,
    },
    greeting: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      fontWeight: '700',
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    list: {
      gap: theme.spacing.md,
    },
    loadingWrap: {
      alignItems: 'center',
      padding: theme.spacing.xxl,
    },
    name: {
      ...theme.typography.h1,
      color: theme.colors.text,
      maxWidth: 290,
    },
    sectionCount: {
      ...theme.typography.bodySmall,
      color: theme.colors.textMuted,
      fontWeight: '700',
    },
    sectionHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      ...theme.typography.h2,
      color: theme.colors.text,
    },
  });
