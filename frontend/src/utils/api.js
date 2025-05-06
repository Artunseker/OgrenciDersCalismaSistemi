import axios from 'axios';

// API temel URL'si
const API_BASE_URL = 'http://localhost:8000/api';

// Axios istemcisini oluştur
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API fonksiyonları
export const api = {
  // Anket sorularını getir
  async getSurveyQuestions() {
    try {
      const response = await apiClient.get('/survey-questions');
      return response.data;
    } catch (error) {
      console.error('Anket soruları alınamadı:', error);
      throw error;
    }
  },

  // Öğrenme stili analizi yap
  async analyzeLearningStyle(studentData) {
    try {
      const response = await apiClient.post('/analyze-learning-style', studentData);
      return response.data;
    } catch (error) {
      console.error('Öğrenme stili analizi yapılamadı:', error);
      throw error;
    }
  },

  // Tüm öğrencileri getir
  async getStudents() {
    try {
      const response = await apiClient.get('/students');
      return response.data;
    } catch (error) {
      console.error('Öğrenciler alınamadı:', error);
      throw error;
    }
  },

  // Belirli bir öğrenciyi getir
  async getStudent(id) {
    try {
      const response = await apiClient.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Öğrenci (ID: ${id}) alınamadı:`, error);
      throw error;
    }
  }
}; 