import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const SurveyPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    grade: '',
    subjects: []
  });
  const [answers, setAnswers] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [error, setError] = useState('');
  const [analysisLoading, setAnalysisLoading] = useState(false);

  // Anket sorularını getir
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await api.getSurveyQuestions();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        setError('Anket soruları yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Öğrenci bilgilerini güncelle
  const handleStudentInfoChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  // Yeni ders ekle
  const addSubject = () => {
    if (newSubject.trim() !== '') {
      setStudentInfo({
        ...studentInfo,
        subjects: [...studentInfo.subjects, newSubject.trim()]
      });
      setNewSubject('');
    }
  };

  // Ders sil
  const removeSubject = (index) => {
    const updatedSubjects = [...studentInfo.subjects];
    updatedSubjects.splice(index, 1);
    setStudentInfo({ ...studentInfo, subjects: updatedSubjects });
  };

  // Anket yanıtını kaydet
  const handleAnswerChange = (questionId, answer) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      (a) => a.question_id === questionId
    );

    if (existingAnswerIndex !== -1) {
      newAnswers[existingAnswerIndex].answer = answer;
    } else {
      newAnswers.push({ question_id: questionId, answer });
    }

    setAnswers(newAnswers);
  };

  // Bir sonraki adıma geç
  const handleNext = () => {
    // İlk adımda öğrenci bilgilerin kontrolü
    if (currentStep === 0) {
      if (!studentInfo.name || !studentInfo.grade) {
        setError('Lütfen ad ve sınıf bilgilerini girin.');
        return;
      }
      if (studentInfo.subjects.length === 0) {
        setError('Lütfen en az bir ders ekleyin.');
        return;
      }
      setError('');
    }
    
    // Anket yanıtlarının kontrolü
    if (currentStep > 0 && currentStep <= questions.length) {
      const questionId = questions[currentStep - 1].id;
      const hasAnswered = answers.some(a => a.question_id === questionId);
      
      if (!hasAnswered) {
        setError('Lütfen soruyu yanıtlayın.');
        return;
      }
      setError('');
    }
    
    setCurrentStep(currentStep + 1);
  };

  // Bir önceki adıma dön
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setError('');
  };

  // Anketi tamamla ve analiz yap
  const handleSubmit = async () => {
    setAnalysisLoading(true);
    setError('');

    try {
      const result = await api.analyzeLearningStyle({
        student_info: studentInfo,
        survey_responses: answers
      });

      // Sonuçları localStorage'e kaydet ve sonuç sayfasına yönlendir
      localStorage.setItem('analysisResult', JSON.stringify(result));
      navigate('/results');
    } catch (error) {
      setError('Analiz yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      setAnalysisLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-lg">Anket yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Öğrenme Stili Anketi
        </h1>
        <p className="text-gray-600">
          Size özel bir ders çalışma programı oluşturmak için lütfen aşağıdaki soruları yanıtlayın.
        </p>
      </div>

      {/* Hata mesajı */}
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* İlerleme çubuğu */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{
              width: `${
                currentStep === 0
                  ? "5%"
                  : currentStep > questions.length
                  ? "100%"
                  : `${(currentStep / (questions.length + 1)) * 100}%`
              }`,
            }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600 text-right">
          {currentStep === 0
            ? "Öğrenci Bilgileri"
            : currentStep > questions.length
            ? "Tamamlandı"
            : `Soru ${currentStep}/${questions.length}`}
        </div>
      </div>

      <div className="card">
        {/* Öğrenci bilgileri formu */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Kişisel Bilgileriniz</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={studentInfo.name}
                  onChange={handleStudentInfoChange}
                  className="input"
                  placeholder="Adınız ve soyadınızı girin"
                />
              </div>
              <div>
                <label htmlFor="grade" className="block text-gray-700 mb-1">
                  Sınıfınız / Eğitim Seviyeniz
                </label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={studentInfo.grade}
                  onChange={handleStudentInfoChange}
                  className="input"
                  placeholder="Örn: 11. Sınıf, Üniversite 2. Sınıf"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Çalıştığınız Dersler
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="input rounded-r-none"
                    placeholder="Ders adı ekleyin"
                  />
                  <button
                    type="button"
                    onClick={addSubject}
                    className="btn btn-primary rounded-l-none"
                  >
                    Ekle
                  </button>
                </div>
              </div>

              {/* Eklenen derslerin listesi */}
              {studentInfo.subjects.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Eklenen Dersler:</p>
                  <div className="flex flex-wrap gap-2">
                    {studentInfo.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                      >
                        <span className="text-gray-800">{subject}</span>
                        <button
                          type="button"
                          onClick={() => removeSubject(index)}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Anket soruları */}
        {currentStep > 0 && currentStep <= questions.length && (
          <div>
            <h2 className="text-xl font-semibold mb-6">
              {questions[currentStep - 1].question}
            </h2>
            <div className="space-y-3">
              {questions[currentStep - 1].options.map((option) => {
                const isSelected = answers.some(
                  (a) => a.question_id === questions[currentStep - 1].id && a.answer === option.value
                );
                return (
                  <div
                    key={option.value}
                    className={`p-4 border rounded cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-300 hover:border-primary-300"
                    }`}
                    onClick={() =>
                      handleAnswerChange(questions[currentStep - 1].id, option.value)
                    }
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                          isSelected
                            ? "border-primary-500 bg-primary-500"
                            : "border-gray-400"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p
                          className={`${
                            isSelected ? "text-primary-700" : "text-gray-700"
                          } font-medium`}
                        >
                          {option.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Özet sayfası */}
        {currentStep > questions.length && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Anket Tamamlandı</h2>
            <p className="text-gray-600 mb-6">
              Verdiğiniz yanıtlar doğrultusunda analiziniz yapılacak ve size özel
              bir ders çalışma programı oluşturulacaktır.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">
                Girdiğiniz Bilgiler:
              </h3>
              <p>
                <span className="font-medium">Ad Soyad:</span> {studentInfo.name}
              </p>
              <p>
                <span className="font-medium">Sınıf:</span> {studentInfo.grade}
              </p>
              <p>
                <span className="font-medium">Dersler:</span>{" "}
                {studentInfo.subjects.join(", ")}
              </p>
            </div>
            <p className="text-sm text-gray-500 italic mb-6">
              Not: Analiz işlemi, girdiğiniz bilgilere ve yapay zeka modeline bağlı olarak
              yaklaşık 10-15 saniye sürebilir.
            </p>
          </div>
        )}

        {/* Navigasyon düğmeleri */}
        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-outline"
              disabled={analysisLoading}
            >
              Geri
            </button>
          )}
          {currentStep === 0 && <div></div>}

          {currentStep <= questions.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
            >
              {currentStep === questions.length ? "Tamamla" : "Devam Et"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={analysisLoading}
            >
              {analysisLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Analiz Ediliyor...</span>
                </div>
              ) : (
                "Analiz Et ve Programı Oluştur"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage; 