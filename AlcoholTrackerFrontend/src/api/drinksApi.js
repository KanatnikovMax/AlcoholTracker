import axios from 'axios';
import { getStoredToken, getStoredUserData } from '../utils/storage';
import { API_URL } from '../config/config';

const getAuthHeaders = async () => {
  const token = await getStoredToken();

  if (!token) throw new Error('Token not found');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const fetchBasicDrinks = async () => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_URL}/drink/${userInfo.userId}/basic`, { headers });
    return response.data;
  } catch (error) {
    console.error('Fetch basic drinks error:', error);
    throw error;
  }
};

export const fetchUserDrinks = async () => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_URL}/drink/${userInfo.userId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Fetch user drinks error:', error);
    throw error;
  }
};

export const getDrinkDetails = async (drinkId) => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_URL}/drink/${userInfo.userId}/details/${drinkId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Get drink details error:', error);
    throw error;
  }
};

export const createDrink = async (data) => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.post(`${API_URL}/drink/${userInfo.userId}/add`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Create drink error:', error);
    throw error;
  }
};

// Обновление информации о напитке
export const updateDrinkDetails = async (drinkId, data) => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.put(`${API_URL}/drink/${userInfo.userId}/edit/${drinkId}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Update drink details error:', error);
    throw error;
  }
};

export const toggleFavoriteDrink = async (drinkId) => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.put(`${API_URL}/drink/${userInfo.userId}/edit/favorite/${drinkId}`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error('Toggle favorite drink error:', error);
    throw error;
  }
};


export const deleteDrink = async (drinkId) => {
  try {
    const headers = await getAuthHeaders();
    
    const response = await axios.delete(`${API_URL}/drink/${drinkId}`, {
      headers,
    });
  } catch (error) {
    console.error('Ошибка при удалении напитка:', error);
    throw error;
  }
};
