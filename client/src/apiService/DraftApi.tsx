import template from '../assets/template';
import { apiClient } from './ApiClient';
import { DraftResponse } from './responseTypes';

export const getAllDrafts = async () => {
  return await apiClient<DraftResponse[]>(`draft/all`);
};

export const getDraft = async (id: number) => {
  return await apiClient<DraftResponse>(`draft/${id}`);
};

export const addDraft = async (title: string) => {
  const draft = {
    "title": title,
    "content": template,
    "UserId": 1,
  }
    return await apiClient<DraftResponse>('draft', 'POST', draft);
};

export const updateDraft = async (id: number, draftData: Partial<DraftResponse>) => {
  return await apiClient<DraftResponse>(`draft/${id}`, 'PATCH', draftData);
};

export const deleteDraft = async (id: number) => {
  return await apiClient<void>(`draft/${id}`, 'DELETE');
};
