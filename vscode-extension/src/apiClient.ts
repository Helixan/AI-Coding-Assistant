import axios from 'axios';
import { HistoryItem } from './types';

const API_URL = 'http://127.0.0.1:8000';

export async function requestCodeGeneration(prompt: string): Promise<string> {
    const response = await axios.post(`${API_URL}/generate-code`, { prompt });
    return response.data.generated_code;
}

export async function requestCodeExplanation(code: string): Promise<string> {
    const response = await axios.post(`${API_URL}/explain-code`, { code });
    return response.data.explanation;
}

export async function fetchHistory(): Promise<HistoryItem[]> {
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
}
