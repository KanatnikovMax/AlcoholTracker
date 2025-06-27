import { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import AuthHeader from '../../../components/auth/AuthHeader';
import Button from '../../../components/common/Button';
import TextInput from '../../../components/common/TextInput';
import { validateRegisterForm } from '../../../utils/validators';
import { AuthContext } from '../../../context/AuthContext';
import styles from './RegisterScreen.styles';

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    general: ''
  });

  const handleRegister = async () => {
    setLoading(true);
    
    const { isValid, errors: validationErrors } = validateRegisterForm(username, email, password);
    
    if (!isValid) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const success = await register(username, email, password);

      if (!success) {
        setErrors(prev => ({ ...prev, general: 'Ошибка регистрации' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, general: error.message || 'Ошибка регистрации' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AuthHeader 
          subtitle="Создайте свой аккаунт"
        />

        <View style={styles.form}>
          <View style={styles.formInputs}>
            <TextInput
              label="Имя пользователя"
              placeholder="Buharik228"
              value={username}
              onChangeText={text => {
                setUsername(text);
                setErrors(prev => ({ ...prev, username: '' }));
              }}
              error={errors.username}
            />
            
            <TextInput
              label="Электронная почта"
              placeholder="beer_lover@gmail.com"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setErrors(prev => ({ ...prev, email: '' }));
              }}
              keyboardType="email-address"
              error={errors.email}
            />
            
            <TextInput
              label="Пароль"
              placeholder="**************"
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrors(prev => ({ ...prev, password: '' }));
              }}
              secureTextEntry
              error={errors.password}
            />
          </View>
          
          {errors.general ? (
            <Text style={styles.errorText}>
              {errors.general}
            </Text>
          ) : null}
          
          <Button 
            title="Зарегистрироваться"
            onPress={handleRegister}
            isLoading={loading}
            disabled={loading}
          />
        </View>
        
        <View style={styles.haveAccount}>
          <Text style={styles.haveAccountText}>Уже есть аккаунт?</Text>
          <Button 
            title="Войти"
            variant="text"
            onPress={() => navigation.navigate('Login')}
            textStyle={styles.loginButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;