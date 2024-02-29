import { apiClient } from './ApiClient';
import { Change } from './responseTypes';

export const getChange = async (id: number) => {
  return await apiClient<Change>(`change/${id}`);
};

export const addChange = async (changeData: Change) => {
  return await apiClient<Change>('change', 'POST', changeData);
};

export const deleteChange = async (id: number) => {
  return await apiClient<void>(`change/${id}`, 'DELETE');
};
