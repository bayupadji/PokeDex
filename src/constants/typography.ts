import type { TextStyle } from 'react-native';

export const fontFamily = {
  poppins: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    light: 'Poppins-Light',
  },
};

export const typography = {
  h1: {
    fontFamily: fontFamily.poppins.bold,
    fontSize: 32,
    lineHeight: 40,
  } as TextStyle,
  h2: {
    fontFamily: fontFamily.poppins.bold,
    fontSize: 24,
    lineHeight: 32,
  } as TextStyle,
  h3: {
    fontFamily: fontFamily.poppins.semiBold,
    fontSize: 20,
    lineHeight: 28,
  } as TextStyle,
  h4: {
    fontFamily: fontFamily.poppins.semiBold,
    fontSize: 18,
    lineHeight: 24,
  } as TextStyle,
  h5: {
    fontFamily: fontFamily.poppins.medium,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  body1: {
    fontFamily: fontFamily.poppins.regular,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  body2: {
    fontFamily: fontFamily.poppins.regular,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  subtitle1: {
    fontFamily: fontFamily.poppins.medium,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  subtitle2: {
    fontFamily: fontFamily.poppins.medium,
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,
  caption: {
    fontFamily: fontFamily.poppins.regular,
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,
  button: {
    fontFamily: fontFamily.poppins.semiBold,
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
};

export default typography;
