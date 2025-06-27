import axios from 'axios';
import { API_URL } from '../config/config';
import { getStoredToken, getStoredUserData } from '../utils/storage';

const getAuthHeaders = async () => {
  const token = await getStoredToken();
  if (!token) throw new Error('Token not found');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const fetchParties = async () => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_URL}/parties/${userInfo.userId}`, { headers });

    return response.data;
  } catch (error) {
    console.error('Fetch parties error:', error);
    throw error;
  }
};

export const fetchPartyDetails = async (userId, partyId) => {
  try {
    if (!userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_URL}/parties/${userId}/${partyId}`, { headers });

    return response.data;
  } catch (error) {
    console.error('Fetch party details error:', error);
    throw error;
  }
};

export const saveParty = async (partyData) => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const response = await axios.post(`${API_URL}/parties/${userInfo.userId}/save`, partyData, { headers });

    return response.data;
  } catch (error) {
    console.error('Create party error:', error);
    throw error;
  }
};


export const calculateParty = async (requestData) => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const headers = await getAuthHeaders();
    const data = {
      userId: userInfo.userId,
      ...requestData
    };

    const response = await axios.post(`${API_URL}/parties/preview`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Calculate party error:', error);
    throw error;
  }
};

export const sendFeedback = async (feedbackEnum, partyId) => {
  try {
    const userInfo = await getStoredUserData();
    if (!userInfo?.userId) throw new Error('User ID not found');

    const token = await getStoredToken();
    if (!token) throw new Error('Token not found');

    const headers = await getAuthHeaders();

    const data = {
      userId: userInfo.userId,
      partyId,
      feedback: feedbackEnum,
    };

    console.log('Sending feedback payload:', data);
    
    await axios.post(`${API_URL}/parties/feedback`, data, { headers });
  } catch (error) {
    console.error('Send feedback error:', error);
    throw error;
  }
};