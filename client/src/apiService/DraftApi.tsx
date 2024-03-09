import template from '../assets/template';
import { apiClient } from './ApiClient';
import { DraftResponse } from '../types/responseTypes';

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

export const updateDraft = async (id: number, draftData: Partial<DraftResponse>, changeId: number) => {
  const body = { content: draftData, changeId: changeId}
  return await apiClient<DraftResponse>(`draft/${id}`, 'PATCH', body);
};

export const deleteDraft = async (id: number) => {
  return await apiClient<void>(`draft/${id}`, 'DELETE');
};
