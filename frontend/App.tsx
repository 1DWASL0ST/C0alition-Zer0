import React, { useState } from 'react';
import { 
  StatusBar, 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  ActivityIndicator, 
  ScrollView,
  useColorScheme 
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      // Запрос идет на /api/cards. Metro Bundler перехватит его
      // и перенаправит на 10.0.2.2:8080 согласно metro.config.js
      const response = await fetch('/api/cards');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Coalition0 Server</Text>
        <Button title="Загрузить карты" onPress={fetchCards} />
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Загрузка данных...</Text>
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Ошибка: {error}</Text>
        </View>
      )}

      {!loading && !error && data.length > 0 && (
        <ScrollView style={styles.list}>
          {data.map((card) => (
            <View key={card.id || card._id} style={styles.card}>
              <Text style={styles.cardTitle}>{card.name}</Text>
              <Text style={styles.cardSubtitle}>{card.dogtag}</Text>
              <Text style={styles.cardText}>
                Класс: {card.class} | Фракция: {card.faction}
              </Text>
              <Text style={styles.cardText}>
                Атака: {card.stats?.offence} | Защита: {card.stats?.defence}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  list: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2, // Тень для Android
    shadowColor: '#000', // Тень для iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
});

export default App;