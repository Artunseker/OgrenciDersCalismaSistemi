import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage'dan analiz sonuçlarını al
    const savedResult = localStorage.getItem('analysisResult');
    
    if (!savedResult) {
      // Sonuç yoksa anket sayfasına yönlendir
      navigate('/survey');
      return;
    }
    
    try {
      const parsedResult = JSON.parse(savedResult);
      setResult(parsedResult);
    } catch (error) {
      console.error('Sonuç verisi parse edilemedi:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="container-custom flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-lg">Sonuçlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container-custom max-w-4xl">
        <div className="card text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Sonuç Bulunamadı</h1>
          <p className="text-gray-600 mb-6">
            Görüntülenecek bir analiz sonucu bulunamadı. Lütfen anketi tekrar doldurun.
          </p>
          <Link to="/survey" className="btn btn-primary">
            Ankete Git
          </Link>
        </div>
      </div>
    );
  }

  const { student_name, learning_style_analysis, study_program } = result;

  return (
    <div className="container-custom max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Öğrenme Stili Analizi ve Ders Çalışma Programı
        </h1>
        <p className="text-xl text-gray-600">
          <span className="font-semibold">{student_name}</span> için kişiselleştirilmiş sonuçlar
        </p>
      </div>

      {/* Öğrenme Stili Analizi Bölümü */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-primary-700 mb-6">
          Öğrenme Stili: {learning_style_analysis.learning_style}
        </h2>
        
        <div className="mb-6">
          <p className="text-gray-700">{learning_style_analysis.description}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Güçlü Yönler
            </h3>
            <ul className="space-y-2">
              {learning_style_analysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary-500 mr-2">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Geliştirilebilir Yönler
            </h3>
            <ul className="space-y-2">
              {learning_style_analysis.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Günlük Ders Çalışma Rutini */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-primary-700 mb-6">
          Günlük Ders Çalışma Rutini
        </h2>
        
        <div className="space-y-6">
          {study_program.daily_routine.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.activity}
                </h3>
                <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2 py-1 rounded">
                  {item.duration}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3">{item.description}</p>
              
              {item.subject && (
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-500 mr-2">Ders:</span>
                  <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                    {item.subject}
                  </span>
                </div>
              )}
              
              <div>
                <span className="text-sm font-medium text-gray-500 mb-1 block">Teknikler:</span>
                <div className="flex flex-wrap gap-2">
                  {item.techniques.map((technique, techIndex) => (
                    <span key={techIndex} className="bg-secondary-100 text-secondary-800 text-sm px-2 py-1 rounded">
                      {technique}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Haftalık Çalışma Programı */}
      {study_program.weekly_schedule && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-primary-700 mb-6">
            Haftalık Çalışma Programı
          </h2>
          
          <div className="space-y-8">
            {Object.entries(study_program.weekly_schedule).map(([day, activities]) => (
              <div key={day}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-100 p-2 rounded">
                  {day}
                </h3>
                <div className="space-y-4 pl-4">
                  {activities.map((activity, actIndex) => (
                    <div key={actIndex} className="border-l-2 border-primary-200 pl-4 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-800">
                          {activity.activity}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {activity.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      
                      {activity.subject && (
                        <div className="mt-1">
                          <span className="text-xs font-medium text-primary-600">
                            {activity.subject}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Öneriler */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-primary-700 mb-6">
          Genel Öneriler
        </h2>
        
        <ul className="space-y-3">
          {study_program.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Aksiyon Düğmeleri */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/survey" className="btn btn-outline">
          Yeni Analiz Yap
        </Link>
        <button 
          onClick={() => window.print()}
          className="btn btn-secondary"
        >
          Sonuçları Yazdır
        </button>
      </div>
    </div>
  );
};

export default ResultsPage; 