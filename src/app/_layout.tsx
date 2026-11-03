import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Dashboard', 
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text> 
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{ 
          title: 'History', 
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📜</Text> 
        }} 
      />
      <Tabs.Screen 
        name="budgets" 
        options={{ 
          title: 'Budgets', 
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>💰</Text> 
        }} 
      />
    </Tabs>
  );
}