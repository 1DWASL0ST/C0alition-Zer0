import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: '5%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    width: width * 0.6,
    backgroundColor: 'rgba(180, 180, 180, 0.85)',
    padding: 20,
  },
  panelTitle: {
    fontSize: 22,
    color: '#000',
    fontFamily: 'GOST_A',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
    fontFamily: 'GOST_A',
  },
  input: {
    backgroundColor: '#555',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: 'GOST_A_Itallic',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#555',
    paddingVertical: 10,
    alignItems: 'center',
    width: '66%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'GOST_A',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'GOST_A',
  },
});