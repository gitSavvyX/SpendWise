import { db, initDatabase, insertSampleTransaction } from '@/db/database';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    initDatabase(); 
    const existing = db.getAllSync('SELECT * FROM transactions');
    if (existing.length === 0) {
      insertSampleTransaction();
    }
    const data = db.getAllSync('SELECT * FROM transactions ORDER BY date DESC');
    setTransactions(data);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpendWise</Text>
      <View style={styles.summaryCard}>
        <Text style={styles.balance}>Total Balance: $84.50</Text>
        <View style={styles.row}>
          <Text style={styles.income}>Income: $100.00</Text>
          <Text style={styles.expense}>Expense: $15.50</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>Recent Transactions (Database):</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.category} - {item.note}</Text>
            <Text style={{ color: item.type === 'expense' ? 'red' : 'green', fontWeight: 'bold' }}>
              {item.type === 'expense' ? '-' : '+'}${item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  summaryCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 2, marginBottom: 20 },
  balance: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  income: { color: 'green', fontSize: 16, fontWeight: '600' },
  expense: { color: 'red', fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 },
});