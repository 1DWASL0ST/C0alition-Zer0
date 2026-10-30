import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import Sound from 'react-native-sound';
import Orientation from 'react-native-orientation-locker';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Размеры фона (чуть больше экрана, чтобы было куда двигаться)
const BG_WIDTH = SCREEN_WIDTH * 1.3;
const BG_HEIGHT = SCREEN_HEIGHT * 1.3;

const MENU_ITEMS = [
  { id: '1', title: 'Играть', route: 'Play' },
  { id: '2', title: 'Друзья', route: 'Friends' },
  { id: '3', title: 'Редактор Колод', route: 'DeckEditor' },
  { id: '4', title: 'Настройки', route: 'Settings' },
];

export default function MenuScreen({ navigation }: any) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    // 1. Поворачиваем экран
    Orientation.lockToLandscapeRight();

    // 2. Запускаем музыку (файл menu.wav в android/app/src/main/res/raw/)
    const music = new Sound('menu', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('❌ Ошибка загрузки музыки:', error);
        return;
      }
      console.log('✅ Музыка menu.wav успешно загружена!');
      music.setNumberOfLoops(-1); // Зацикливаем
      music.setVolume(0.4);       // Громкость 40% (чтобы не орало)
      music.play();
    });

    return () => {
      Orientation.unlockAllOrientations();
      music.stop();
      music.release();
    };
  }, []);

  // 3. Анимация фона (эффект DVD)
  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-(BG_WIDTH - SCREEN_WIDTH), { duration: 25000, easing: Easing.inOut(Easing.quad) }),
      -1, true
    );
    translateY.value = withRepeat(
      withTiming(-(BG_HEIGHT - SCREEN_HEIGHT), { duration: 18000, easing: Easing.inOut(Easing.quad) }),
      -1, true
    );
  }, []);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>

      {/* --- 1. АНИМИРОВАННЫЙ ФОН (PNG) --- */}
      <Animated.View style={[styles.background, animatedBackgroundStyle]}>
        <Image
           source={require('../../sprites/backgrounds/background.png')}
           style={{ width: BG_WIDTH, height: BG_HEIGHT }}
           resizeMode="cover"
        />
      </Animated.View>

      {/* --- 2. ЗАГОЛОВОК --- */}
      <Text style={styles.title}>Coalition Zero</Text>

      {/* --- 3. МЕНЮ (Слева) --- */}
      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuButton}
            onPress={() => navigation.navigate(item.route)}
            activeOpacity={0.8}
          >
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- 4. КНОПКА ЛОГИНА (Правый нижний угол) --- */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.7}
      >
        <Text style={styles.loginIcon}>→</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    width: BG_WIDTH,
    height: BG_HEIGHT,
  },

  // ЗАГОЛОВОК
  title: {
    position: 'absolute',
    top: '10%',
    right: '5%',
    fontSize: 42,
    fontFamily: 'GOST_A_Itallic', // Наклонный шрифт
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  // БЛОК КНОПОК МЕНЮ
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: '25%',
    gap: 12,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // 75% непрозрачности
    width: 230,          // Фиксированная ширина
    height: 55,          // Фиксированная высота
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  menuText: {
    fontSize: 20,
    fontFamily: 'GOST_A', // Прямой шрифт
    color: '#000000',
  },

  // КНОПКА ЛОГИНА
  loginButton: {
    position: 'absolute',
    right: '5%',
    bottom: '8%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  loginIcon: {
    fontSize: 32,
    fontFamily: 'GOST_A',
    color: '#000',
    fontWeight: 'bold',
  },
});