import { useState, useEffect, useContext } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserProfile } from '../../../api/profileApi';
import styles from './ProfileScreen.styles';
import { AuthContext } from '../../../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchUserProfile();
      console.log('Received user data:', data);
      setUserData(data);
      setUsername(data.username);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      setError(null);
      
      // Вызываем чистый логаут без API
      await logout();
      
    } catch (error) {
      console.error('Logout error:', error);
      setError('Произошла ошибка при выходе');
    } finally {
      setLogoutLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadUserProfile();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Ошибка: {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={loadUserProfile}
        >
          <Text style={styles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>
            Привет, {userData?.name || username || 'Пользователь'}
          </Text>
          {username && <Text style={styles.username}></Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Аккаунт</Text>
          <ProfileItem 
            icon="person" 
            title="Данные аккаунта" 
            onPress={() => navigation.navigate('AccountDataScreen', { userData })}
          />
          <ProfileItem 
            icon="settings" 
            title="Параметры" 
            onPress={() => navigation.navigate('ParametersScreen', { userData })}
          />
        </View>

        <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
        disabled={logoutLoading}
      >
        {logoutLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </View>
  );
};

const ProfileItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={24} color="#666" style={styles.icon} />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

export default ProfileScreen;