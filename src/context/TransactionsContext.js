import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createTransaction,
  getTransactions,
  removeTransaction,
  updateTransaction,
} from '../services/transactionService';
import { useAuth } from './AuthContext';

const TransactionsContext = createContext(null);

export function TransactionsProvider({ children }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTransactions = useCallback(async () => {
    if (!user?.uid) {
      setTransactions([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    try {
      const savedTransactions = await getTransactions(user.uid);
      setTransactions(savedTransactions);
      setError(null);
    } catch (storageError) {
      setError(storageError);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const summary = useMemo(() => {
    const totals = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
        } else {
          acc.expenses += transaction.amount;
        }

        return acc;
      },
      { income: 0, expenses: 0 },
    );

    const balance = totals.income - totals.expenses;

    return {
      totalIncome: totals.income,
      totalExpenses: totals.expenses,
      totalBalance: balance,
      savings: Math.max(balance, 0),
    };
  }, [transactions]);

  const addTransaction = useCallback(
    async (transaction) => {
      if (!user?.uid) {
        throw new Error('Please login before adding transactions.');
      }

      setLoading(true);
      try {
        await createTransaction(user.uid, transaction);
        const updatedTransactions = await getTransactions(user.uid);
        setTransactions(updatedTransactions);
        setError(null);
      } catch (storageError) {
        setError(storageError);
        throw storageError;
      } finally {
        setLoading(false);
      }
    },
    [user?.uid],
  );

  const editTransaction = useCallback(
    async (transactionId, transaction) => {
      if (!user?.uid) {
        throw new Error('Please login before editing transactions.');
      }

      setLoading(true);
      try {
        await updateTransaction(user.uid, transactionId, transaction);
        const updatedTransactions = await getTransactions(user.uid);
        setTransactions(updatedTransactions);
        setError(null);
      } catch (storageError) {
        setError(storageError);
        throw storageError;
      } finally {
        setLoading(false);
      }
    },
    [user?.uid],
  );

  const deleteTransaction = useCallback(
    async (transactionId) => {
      if (!user?.uid) {
        throw new Error('Please login before deleting transactions.');
      }

      if (!transactionId) {
        throw new Error('Transaction id is missing.');
      }

      setLoading(true);
      try {
        await removeTransaction(user.uid, transactionId);
        const updatedTransactions = await getTransactions(user.uid);
        setTransactions(updatedTransactions);
        setError(null);
      } catch (storageError) {
        setError(storageError);
        throw storageError;
      } finally {
        setLoading(false);
      }
    },
    [user?.uid],
  );

  const value = useMemo(
    () => ({
      transactions,
      loading,
      error,
      summary,
      addTransaction,
      editTransaction,
      deleteTransaction,
      refreshTransactions: loadTransactions,
    }),
    [
      addTransaction,
      deleteTransaction,
      editTransaction,
      error,
      loadTransactions,
      loading,
      summary,
      transactions,
    ],
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionsProvider.',
    );
  }

  return context;
}
