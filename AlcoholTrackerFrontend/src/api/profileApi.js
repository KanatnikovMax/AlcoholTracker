import axios from 'axios';
import { API_URL } from '../config/config';
import { getStoredToken, getStoredUserData } from '../utils/storage';

const getAuthHeaders = async () => {
  const token = await getStoredToken();
  if (!token) throw new Error('Токен не найден');

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const fetchUserProfile = async () => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_URL}/users/${userInfo.userId}/profile`, { headers });

    return response.data;
  } catch (error) {
    console.error('Fetch profile error:', error);
    const message = error.response?.data?.message || 'Ошибка загрузки профиля';
    throw new Error(message);
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.put(`${API_URL}/users/${userInfo.userId}/profile/edit`, profileData, { headers });

    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    const message = error.response?.data?.message || 'Ошибка обновления профиля';
    throw new Error(message);
  }
};
