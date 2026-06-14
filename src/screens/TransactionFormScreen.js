import { useEffect, useMemo, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import CategoryPicker from '../components/CategoryPicker';
import Screen from '../components/Screen';
import SegmentedControl from '../components/SegmentedControl';
import { useAppTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionsContext';
import { expenseCategories, incomeCategories } from '../theme';
import { formatShortDate } from '../utils/formatters';

const typeOptions = [
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
];

export default function TransactionFormScreen({ navigation, route }) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { addTransaction, deleteTransaction, editTransaction } = useTransactions();
  const existingTransaction = route?.params?.transaction;
  const isEditing = route?.params?.mode === 'edit' && existingTransaction;
  const [type, setType] = useState(
    existingTransaction?.type || route?.params?.type || 'expense',
  );
  const categories = useMemo(
    () => (type === 'income' ? incomeCategories : expenseCategories),
    [type],
  );
  const [title, setTitle] = useState(existingTransaction?.title || '');
  const [amount, setAmount] = useState(
    existingTransaction?.amount ? String(existingTransaction.amount) : '',
  );
  const [category, setCategory] = useState(
    existingTransaction?.category || categories[0],
  );
  const [date, setDate] = useState(
    existingTransaction?.date ? new Date(existingTransaction.date) : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!categories.includes(category)) {
      setCategory(categories[0]);
    }
  }, [categories, category]);

  const validate = () => {
    const nextErrors = {};
    const numericAmount = Number(amount);

    if (!title.trim()) {
      nextErrors.title = 'Title is required.';
    }

    if (!amount.trim() || Number.isNaN(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = 'Enter an amount greater than 0.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const leaveForm = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Dashboard');
    }
  };

  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    const payload = {
      title,
      amount: Number(amount),
      category,
      date,
      type,
    };

    setLoading(true);
    try {
      if (isEditing) {
        await editTransaction(existingTransaction.id, payload);
      } else {
        await addTransaction(payload);
      }
      leaveForm();
    } catch (error) {
      Alert.alert('Save failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const performDelete = async () => {
    if (!existingTransaction?.id) {
      Alert.alert('Delete failed', 'Transaction id is missing.');
      return;
    }

    setLoading(true);
    try {
      await deleteTransaction(existingTransaction.id);
      leaveForm();
    } catch (error) {
      Alert.alert('Delete failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      const confirmed =
        typeof globalThis.confirm === 'function'
          ? globalThis.confirm(
              'Delete transaction? This transaction will be permanently removed from this account.',
            )
          : true;

      if (confirmed) {
        performDelete();
      }
      return;
    }

    Alert.alert(
      'Delete transaction',
      'This transaction will be permanently removed from this account.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: performDelete,
        },
      ],
    );
  };

  const onDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Screen scroll contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isEditing ? 'Edit transaction' : 'Add transaction'}
        </Text>
        <Text style={styles.subtitle}>
          Keep your entries accurate so reports stay useful.
        </Text>
      </View>

      <SegmentedControl options={typeOptions} onChange={setType} value={type} />

      <View style={styles.form}>
        <AppTextInput
          error={errors.title}
          label="Title"
          onChangeText={setTitle}
          placeholder="Groceries, salary, rent..."
          value={title}
        />
        <AppTextInput
          error={errors.amount}
          keyboardType="decimal-pad"
          label="Amount"
          onChangeText={setAmount}
          placeholder="0.00"
          value={amount}
        />
        <CategoryPicker
          categories={categories}
          label="Category"
          onValueChange={setCategory}
          value={category}
        />
        <View style={styles.dateField}>
          <Text style={styles.label}>Date</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>{formatShortDate(date)}</Text>
          </Pressable>
        </View>

        {showDatePicker ? (
          <DateTimePicker
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            mode="date"
            onChange={onDateChange}
            value={date}
          />
        ) : null}
      </View>

      <View style={styles.buttonStack}>
        <AppButton
          loading={loading}
          onPress={handleSave}
          title={isEditing ? 'Save changes' : 'Save transaction'}
        />
        {isEditing ? (
          <AppButton
            disabled={loading}
            onPress={handleDelete}
            title="Delete transaction"
            variant="danger"
          />
        ) : null}
      </View>
    </Screen>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    buttonStack: {
      gap: theme.spacing.md,
    },
    container: {
      gap: theme.spacing.xl,
    },
    dateButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      minHeight: 54,
      flexDirection: 'row',
      paddingHorizontal: theme.spacing.lg,
    },
    dateField: {
      gap: theme.spacing.sm,
    },
    dateText: {
      ...theme.typography.body,
      color: theme.colors.text,
    },
    form: {
      gap: theme.spacing.lg,
    },
    header: {
      gap: theme.spacing.sm,
    },
    label: {
      ...theme.typography.caption,
      color: theme.colors.textMuted,
      textTransform: 'uppercase',
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
