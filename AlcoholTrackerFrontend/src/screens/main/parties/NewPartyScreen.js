import { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './NewPartyScreen.styles';

export default function NewPartyScreen({ navigation, route }) {
  const [request, setRequest] = useState({
    hungerLevel: 'NORMAL', // hungry, normal, full
    desiredPromille: 0.5
  });

  const handleInputChange = (field, value) => {
    setRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    navigation.navigate('CalculationResult', { request });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Расчёт алкоголя</Text>

      <View style={styles.userDataContainer}>
        <Text style={[styles.sectionTitle, styles.centeredText]}>
          Убедитесь в актуальности ваших параметров!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Уровень сытости</Text>
        <View style={styles.hungerLevelContainer}>
          {['HUNGRY', 'NORMAL', 'FULL'].map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.hungerLevelButton,
                request.hungerLevel === level && styles.hungerLevelButtonSelected
              ]}
              onPress={() => handleInputChange('hungerLevel', level)}
            >
              <Text
                style={[
                  styles.hungerLevelText,
                  request.hungerLevel === level && styles.hungerLevelTextSelected
                ]}
              >
                {level === 'HUNGRY' ? 'Голоден' : level === 'NORMAL' ? 'Поесть бы' : 'Сыт'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Желаемый уровень промилле</Text>
        <View style={styles.promilleContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0.5}
            maximumValue={3.0}
            step={0.1}
            value={request.desiredPromille}
            minimumTrackTintColor="#d3ae35"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#d3ae35"
            onValueChange={value =>
              handleInputChange('desiredPromille', parseFloat(value.toFixed(1)))
            }
          />
          <Text style={styles.selectedPromilleText}>
            Выбрано: {request.desiredPromille.toFixed(1)}‰
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.calculateButton} onPress={handleContinue}>
        <Text style={styles.calculateButtonText}>Далее</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
