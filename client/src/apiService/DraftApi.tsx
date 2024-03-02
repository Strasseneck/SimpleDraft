import { apiClient } from './ApiClient';
import { DraftResponse } from './responseTypes';

export const getDraft = async (id: number) => {
  return await apiClient<DraftResponse>(`draft/${id}`);
};

export const addDraft = async (draftData: DraftResponse) => {
    return await apiClient<DraftResponse>('draft', 'POST', draftData);
};

export const updateDraft = async (id: number, draftData: Partial<DraftResponse>) => {
  return await apiClient<DraftResponse>(`draft/${id}`, 'PATCH', draftData);
};

export const deleteDraft = async (id: number) => {
  return await apiClient<void>(`draft/${id}`, 'DELETE');
};
