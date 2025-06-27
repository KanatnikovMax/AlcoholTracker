import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  // Новые пропсы для кастомизации
  backgroundColor,
  textColor,
  customStyle,
  textStyle
}) => {
  const variantStyles = {
    primary: {
      button: { backgroundColor: '#d4af37' },
      text: { color: '#1a1a1a' }
    },
    secondary: {
      button: { 
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#d4af37'
      },
      text: { color: '#d4af37' }
    },
    text: {
      button: { backgroundColor: 'transparent' },
      text: { color: '#d4af37' }
    }
  };

  const buttonStyle = [
    styles.baseButton,
    variantStyles[variant].button,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    backgroundColor && { backgroundColor },
    customStyle
  ];

  const textStyleCombined = [
    styles.baseText,
    variantStyles[variant].text,
    textColor && { color: textColor },
    textStyle
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textStyleCombined.color || '#fff'} />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  baseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;