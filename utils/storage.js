import {AsyncStorage} from 'react-native';

const LOCAL_STORAGE_PREFIX = 'outsight';

export const getItem = key => AsyncStorage.getItem(`${LOCAL_STORAGE_PREFIX}.${key}`);

export const setItem = (key, value) => AsyncStorage.setItem(`${LOCAL_STORAGE_PREFIX}.${key}`, value);

export const removeItem = key => AsyncStorage.removeItem(`${LOCAL_STORAGE_PREFIX}.${key}`);

export const removeAllItems = () => AsyncStorage.clear();

export const getJson = (key) => {
  const value = getItem(key);
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const setJson = (key, value) => setItem(key, JSON.stringify(value));
