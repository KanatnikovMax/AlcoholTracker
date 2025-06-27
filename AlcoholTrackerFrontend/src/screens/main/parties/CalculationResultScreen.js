import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { calculateParty, saveParty } from '../../../api/partiesApi';
import styles from './CalculationResultScreen.styles';

export default function CalculationResultScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [place, setPlace] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  // Параметры из предыдущего экрана
  const { hungerLevel, desiredPromille } = route.params.request;

  // Загрузка данных при монтировании
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const calculationData = await calculateParty({
          desiredPromille: parseFloat(desiredPromille),
          satiety: hungerLevel
        });
        setUserInfo(calculationData.userInfo);
        
        setData(calculationData);
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSelectOption = (index) => {
    setSelectedOption(index);
  };

  const handleSaveParty = async () => {
    if (!data || selectedOption === null) {
      alert('Заполните все поля и выберите вариант');
      return;
    }

    const selectedVariant = data.calculation.variants[selectedOption];

    const selectedDrinks = selectedVariant.drinks.map(drink => ({
      alcoholId: drink.alcoholId, 
      volume: drink.ml
    }));

    console.log(selectedDrinks);

    try {
      await saveParty({
        place,
        satiety: hungerLevel,
        desiredPromille: parseFloat(desiredPromille),
        selectedDrinks: selectedDrinks,
        calculationResponse: data.calculation // если оно нужно
      });

      Alert.alert('Застолье успешно сохранено!');
      navigation.navigate('PartiesMain');
    } catch (err) {
      Alert.alert('Ошибка при сохранении: ' + (err.message || 'Попробуйте позже'));
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!data || !userInfo) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Результаты расчёта</Text>

        {/* Поля для ввода */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Место проведения:</Text>
          <TextInput
            style={styles.input}
            value={place}
            onChangeText={setPlace}
            placeholder="Введите место"
          />
        </View>

        {/* Информация о пользователе */}
        <View style={styles.userInfo}>
          <Text style={styles.sectionTitle}>Ваши параметры:</Text>
          <Text style={styles.infoText}>Пол: {userInfo.gender === 'MALE' ? 'Мужской' : 'Женский'}</Text>
          <Text style={styles.infoText}>Возраст: {userInfo.age}</Text>
          <Text style={styles.infoText}>Рост: {userInfo.height} см</Text>
          <Text style={styles.infoText}>Вес: {userInfo.weight} кг</Text>
        </View>

        {/* Параметры вечеринки */}
        <View style={styles.partyInfo}>
          <Text style={styles.sectionTitle}>Параметры застолья:</Text>
          <Text style={styles.infoText}>Сытость: {hungerLevel === 'FULL' ? 'Сыт' : hungerLevel === 'NORMAL' ? 'Нормально' : 'Голоден'}</Text>
          <Text style={styles.infoText}>Желаемый уровень: {desiredPromille}‰</Text>
        </View>

        {/* Результаты расчета */}
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>Доступные варианты:</Text>
          <Text style={styles.alcoholAmount}>
            Всего алкоголя: {data.calculation.pureAlcoholGrams.toFixed(1)} г
          </Text>
          
          {data.calculation.variants.map((variant, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.variantCard,
                selectedOption === index && styles.selectedVariantCard
              ]}
              onPress={() => handleSelectOption(index)}
            >
              <Text style={styles.variantTitle}>Вариант {index + 1}</Text>
              {variant.drinks.map((drink, drinkIndex) => (
                <View key={drinkIndex} style={styles.drinkItem}>
                  <Text style={styles.drinkName}>{drink.name}</Text>
                  <Text style={styles.drinkAmount}>{drink.ml.toFixed(1)} мл</Text>
                </View>
              ))}
              {selectedOption === index && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.selectedIndicatorText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Кнопка сохранения */}
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSaveParty}
      >
        <Text style={styles.saveButtonText}>
          Сохранить застолье
        </Text>
      </TouchableOpacity>
    </View>
  );
}