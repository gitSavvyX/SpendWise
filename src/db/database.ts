import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@spendwise_transactions';

export const getTransactions = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch transactions.', e);
    return [];
  }
};

export const saveTransaction = async (transaction: any) => {
  try {
    const existing = await getTransactions();
    let updated;
    if (transaction.id) {
      // Update
      updated = existing.map((t: any) => (t.id === transaction.id ? transaction : t));
    } else {
      // Add new
      const newTransaction = { ...transaction, id: Date.now().toString() };
      updated = [...existing, newTransaction];
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save transaction.', e);
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const existing = await getTransactions();
    const updated = existing.filter((t: any) => t.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete transaction.', e);
  }
};