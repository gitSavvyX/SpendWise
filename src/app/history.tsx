import { deleteTransaction, getTransactions, saveTransaction } from '@/db/database';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // This just loads the data on startup - no initDatabase needed
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const data = await getTransactions();
    // Sort newest first by ID
    data.sort((a: any, b: any) => Number(b.id) - Number(a.id));
    setTransactions(data);
  };

  const handleSave = async () => {
    setErrorMsg('');
    const amountNum = parseFloat(amount);

    if (!amount.trim() || !category.trim()) {
      setErrorMsg('Amount and Category are required.');
      return;
    }
    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMsg('Amount must be a valid positive number.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const transactionData = {
      id: editingId, 
      type,
      amount: amountNum,
      category,
      note,
      date: today,
    };

    await saveTransaction(transactionData);
    resetForm();
    loadTransactions();
  };

  const handleDelete = (id: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm("Are you sure you want to delete this transaction?")) {
        deleteTransaction(id).then(loadTransactions);
      }
    } else {
      Alert.alert("Delete", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
            deleteTransaction(id).then(loadTransactions);
          } 
        }
      ]);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setType(item.type);
    setAmount(item.amount.toString());
    setCategory(item.category);
    setNote(item.note || '');
    setIsFormVisible(true);
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setEditingId(null);
    setType('expense');
    setAmount('');
    setCategory('');
    setNote('');
    setErrorMsg('');
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={{ color: item.type === 'expense' ? 'red' : 'green', fontWeight: 'bold' }}>
          {item.type === 'expense' ? '-' : '+'}${parseFloat(item.amount).toFixed(2)}
        </Text>
      </View>
      <Text style={styles.note}>{item.note || 'No note'} • {item.date}</Text>
      
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsFormVisible(true)}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No transactions yet. Click + Add.</Text>}
      />

      {isFormVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingId ? 'Edit Transaction' : 'Add Transaction'}</Text>
            
            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

            <View style={styles.typeToggle}>
              <TouchableOpacity style={[styles.typeBtn, type === 'expense' && styles.activeExpense]} onPress={() => setType('expense')}>
                <Text style={type === 'expense' ? styles.activeText : {}}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.typeBtn, type === 'income' && styles.activeIncome]} onPress={() => setType('income')}>
                <Text style={type === 'income' ? styles.activeText : {}}>Income</Text>
              </TouchableOpacity>
            </View>

            <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
            <TextInput style={styles.input} placeholder="Category (e.g. Food)" value={category} onChangeText={setCategory} />
            <TextInput style={styles.input} placeholder="Note (Optional)" value={note} onChangeText={setNote} />

            <View style={styles.formButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={resetForm}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  addButton: { backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  category: { fontSize: 18, fontWeight: 'bold' },
  note: { color: '#666', marginBottom: 10 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderColor: '#eee', paddingTop: 10, gap: 15 },
  editText: { color: '#007AFF', fontWeight: 'bold' },
  deleteText: { color: 'red', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#888' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20, zIndex: 9999 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  errorText: { color: 'red', fontWeight: 'bold', marginBottom: 10 },
  typeToggle: { flexDirection: 'row', marginBottom: 15, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#ccc' },
  typeBtn: { flex: 1, padding: 10, alignItems: 'center' },
  activeExpense: { backgroundColor: '#ffcdd2' },
  activeIncome: { backgroundColor: '#c8e6c9' },
  activeText: { fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 },
  formButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  cancelBtn: { flex: 1, padding: 12, alignItems: 'center', backgroundColor: '#eee', borderRadius: 8 },
  saveBtn: { flex: 1, padding: 12, alignItems: 'center', backgroundColor: '#28a745', borderRadius: 8 },
});