import React, { useState } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DRINK_STRENGTH_RU } from '../../../../constants/DRINK_STRENGTH_RU';
import { Picker } from '@react-native-picker/picker';
import { createDrink } from '../../../../api/drinksApi';
import styles from './AddDrinkScreen.styles';

export default function AddDrinkScreen({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('LOW_ALCOHOL');
  const [degree, setDegree] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    if (!name || !degree) {
      Alert.alert('Ошибка', 'Пожалуйста, введите название и крепость напитка.');
      return;
    }

    const payload = {
      name,
      type,
      degree: parseFloat(degree),
      info: description,
    };

    try {
      const result = await createDrink(payload);
      console.log('Напиток создан:', result);
      Alert.alert('Успешно', 'Напиток добавлен!');
      //navigation.goBack();
      //navigation.navigate('CustomDrinks', { refresh: true });
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать напиток');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Название напитка</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Введите название"
          placeholderTextColor="#555"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Тип напитка</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            dropdownIconColor="white"
            style={styles.picker}
          >
            {Object.entries(DRINK_STRENGTH_RU).map(([key, label]) => (
              <Picker.Item key={key} label={label} value={key} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Крепость (%)</Text>
        <TextInput
          style={styles.input}
          value={degree}
          onChangeText={setDegree}
          placeholder="Введите крепость"
          placeholderTextColor="#555"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Описание (необязательно)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Дополнительная информация о напитке"
          placeholderTextColor="#555"
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Сохранить напиток</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};