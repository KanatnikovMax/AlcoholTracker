import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DRINK_STRENGTH_RU } from '../../constants/DRINK_STRENGTH_RU';
import styles from './DrinkListScreen.styles';

export default function DrinkListScreen({
  fetchFunction,
  navigation,
  isCustom = false,
  emptyText = 'Нет напитков',
  showAddButton = false,
}) {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef(null);

  const loadDrinks = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const data = await fetchFunction();
      setDrinks(data);
    } catch (err) {
      console.error(err);
      setError('Ошибка загрузки напитков');
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => { loadDrinks(); }, [loadDrinks]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDrinks(true);
  }, [loadDrinks]);

  const scrollToTop = () => scrollRef.current?.scrollToOffset({ offset: 0, animated: true });

  const handleScroll = ({ nativeEvent }) => {
    setShowScrollTop(nativeEvent.contentOffset.y > 300);
  };

  const renderDrinkItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.drinkCard}
      onPress={() =>
        navigation.navigate('DrinkDetail', {
          drinkId: item.drinkId,
          isCustom: isCustom,
          isFavorite: item.isFavorite,
        })
      }
    >
      <View style={{ width: '100%' }}>
        {item.isFavorite && (
          <Ionicons
            name="heart"
            size={20}
            color="red"
            style={styles.favoriteIcon}
          />
        )}
        
        <View style={styles.drinkImageWrapper}>
          <Ionicons name="beer" size={40} color="gray" />
        </View>
        
        <Text style={styles.drinkName}>{item.drinkName}</Text>
        <Text style={styles.drinkInfo}>
          {DRINK_STRENGTH_RU[item.type] || item.type} • {item.degree}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#d3ae35" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadDrinks()}>
          <Text style={styles.retryButtonText}>Попробовать снова</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        data={drinks}
        renderItem={renderDrinkItem}
        keyExtractor={(item) => item.drinkId.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#d3ae35']}
            tintColor="#d3ae35"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="sad-outline" size={50} color="gray" />
            <Text style={styles.emptyText}>{emptyText}</Text>
          </View>
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {showAddButton && (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddDrink')}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      )}

      {showScrollTop && (
        <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
          <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}