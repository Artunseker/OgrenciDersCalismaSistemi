import os
from dotenv import load_dotenv
from pathlib import Path

# .env dosyasını yükle
BASE_DIR = Path(__file__).resolve().parent.parent.parent
env_path = Path(BASE_DIR) / '.env'
load_dotenv(dotenv_path=env_path)

# Gemini API anahtarı
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY çevre değişkeni bulunamadı. Lütfen .env dosyasını kontrol edin.")

# Gemini Model
GEMINI_MODEL = "gemini-pro"

# SQLite veritabanı ayarları
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'ogrenci_db.sqlite3')}"

# Anket soruları (basit bir örnek)
LEARNING_STYLE_SURVEY = [
    {
        "id": 1,
        "question": "Yeni bir konuyu öğrenirken hangi yöntemi tercih edersiniz?",
        "options": [
            {"value": "A", "text": "Görsel materyaller (resimler, grafikler, videolar)"},
            {"value": "B", "text": "Dinleme ve tartışma (sesli anlatım, konuşma)"},
            {"value": "C", "text": "Yazarak ve okuyarak (metinler, kitaplar)"},
            {"value": "D", "text": "Yaparak ve deneyimleyerek (uygulamalar, projeler)"}
        ]
    },
    {
        "id": 2,
        "question": "Bir problemi çözerken genellikle nasıl yaklaşırsınız?",
        "options": [
            {"value": "A", "text": "Problemi görselleştirmeye çalışırım"},
            {"value": "B", "text": "Problemi sesli düşünür veya başkalarıyla tartışırım"},
            {"value": "C", "text": "Adım adım yazılı bir çözüm planı yaparım"},
            {"value": "D", "text": "Deneme yanılma yöntemiyle farklı çözümler denerim"}
        ]
    },
    {
        "id": 3,
        "question": "Sınav için hazırlanırken en etkili çalışma yönteminiz nedir?",
        "options": [
            {"value": "A", "text": "Renkli not almak, şemalar ve grafikler çizmek"},
            {"value": "B", "text": "Konuları başkalarıyla tartışmak veya sesli tekrar etmek"},
            {"value": "C", "text": "Özet çıkarmak ve tekrar tekrar okumak"},
            {"value": "D", "text": "Pratik uygulamalar ve örnek sorular çözmek"}
        ]
    },
    {
        "id": 4,
        "question": "Bir yönergeyi takip ederken en rahat hangi formatta alırsınız?",
        "options": [
            {"value": "A", "text": "Resimli adımlar veya video gösterim"},
            {"value": "B", "text": "Sözlü açıklamalar"},
            {"value": "C", "text": "Yazılı talimatlar"},
            {"value": "D", "text": "Biri gösterirken siz de deneyerek"}
        ]
    },
    {
        "id": 5,
        "question": "Boş zamanlarınızda genellikle ne yapmayı tercih edersiniz?",
        "options": [
            {"value": "A", "text": "Film izlemek, fotoğraf çekmek, sanat ile uğraşmak"},
            {"value": "B", "text": "Müzik dinlemek, arkadaşlarla sohbet etmek"},
            {"value": "C", "text": "Kitap okumak, bulmaca çözmek"},
            {"value": "D", "text": "Spor yapmak, el işleri, oyun oynamak"}
        ]
    }
] 