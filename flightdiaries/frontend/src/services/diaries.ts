import axios from 'axios';
import type { diaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAll = async (): Promise<diaryEntry[]> => {
  const response = await axios.get<diaryEntry[]>(baseUrl);
  return response.data;
};

export default {
  getAll,
};