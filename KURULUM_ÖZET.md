# Öğrenci Ders Çalışma Sistemi Kurulum Özeti

Bu dosya, projeyi kurmak ve çalıştırmak için mevcut tüm yöntemleri özetler.

## 1. Docker ile Kurulum (Önerilen)

Ayrıntılı talimatlar için `DOCKER_KURULUM.md` dosyasına bakın.

```bash
# Docker kurulumu
# 1. Docker Desktop'ı indirin ve kurun

# Projeyi çalıştırmak için
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
docker-compose up -d
```

Tarayıcınızda http://localhost:3000 adresine gidin.

## 2. Python 3.10 ile Manuel Kurulum

Ayrıntılı talimatlar için `MACOS_KURULUM.md` dosyasına bakın.

```bash
# Python 3.10 kurulumu (macOS)
brew install python@3.10
echo 'export PATH="/usr/local/opt/python@3.10/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Sanal ortam ve backend
python3.10 -m venv venv_py310
source venv_py310/bin/activate
pip install -r requirements.txt
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
python run.py
```

Yeni bir terminal açın ve frontend'i çalıştırın:

```bash
cd frontend
npm install
npm start
```

Tarayıcınızda http://localhost:3000 adresine gidin.

## 3. Alternatif Kurulum Yöntemleri

Ayrıntılı talimatlar için `ALTERNATİF_KURULUM.md` dosyasına bakın.

- **pyenv** ile Python sürüm yönetimi
- **conda** ile ortam yönetimi 
- Farklı Python sürümleri için kurulum

## 4. Hızlı Başlangıç

Hızlı başlangıç için `HIZLI_BASLANGIC.md` dosyasına bakın.

## Sorun Giderme

Sık karşılaşılan sorunlar ve çözümleri için `KULLANIM.md` dosyasına bakın.

## API Dokümantasyonu

API dokümantasyonuna http://localhost:8000/docs adresinden erişebilirsiniz.

## Notlar

- Python 3.13 gibi çok yeni sürümlerle bazı paketler (özellikle pydantic-core) derlenirken sorunlar yaşayabilirsiniz.
- Docker kullanılamazsa, Python 3.10 versiyonu kullanmanız önerilir.
- Her kurulum yönteminde Gemini API anahtarının `.env` dosyasında yapılandırılması gerekir. 