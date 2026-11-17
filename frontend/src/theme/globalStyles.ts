import { StyleSheet, Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const BG_WIDTH = SCREEN_WIDTH * 1.3;
export const BG_HEIGHT = SCREEN_HEIGHT * 1.3;

export const globalStyles = StyleSheet.create({
  //MAIN MENU
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
    top: '5%',
    right: '5%',
    fontSize: 42,
    fontFamily: 'GOST_A_Itallic',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  // БЛОК КНОПОК МЕНЮ
  menuContainer: {
    position: 'absolute',
    left: '5%',
    top: '25%',
    gap: 12,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    width: 230,
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 20,
    fontFamily: 'GOST_A',
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
    overflow: 'hidden'
  },
  loginIcon: {
    width: 50,
    height: 50,
  },
});