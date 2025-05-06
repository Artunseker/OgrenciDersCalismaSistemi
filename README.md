# Öğrenci Ders Çalışma Sistemi

Bu proje, öğrencilerin öğrenme stillerini analiz ederek kişiselleştirilmiş ders çalışma programları oluşturan bir web uygulamasıdır. Google Gemini AI kullanarak öğrenme stili analizi yapar ve sonuçları SQLite veritabanında saklar.

## Proje Yapısı

Proje iki ana bölümden oluşur:

1. **Backend (FastAPI)**: RESTful API hizmetleri sunar, veritabanı işlemlerini gerçekleştirir ve Gemini AI ile iletişim kurar.
2. **Frontend (React)**: Kullanıcı arayüzünü sunar, anket formunu içerir ve analiz sonuçlarını görüntüler.

## Kurulum ve Çalıştırma

### Docker ile Çalıştırma (Önerilen)

1. `.env` dosyasını oluşturun ve Gemini API anahtarınızı ekleyin:
```bash
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
```

2. Docker Compose ile uygulamayı başlatın:
```bash
docker-compose up
```

Backend http://localhost:8000 adresinde, frontend ise http://localhost:3000 adresinde çalışacaktır.

### Manuel Kurulum

#### Backend Kurulumu

1. Gereksinimleri yükleyin:
```bash
pip install -r requirements.txt
```

2. `.env` dosyasını oluşturun ve Gemini API anahtarınızı ekleyin:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Backend'i çalıştırın:
```bash
python run.py
```

Backend varsayılan olarak http://localhost:8000 adresinde çalışacaktır.

#### Frontend Kurulumu

1. Frontend klasörüne geçin:
```bash
cd frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Frontend'i çalıştırın:
```bash
npm start
```

Frontend varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

## Kullanım

1. Web tarayıcınızda http://localhost:3000 adresine gidin
2. Ana sayfada "Anketi Başlat" düğmesine tıklayın
3. Kişisel bilgilerinizi ve ders bilgilerinizi girin
4. Anket sorularını yanıtlayın
5. Sonuçlar sayfasında öğrenme stili analizinizi ve kişiselleştirilmiş ders çalışma programınızı görüntüleyin

## API Dokümantasyonu

API dokümantasyonuna http://localhost:8000/docs adresinden erişebilirsiniz.

### Kullanılabilir Endpoint'ler

- **GET /api/survey-questions**: Öğrenme stili anket sorularını döndürür
- **POST /api/analyze-learning-style**: Öğrenci bilgilerini ve anket yanıtlarını alır, analiz yapar ve kişiselleştirilmiş çalışma programı oluşturur
- **GET /api/students**: Sistemde kayıtlı tüm öğrencileri listeler
- **GET /api/students/{student_id}**: Belirli bir öğrencinin detaylarını ve analiz sonuçlarını gösterir

## İstek Örneği

```json
{
  "student_info": {
    "name": "Ahmet Yılmaz",
    "grade": "11",
    "subjects": ["Matematik", "Fizik", "Kimya", "Biyoloji"]
  },
  "survey_responses": [
    {"question_id": 1, "answer": "A"},
    {"question_id": 2, "answer": "A"},
    {"question_id": 3, "answer": "A"},
    {"question_id": 4, "answer": "A"},
    {"question_id": 5, "answer": "A"}
  ]
}
```

## Veritabanı Yapısı

Proje, SQLite veritabanı kullanarak öğrenci bilgilerini, anket yanıtlarını ve analiz sonuçlarını saklar. Veritabanı şeması aşağıdaki tablolardan oluşur:

1. **students**: Öğrenci bilgilerini saklar
2. **survey_responses**: Öğrencilerin anket yanıtlarını saklar
3. **analysis_results**: Öğrenme stili analiz sonuçlarını ve çalışma programlarını saklar

Veritabanı dosyası: `ogrenci_db.sqlite3` 