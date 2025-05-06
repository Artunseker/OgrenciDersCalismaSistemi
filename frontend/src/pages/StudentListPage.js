import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await api.getStudents();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError('Öğrenciler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="container-custom flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-lg">Öğrenciler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom max-w-4xl">
        <div className="card text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Hata</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom max-w-5xl">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tüm Öğrenciler
          </h1>
          <p className="text-gray-600">
            Sisteme kaydedilmiş öğrencileri ve analiz sonuçlarını görüntüleyin.
          </p>
        </div>
        <Link to="/survey" className="btn btn-primary mt-4 md:mt-0">
          Yeni Öğrenci Ekle
        </Link>
      </div>

      {students.length === 0 ? (
        <div className="card text-center py-16">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Henüz öğrenci kaydedilmemiş
          </h2>
          <p className="text-gray-600 mb-8">
            Anket doldurarak öğrenci ekleyebilirsiniz.
          </p>
          <Link to="/survey" className="btn btn-primary">
            Anketi Başlat
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Ad Soyad
                </th>
                <th className="px-6 py-3 text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Sınıf
                </th>
                <th className="px-6 py-3 text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Dersler
                </th>
                <th className="px-6 py-3 text-gray-500 font-medium text-sm uppercase tracking-wider">
                  Kayıt Tarihi
                </th>
                <th className="px-6 py-3 text-gray-500 font-medium text-sm uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-800">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700">{student.grade}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.slice(0, 3).map((subject, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded"
                        >
                          {subject}
                        </span>
                      ))}
                      {student.subjects.length > 3 && (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          +{student.subjects.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500 text-sm">
                      {new Date(student.created_at).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link
                      to={`/students/${student.id}`}
                      className="text-primary-600 hover:text-primary-800 font-medium"
                    >
                      Detayları Görüntüle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentListPage; 
 