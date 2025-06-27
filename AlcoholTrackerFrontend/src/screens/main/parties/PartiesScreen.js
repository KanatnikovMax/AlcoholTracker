import styles from './PartiesScreen.styles';
import { useState, useEffect, useCallback } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchParties } from '../../../api/partiesApi';
import { getStoredUserData } from '../../../utils/storage';

export default function PartiesScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [parties, setParties] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadParties = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);

      console.log('Fetching user data...');
      const userInfo = await getStoredUserData();
      console.log('User data:', userInfo);

      console.log('Fetching parties data...');
      const data = await fetchParties();
      console.log('Raw parties data:', data);

      if (!Array.isArray(data)) {
        console.error('Received non-array data:', data);
        throw new Error('Некорректный формат данных');
      }

      // Логируем данные перед установкой состояния
      console.log('Filtered parties with needFeedback:', 
        data.filter(p => p.needFeedback).map(p => ({
          id: p.partyId,
          date: p.date,
          needFeedback: p.needFeedback
        }))
      );

      setUserId(userInfo?.userId);
      setParties(data);
    } catch (err) {
      console.error('Load parties error:', err);
      setError(err.message || 'Ошибка загрузки данных');
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      console.log('Screen focused, loading parties...');
      loadParties();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    console.log('Refreshing parties list...');
    setRefreshing(true);
    loadParties(true);
  }, []);

  const renderPartyItem = ({ item }) => {
    console.log(`Rendering party item ${item.partyId}, needFeedback: ${item.needFeedback}`);
    
    const handlePress = async () => {
      try {
        console.log('Navigating to party details:', item.partyId);
        const userInfo = await getStoredUserData();
        const currentUserId = item.userId || userInfo?.userId;
        
        if (!currentUserId) {
          console.error('User ID not found in item or storage');
          throw new Error('Не удалось определить ID пользователя');
        }

        navigation.navigate({
          name: 'PartyDetails',
          params: {
            partyId: item.partyId,
            userId: currentUserId,
            needFeedback: item.needFeedback,
          }
        });
      } catch (err) {
        console.error('Navigation error:', err);
      }
    };

    return (
      <TouchableOpacity 
        style={[
          styles.partyItem,
          item.needFeedback && styles.partyItemNeedsFeedback
        ]} 
        onPress={handlePress}
      >
        <View style={styles.partyItemContent}>
          <View style={styles.partyTextContainer}>
            <Text style={styles.partyDate}>
              {new Date(item.date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            <Text style={styles.partyDescription}>{item.place}</Text>
          </View>
          
          {item.needFeedback && (
            <View style={styles.feedbackBadgeContainer}>
              <View style={styles.feedbackBadge}>
                <Text style={styles.feedbackBadgeText}>Нужен отзыв</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    console.log('Rendering loading state');
    return (
      <View style={[styles.container, styles.centeredContent]}>
        <ActivityIndicator size="large" color="#d3ae35" />
      </View>
    );
  }

  if (error) {
    console.log('Rendering error state:', error);
    return (
      <View style={[styles.container, styles.centeredContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadParties()}>
          <Text style={styles.retryButtonText}>Попробовать снова</Text>
        </TouchableOpacity>
      </View>
    );
  }

  console.log('Rendering parties list, count:', parties.length);
  return (
    <View style={styles.container}>
      {/* Фиксированный заголовок */}
      <View style={styles.fixedHeader}>
        <Text style={styles.historyTitle}>История застолий</Text>
      </View>

      {/* Прокручиваемый список */}
      <FlatList
        style={styles.scrollableList}
        data={parties}
        renderItem={renderPartyItem}
        keyExtractor={(item) => item.partyId.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#d3ae35']}
            tintColor="#d3ae35"
          />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            У вас пока нет сохранённых застолий
          </Text>
        }
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.newPartyButton}
          onPress={() => navigation.navigate('NewParty')}
        >
          <Text style={styles.buttonText}>Создать новое застолье</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}