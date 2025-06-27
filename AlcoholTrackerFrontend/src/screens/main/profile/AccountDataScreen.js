import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { updateUserProfile } from '../../../api/profileApi';
import styles from './AccountDataScreen.styles';

const AccountDataScreen = ({ navigation, route }) => {
  const { userData } = route.params || {};

  const [username, setUsername] = useState(userData?.username || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      const body = {
        username,
        email,
        gender: userData?.gender,
        age: userData?.age,
        height: userData?.height,
        weight: userData?.weight
      };

      const updatedProfile = await updateUserProfile(body);
      
      Alert.alert(
        'Успех', 
        'Данные успешно обновлены',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Ошибка', error.message || 'Не удалось сохранить изменения');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Личные данные</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.dataLabel}>Имя</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Введите имя"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.dataLabel}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Введите e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountDataScreen;