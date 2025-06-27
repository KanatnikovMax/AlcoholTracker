import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

// Декодируем токен и извлекаем данные
export const decodeToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');

    console.debug("decodeToken:", token);
    if (!token) return null;
    
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Получаем userID из токена
export const getUserIdFromToken = async () => {
  const decoded = await decodeToken();

  console.debug("getUserIdFromToken:", decoded?.userId);

  return decoded?.userId || null;
};

// Получаем username из токена
export const getUsernameFromToken = async () => {
  const decoded = await decodeToken();
  return decoded?.username || null;
};

// Сохраняем данные пользователя
export const saveUserData = async (token) => {
  try {
    const decoded = jwtDecode(token);
    
    // Преобразуем все значения в строки
    await Promise.all([
      SecureStore.setItemAsync('userId', decoded.userId.toString()),
      SecureStore.setItemAsync('username', String(decoded.username))
    ]);
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};
