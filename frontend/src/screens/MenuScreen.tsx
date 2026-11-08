import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import Sound from 'react-native-sound';
import Orientation from 'react-native-orientation-locker';
import { globalStyles as styles, BG_HEIGHT, BG_WIDTH, SCREEN_WIDTH, SCREEN_HEIGHT } from '../theme/globalStyles';

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
    Orientation.lockToLandscapeLeft();

    // 2. Запускаем музыку (файл menu.wav в android/app/src/main/res/raw/)
    const music = new Sound('menu', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        return;
      }
      music.setNumberOfLoops(-1); // Зацикливаем
      music.setVolume(0.4);       // Громкость 40% (чтобы не орало)
      music.play();
    });

    return () => {
      Orientation.lockToLandscapeLeft();
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
          <Image
            source={require('../../sprites/buttons/loginButton.png')}
            style={styles.loginIcon}
            resizeMode="contain"
          />
      </TouchableOpacity>

    </View>
  );
}