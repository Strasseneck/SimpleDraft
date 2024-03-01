import { apiClient } from './ApiClient';
import { Draft } from './responseTypes';

export const getDraft = async (id: number) => {
  return await apiClient<Draft>(`draft/${id}`);
};

export const addDraft = async (draftData: Draft) => {
    return await apiClient<Draft>('draft', 'POST', draftData);
};

export const updateDraft = async (id: number, draftData: Partial<Draft>) => {
  return await apiClient<Draft>(`draft/${id}`, 'PATCH', draftData);
};

export const deleteDraft = async (id: number) => {
  return await apiClient<void>(`draft/${id}`, 'DELETE');
};
