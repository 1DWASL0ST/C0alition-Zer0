import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import Sound from 'react-native-sound';
import { globalStyles as styles, BG_WIDTH, BG_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../theme/globalStyles';
import { loginStyles } from '../theme/loginStyles'; // <-- Импорт стилей

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const clickSound = useRef<Sound | null>(null);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-(BG_WIDTH - SCREEN_WIDTH), { duration: 25000, easing: Easing.inOut(Easing.quad) }),
      -1, true
    );
    translateY.value = withRepeat(
      withTiming(-(BG_HEIGHT - SCREEN_HEIGHT), { duration: 18000, easing: Easing.inOut(Easing.quad) }),
      -1, true
    );

    clickSound.current = new Sound('click', Sound.MAIN_BUNDLE, (error) => {
      if (error) console.log('Ошибка звука клика', error);
    });

    return () => {
      clickSound.current?.release();
    };
  }, []);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  const handleLogin = () => {
    clickSound.current?.play();
    console.log('Отправка логина...');
  };

  return (
    <View style={styles.container}>
      {/* 1. Анимированный фон */}
      <Animated.View style={[styles.background, animatedBackgroundStyle]}>
        <Image
          source={require('../../sprites/backgrounds/background.png')}
          style={{ width: BG_WIDTH, height: BG_HEIGHT }}
          resizeMode="cover"
        />
      </Animated.View>

      {/* 2. Заголовок */}
      <Text style={styles.title}>Coalition Zero</Text>

      {/* 3. Панель логина */}
      <View style={loginStyles.overlay}>
        <View style={loginStyles.panel}>
          <Text style={loginStyles.panelTitle}>Вход</Text>

          <View style={loginStyles.inputGroup}>
            <Text style={loginStyles.label}>Логин</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
            />
          </View>

          <View style={loginStyles.inputGroup}>
            <Text style={loginStyles.label}>Пароль</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
            <Text style={loginStyles.buttonText}>Войти</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Кнопка "Назад" */}
      <TouchableOpacity
        style={loginStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={loginStyles.backText}>← Назад</Text>
      </TouchableOpacity>
    </View>
  );
}