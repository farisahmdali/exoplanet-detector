// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  MODELS: `${API_BASE_URL}/models`,
  PREDICT: `${API_BASE_URL}/predict`,
  TRAIN: `${API_BASE_URL}/train`,
  UPLOAD: `${API_BASE_URL}/upload`,
  PROCESS_CSV: `${API_BASE_URL}/predict/process-csv`,
};

export default API_BASE_URL;

