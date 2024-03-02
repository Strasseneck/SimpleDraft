import { apiClient } from './ApiClient';
import { ChangeResponse } from './responseTypes';
import ChangeType from '../types/ChangeType';

export const getChange = async (id: number) => {
  return await apiClient<ChangeResponse>(`change/${id}`);
};

export const addChange = async (changeData: ChangeType) => {
  return await apiClient<ChangeResponse>('change', 'POST', changeData);
};

export const deleteChange = async (id: number) => {
  return await apiClient<void>(`change/${id}`, 'DELETE');
};
