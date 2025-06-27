import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styles from './PartyDetailsScreen.styles';
import { fetchPartyDetails, sendFeedback  } from '../../../api/partiesApi';

export const FEEDBACK_OPTIONS = [
  'Мало',
  'В самый раз',
  'Много',
  'Слишком мало',
  'Слишком много',
];

export const FEEDBACK_TO_ENUM = {
  'Мало': 'LITTLE',
  'В самый раз': 'NORMAL',
  'Много': 'A_LOT',
  'Слишком мало': 'TOO_LITTLE',
  'Слишком много': 'TOO_MUCH',
};

const SATIETY_TRANSLATIONS = {
  HUNGRY: 'Голоден',
  NORMAL: 'Нормально',
  FULL: 'Сыт',
};

export default function PartyDetailsScreen({ route }) {
  const { partyId, userId, needFeedback } = route.params;

  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const loadPartyDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPartyDetails(userId, partyId);
        setParty(data);
      } catch (err) {
        console.error('Ошибка загрузки деталей вечеринки:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    loadPartyDetails();
  }, [partyId, userId]);

  const handleSendFeedback = async () => {
    if (!selectedFeedback) {
      Alert.alert('Выберите фидбэк', 'Пожалуйста, выберите один из вариантов.');
      return;
    }

    const feedbackEnum = FEEDBACK_TO_ENUM[selectedFeedback];
    if (!feedbackEnum) {
      Alert.alert('Ошибка', 'Некорректный фидбэк.');
      return;
    }

    try {
      await sendFeedback(feedbackEnum, partyId);
      Alert.alert('Спасибо!', 'Ваш фидбэк отправлен.');
      setFeedbackSent(true);
    } catch (error) {
      console.log('Feedback error (UI):', error);
      Alert.alert('Ошибка', 'Не удалось отправить фидбэк. Попробуйте позже.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centeredContent]}>
        <ActivityIndicator size="large" color="#d3ae35" />
      </View>
    );
  }

  if (error || !party) {
    return (
      <View style={[styles.container, styles.centeredContent]}>
        <Text style={styles.errorText}>
          {error || 'Нет данных о вечеринке'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {needFeedback && !feedbackSent && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>Как вам зашло?</Text>
          <View style={styles.feedbackOptionsContainer}>
            {FEEDBACK_OPTIONS.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.feedbackOption,
                  selectedFeedback === option && styles.feedbackOptionSelected
                ]}
                onPress={() => setSelectedFeedback(option)}
              >
                <Text
                  style={[
                    styles.feedbackOptionText,
                    selectedFeedback === option && styles.feedbackOptionTextSelected
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.feedbackSubmitButton} onPress={handleSendFeedback}>
            <Text style={styles.feedbackSubmitButtonText}>ОТПРАВИТЬ</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.topContainer}>
        <Text style={styles.title}>Детали вечеринки</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Дата:</Text>
          <Text style={styles.value}>
            {new Date(party.date).toLocaleString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Место:</Text>
          <Text style={styles.value}>{party.place}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Сытость:</Text>
          <Text style={styles.value}>
            {SATIETY_TRANSLATIONS[party.satiety] || 'Неизвестно'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Желаемый промилле:</Text>
          <Text style={styles.value}>
            {party.desiredPromille?.toFixed(2) ?? '—'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Напитки:</Text>
        </View>

        {party.drinks && party.drinks.length > 0 ? (
          party.drinks.map((drink, index) => (
            <View key={index} style={styles.drinkItem}>
              <Text style={styles.drinkName}>
                {drink.name} — {drink.volume} мл, {drink.degree}% алкоголя
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.value}>Нет данных о напитках</Text>
        )}

      </View>
    </View>
  );
}
