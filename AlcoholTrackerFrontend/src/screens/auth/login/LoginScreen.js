import { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import AuthHeader from '../../../components/auth/AuthHeader';
import Button from '../../../components/common/Button';
import TextInput from '../../../components/common/TextInput';
import { validateLoginForm } from '../../../utils/validators';
import { AuthContext } from '../../../context/AuthContext';
import styles from './LoginScreen.styles';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const handleLogin = async () => {
    setLoading(true);
    
    // Валидация формы перед отправкой
    const { isValid, errors: validationErrors } = validateLoginForm(email, password);
    
    if (!isValid) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      
      if (!success) {
        setErrors(prev => ({ ...prev, general: 'Неверная почта или пароль' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, general: error.message || 'Ошибка входа' }));
    } finally {
      setLoading(false);
    }
  };

  // Очистка ошибок при изменении полей
  const handleEmailChange = (text) => {
    setEmail(text);
    setErrors(prev => ({ ...prev, email: '' }));
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setErrors(prev => ({ ...prev, password: '' }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AuthHeader 
          subtitle="Войдите в свой аккаунт"
        />

        <View style={styles.form}>
          <View style={styles.formInputs}>
            <TextInput
              label="Электронная почта"
              placeholder="beer_lover@gmail.com"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              error={errors.email}
              autoCapitalize="none"
            />
            
            <TextInput
              label="Пароль"
              placeholder="**************"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              error={errors.password}
              autoCapitalize="none"
            />
          </View>
          
          {errors.general ? (
            <Text style={styles.errorText}>
              {errors.general}
            </Text>
          ) : null}
          
          <Button 
            title="Войти" 
            onPress={handleLogin} 
            isLoading={loading}
            disabled={loading}
          />
        </View>
        
        <View style={styles.newUser}>
          <Text style={styles.newUserText}>Новый пользователь?</Text>
          <Button 
            title="Зарегистрироваться"
            onPress={() => navigation.navigate('Register')}
            variant="text"
            textColor="#d4af37"
            textStyle={styles.registerButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;