import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker'; // Для возврата портретного режима

import MenuScreen from './src/screens/MenuScreen';

// --- ВРЕМЕННЫЙ ЭКРАН-ЗАГЛУШКА ---
// Он нужен, чтобы приложение не падало при переходе на несуществующие пока экраны
const PlaceholderScreen = ({ route, navigation }: any) => {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderTitle}>Экран: {route.name}</Text>
      <Text style={styles.placeholderText}>Здесь скоро будет игра/интерфейс</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          // При выходе с экрана возвращаем портретный режим
          Orientation.lockToPortrait();
          navigation.goBack();
        }}
      >
        <Text style={styles.backButtonText}>Вернуться в меню</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // Убираем верхнюю шапку навигации
            animation: 'fade'   // Плавный переход между экранами
          }}
        >
          {/* Главное меню */}
          <Stack.Screen name="Menu" component={MenuScreen} />

          {/* Экраны, на которые ведут кнопки меню (пока заглушки) */}
          <Stack.Screen name="Play" component={PlaceholderScreen} />
          <Stack.Screen name="Friends" component={PlaceholderScreen} />
          <Stack.Screen name="DeckEditor" component={PlaceholderScreen} />
          <Stack.Screen name="Settings" component={PlaceholderScreen} />
          <Stack.Screen name="Login" component={PlaceholderScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Темный фон
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 32,
    color: '#D4AF37',
    fontFamily: 'GOST_A',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'GOST_A',
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'GOST_A',
  }
});