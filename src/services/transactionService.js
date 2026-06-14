import AsyncStorage from '@react-native-async-storage/async-storage';

const normalizeDate = (value) => {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
};

const transactionsKey = (uid) => `@spendwise/transactions/${uid}`;

const serializeTransaction = (transaction) => ({
  ...transaction,
  amount: Number(transaction.amount || 0),
  date: normalizeDate(transaction.date).toISOString(),
});

const deserializeTransaction = (transaction) => ({
  ...transaction,
  amount: Number(transaction.amount || 0),
  date: normalizeDate(transaction.date),
});

const sortByDateDesc = (items) =>
  [...items].sort((a, b) => normalizeDate(b.date) - normalizeDate(a.date));

const payloadFromTransaction = (transaction) => ({
  title: transaction.title.trim(),
  amount: Number(transaction.amount),
  category: transaction.category,
  type: transaction.type,
  date: normalizeDate(transaction.date).toISOString(),
  notes: transaction.notes?.trim?.() || '',
  updatedAt: new Date().toISOString(),
});

async function saveTransactions(uid, transactions) {
  const payload = sortByDateDesc(transactions).map(serializeTransaction);
  await AsyncStorage.setItem(transactionsKey(uid), JSON.stringify(payload));
  return payload.map(deserializeTransaction);
}

export async function getTransactions(uid) {
  if (!uid) {
    return [];
  }

  const rawTransactions = await AsyncStorage.getItem(transactionsKey(uid));
  const transactions = rawTransactions ? JSON.parse(rawTransactions) : [];
  return sortByDateDesc(transactions.map(deserializeTransaction));
}

export function subscribeToTransactions(uid, onData, onError) {
  getTransactions(uid).then(onData).catch(onError);
  return () => {};
}

export async function createTransaction(uid, transaction) {
  const transactions = await getTransactions(uid);
  const newTransaction = {
    id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...payloadFromTransaction(transaction),
    createdAt: new Date().toISOString(),
  };

  await saveTransactions(uid, [newTransaction, ...transactions]);
  return deserializeTransaction(newTransaction);
}

export async function updateTransaction(uid, transactionId, transaction) {
  const transactions = await getTransactions(uid);
  const updatedTransactions = transactions.map((item) =>
    item.id === transactionId
      ? {
          ...item,
          ...payloadFromTransaction(transaction),
        }
      : item,
  );

  const updatedTransaction = updatedTransactions.find((item) => item.id === transactionId);

  if (!updatedTransaction) {
    throw new Error('Transaction not found. Please refresh and try again.');
  }

  await saveTransactions(uid, updatedTransactions);
  return deserializeTransaction(updatedTransaction);
}

export async function removeTransaction(uid, transactionId) {
  const transactions = await getTransactions(uid);
  const updatedTransactions = transactions.filter((item) => item.id !== transactionId);

  if (updatedTransactions.length === transactions.length) {
    throw new Error('Transaction not found. Please refresh and try again.');
  }

  await saveTransactions(uid, updatedTransactions);
  return true;
}
