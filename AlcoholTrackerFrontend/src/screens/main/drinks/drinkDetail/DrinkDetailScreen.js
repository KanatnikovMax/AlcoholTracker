import { View, Text, ScrollView, ActivityIndicator, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { getDrinkDetails, updateDrinkDetails, toggleFavoriteDrink, deleteDrink } from '../../../../api/drinksApi';
import { Picker } from '@react-native-picker/picker';
import { DRINK_STRENGTH_RU } from '../../../../constants/DRINK_STRENGTH_RU';
import styles from './DrinkDetailScreen.styles'; 

export default function DrinkDetailScreen({ route, navigation }) {
  const { drinkId, isCustom, isFavorite: initialIsFavorite } = route.params;

  const [imageUri, setImageUri] = useState(null);

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [type, setType] = useState('LOW_ALCOHOL');
  const [degree, setDegree] = useState('');
  const [info, setInfo] = useState('');

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Нет доступа к галерее', 'Разреши приложению доступ к медиатеке в настройках');
      }
    })();
  }, []);


  useEffect(() => {
    const loadDrink = async () => {
      try {
        setLoading(true);
        const data = await getDrinkDetails(drinkId);
        setDrink(data);
        setName(data.name);
        setType(data.type);
        setDegree(data.degree.toString());
        setInfo(data.info || '');
      } catch (error) {
        console.error('Ошибка загрузки напитка:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDrink();
  }, [drinkId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.RequestedMediaTypes.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true // если хочешь сразу получить base64
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      result.assets[0].base64
    }
  };

  const handleSave = async () => {
    if (!name || !degree) {
      Alert.alert('Ошибка', 'Пожалуйста, введите название и крепость.');
      return;
    }

    const updatedData = {
      name,
      type,
      degree: parseFloat(degree),
      info,
    };

    try {
      await updateDrinkDetails(drinkId, updatedData);
      Alert.alert('Успешно', 'Напиток обновлён!');
      navigation.navigate('DrinksMain', { refresh: true });
    } catch (error) {
      console.error('Ошибка при обновлении напитка:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить изменения');
    }
  };

  const handleFavoritePress = async () => {
    try {
      await toggleFavoriteDrink(drinkId); 
      setIsFavorite((prev) => !prev);     
    } catch (error) {
      console.error('Ошибка при переключении избранного:', error);
      Alert.alert('Ошибка', 'Не удалось обновить избранное');
    }
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Удаление напитка',
      'Вы уверены, что хотите удалить этот напиток?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDrink(drinkId);
              Alert.alert('Успешно', 'Напиток удалён');
              navigation.navigate('DrinksMain', { refresh: true });
            } catch (error) {
              console.error('Ошибка при удалении напитка:', error);
              Alert.alert('Ошибка', 'Не удалось удалить напиток');
            }
          },
        },
      ]
    );
  };

  if (loading || !drink) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#d3ae35" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {isCustom && (
        <TouchableOpacity 
          style={styles.trashButton} 
          onPress={handleDeletePress}
        >
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={handleFavoritePress}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? "red" : "white"} 
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={isCustom ? pickImage : undefined} style={styles.imagePlaceholder}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 8 }} />
          ) : (
            <Ionicons name="beer" size={80} color="gray" />
          )}
        </TouchableOpacity>

        <Text style={styles.title}>{drink.name}</Text>

        {!isCustom && (
          <Text style={styles.subtitle}>
            {DRINK_STRENGTH_RU[drink.type] || drink.type} • {drink.degree}%
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Информация</Text>

        <Text style={styles.infoLabel}>Название</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={isCustom}
        />

        <View style={styles.formGroup}>
          <Text style={styles.infoLabel}>Тип напитка</Text>
          {isCustom ? (
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
          ) : (
            <Text style={styles.input}>
              {DRINK_STRENGTH_RU[type] || type}
            </Text>
          )}
        </View>

        <Text style={styles.infoLabel}>Крепость (%)</Text>
        <TextInput
          style={styles.input}
          value={degree}
          onChangeText={setDegree}
          keyboardType="numeric"
          editable={isCustom}
        />

        <Text style={styles.infoLabel}>Описание</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={info}
          onChangeText={setInfo}
          multiline
          editable={isCustom}
        />

        {isCustom && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Сохранить</Text>
          </TouchableOpacity>
        )}

      </View>
    </ScrollView>
  );
};
