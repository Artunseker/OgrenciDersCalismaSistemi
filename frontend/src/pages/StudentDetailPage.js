import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await api.getStudent(id);
        setStudent(data);
        setLoading(false);
      } catch (err) {
        setError('Öğrenci bilgileri yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container-custom flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-lg">Öğrenci bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="container-custom max-w-4xl">
        <div className="card text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Hata</h1>
          <p className="text-gray-600 mb-6">
            {error || 'Öğrenci bulunamadı.'}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-outline"
            >
              Tekrar Dene
            </button>
            <Link to="/students" className="btn btn-primary">
              Tüm Öğrencilere Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { name, grade, subjects, created_at, survey_responses, analysis_result } = student;

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  // Analiz sonucu gösterme fonksiyonu
  const renderAnalysisResult = () => {
    if (!analysis_result) {
      return (
        <div className="card text-center py-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Henüz analiz sonucu bulunmuyor
          </h3>
          <p className="text-gray-600 mb-6">
            Bu öğrenci için yapılmış bir öğrenme stili analizi bulunmamaktadır.
          </p>
          <Link to="/survey" className="btn btn-primary">
            Yeni Analiz Yap
          </Link>
        </div>
      );
    }

    // LocalStorage'a sonucu kaydet ve sonuç sayfasına yönlendir
    const viewDetailedResults = () => {
      localStorage.setItem('analysisResult', JSON.stringify({
        student_name: name,
        learning_style_analysis: analysis_result.learning_style_analysis || {
          learning_style: analysis_result.learning_style,
          description: analysis_result.description,
          strengths: analysis_result.strengths,
          weaknesses: analysis_result.weaknesses
        },
        study_program: analysis_result.study_program
      }));
      navigate('/results');
    };

    return (
      <div className="card">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold text-primary-700">
            Öğrenme Stili Analizi
          </h3>
          <span className="text-sm text-gray-500">
            {formatDate(analysis_result.created_at)}
          </span>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="font-medium text-gray-700 mr-2">Öğrenme Stili:</span>
            <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
              {analysis_result.learning_style}
            </span>
          </div>
          <p className="text-gray-600">{analysis_result.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Güçlü Yönler:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {analysis_result.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Geliştirilebilir Yönler:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {analysis_result.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={viewDetailedResults}
          className="btn btn-primary w-full"
        >
          Detaylı Analiz ve Çalışma Programını Görüntüle
        </button>
      </div>
    );
  };

  return (
    <div className="container-custom max-w-4xl">
      <div className="mb-6">
        <Link to="/students" className="text-primary-600 hover:text-primary-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Tüm Öğrencilere Dön
        </Link>
      </div>

      <div className="card mb-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {name}
          </h1>
          <span className="text-sm text-gray-500">
            Kayıt: {formatDate(created_at)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Öğrenci Bilgileri
            </h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-600">Sınıf:</span>{' '}
                <span className="text-gray-800">{grade}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Dersler:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Anket Yanıtları
            </h2>
            {survey_responses.length > 0 ? (
              <ul className="space-y-2">
                {survey_responses.map((response) => (
                  <li key={response.question_id} className="flex">
                    <span className="font-medium text-gray-600 mr-2">
                      Soru {response.question_id}:
                    </span>
                    <span className="text-gray-800">Cevap {response.answer}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Anket yanıtı bulunamadı.</p>
            )}
          </div>
        </div>
      </div>

      {renderAnalysisResult()}
    </div>
  );
};

export default StudentDetailPage; 