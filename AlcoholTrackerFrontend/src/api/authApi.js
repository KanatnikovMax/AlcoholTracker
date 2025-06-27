import {API_URL} from '../config/config';
import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: email.trim(),
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { accessToken } = response.data;
    if (!accessToken) {
      return { success: false, error: 'Токен не получен' };
    }

    return { success: true, token: accessToken };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || 'Ошибка входа'
    };
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username: username.trim(),
      email: email.trim(),
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const { accessToken } = response.data;
    if (!accessToken) {
      return { success: false, error: 'Токен не получен' };
    }

    return { success: true, token: accessToken };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || 'Ошибка регистрации'
    };
  }
};