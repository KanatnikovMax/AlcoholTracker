import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { updateUserProfile } from '../../../api/profileApi';
import styles from './ParametersScreen.styles';

const ParametersScreen = ({ navigation, route }) => {
  // Получаем данные профиля из параметров навигации
  const { userData } = route.params || {};
  
  // Инициализируем состояния
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getGenderBackground = (value) => {
    if (gender === value) {
      return {
        backgroundColor: value === 'female' ? '#d3ae35' : '#4CAF50'
      };
    }
    return {};
  };

  // Заполняем данные при получении userData
  useEffect(() => {
    if (userData) {
      setGender(userData.gender === 'MALE' ? 'male' : 'female');
      setAge(userData.age ? String(userData.age) : '');
      setHeight(userData.height ? String(userData.height) : '');
      setWeight(userData.weight ? String(userData.weight) : '');
    }
  }, [userData]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      const body = {
        gender: gender === 'male' ? 'MALE' : 'FEMALE',
        age: age ? parseInt(age) : null,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseFloat(weight) : null,
        // Добавляем email и username, если они требуются на бэкенде
        email: userData?.email,
        username: userData?.username
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
          <Text style={styles.sectionTitle}>Параметры</Text>

          {/* Пол */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Пол</Text>
            <View style={styles.genderToggleContainer}>
            <TouchableOpacity
              style={[styles.genderOption, getGenderBackground('female')]}
              onPress={() => setGender('female')}
            >
              <Text style={[
                styles.genderText,
                gender === 'female' && styles.genderTextSelected
              ]}>
                Ж
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderOption, getGenderBackground('male')]}
              onPress={() => setGender('male')}
            >
              <Text style={[
                styles.genderText,
                gender === 'male' && styles.genderTextSelected  // <-- здесь была ошибка
              ]}>
                М
              </Text>
            </TouchableOpacity>
          </View>

          </View>

          {/* Возраст */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Возраст</Text>
            <TextInput
              style={styles.input}
              placeholder="Возраст"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>

          {/* Рост */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Рост (см)</Text>
            <TextInput
              style={styles.input}
              placeholder="Рост"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>

          {/* Вес */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Вес (кг)</Text>
            <TextInput
              style={styles.input}
              placeholder="Вес"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ParametersScreen;