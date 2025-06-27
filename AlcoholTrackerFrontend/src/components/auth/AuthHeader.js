import { View, Text, Image, StyleSheet } from 'react-native';

const AuthHeader = ({ 
  title = "Добро пожаловать в\u00A0MAGAMED!", 
  subtitle,
  logoSource 
}) => {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={logoSource || require('../../../assets/logo.png')}
        resizeMode='contain'
      />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center',
    marginBottom: 5,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: 'center',
  }
});

export default AuthHeader;