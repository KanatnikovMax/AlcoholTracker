import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

export const saveUserData = async (token) => {
  try {
    if (!token) throw new Error('Пустой токен');

    const decoded = jwtDecode(token);

    const userData = {
      userId: decoded.userId,
      username: decoded.sub
    };

    await Promise.all([
      SecureStore.setItemAsync('accessToken', token),
      SecureStore.setItemAsync('userInfo', JSON.stringify(userData))
    ]);

    return userData;
  } catch (error) {
    console.error('Ошибка сохранения токена:', error);
    return null;
  }
};


export const getStoredToken = async () => {
  try {
    return await SecureStore.getItemAsync('accessToken');
  } catch (error) {
    console.error('Ошибка получения токена:', error);
    return null;
  }
};

export const getStoredUserData = async () => {
  try {
    const userInfoStr = await SecureStore.getItemAsync('userInfo');
    return userInfoStr ? JSON.parse(userInfoStr) : null;
  } catch (error) {
    console.error('Ошибка получения данных пользователя:', error);
    return null;
  }
};

export const clearUserData = async () => {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync('accessToken'),
      SecureStore.deleteItemAsync('userInfo')
    ]);
    return true;
  } catch (error) {
    console.error('Ошибка очистки данных пользователя:', error);
    return false;
  }
};