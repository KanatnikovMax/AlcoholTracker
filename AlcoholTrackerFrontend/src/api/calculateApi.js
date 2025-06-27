import axios from 'axios';
import { API_URL } from '../config/config';
import { getStoredToken } from '../utils/storage';

const getAuthHeaders = async () => {
  const token = await getStoredToken();
  if (!token) throw new Error('Token not found');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const calculateAlcoholRequest = async (data) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.post(`${API_URL}/alcohol/calculate`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Alcohol calculation error:', error.response?.data || error.message);
    throw error;
  }
};