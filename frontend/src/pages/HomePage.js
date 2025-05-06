import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container-custom">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Kişiselleştirilmiş Öğrenme Yolculuğu
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Öğrenme stilinize uygun, özel olarak tasarlanmış ders çalışma 
          programları ile akademik başarınızı artırın.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/survey" className="btn btn-primary text-lg py-3 px-8">
            Anketi Başlat
          </Link>
          <Link to="/students" className="btn btn-outline text-lg py-3 px-8">
            Öğrencileri Görüntüle
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Nasıl Çalışır?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-3">Anketi Tamamla</h3>
            <p className="text-gray-600">
              Öğrenme stilinizi belirlemek için kısa bir anketi yanıtlayın.
            </p>
          </div>
          <div className="card text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-3">Analizi İncele</h3>
            <p className="text-gray-600">
              Yapay zeka destekli analiz ile öğrenme stiliniz hakkında detaylı bilgi edinin.
            </p>
          </div>
          <div className="card text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-3">Programı Uygula</h3>
            <p className="text-gray-600">
              Size özel hazırlanan ders çalışma programını günlük hayatınıza entegre edin.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 bg-gray-50 -mx-4 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Proje Hakkında
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Bu proje, öğrencilerin kişisel özelliklerini ve öğrenme stillerini
            analiz ederek, her öğrenciye özgü ders çalışma programları oluşturmayı
            amaçlamaktadır. Google Gemini yapay zeka modelini kullanan sistem,
            öğrencilerin akademik başarısını artırmaya yardımcı olmak için
            tasarlanmıştır.
          </p>
          <p className="text-lg text-gray-600">
            Öğrenme stili analizi, VARK (Görsel, İşitsel, Okuma/Yazma, Kinestetik)
            metodolojisine dayanmaktadır ve her öğrencinin güçlü yanlarını
            vurgulayan, zayıf yanlarını geliştiren bir yaklaşım sunmaktadır.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Kişiselleştirilmiş Öğrenme Deneyiminiz İçin İlk Adımı Atın
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Daha verimli ders çalışmak ve akademik potansiyelinizi
          maksimuma çıkarmak için hemen başlayın.
        </p>
        <Link to="/survey" className="btn btn-primary text-lg py-3 px-8">
          Anketi Başlat
        </Link>
      </section>
    </div>
  );
};

export default HomePage; 