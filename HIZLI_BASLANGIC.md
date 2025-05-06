# Hızlı Başlangıç Rehberi

## macOS için Adımlar

1. **Python 3.10 kurun**:
```bash
brew install python@3.10
```

2. **Python 3.10'u PATH'e ekleyin**:
```bash
echo 'export PATH="/usr/local/opt/python@3.10/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

3. **Python 3.10 kullanarak sanal ortam oluşturun**:
```bash
python3.10 -m venv venv_py310
source venv_py310/bin/activate
```

4. **Gereksinimleri yükleyin**:
```bash
pip install -r requirements.txt
```

5. **Gemini API anahtarınızı ayarlayın**:
Kök dizinde `.env` dosyası oluşturun ve API anahtarınızı ekleyin:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

6. **Backend'i çalıştırın**:
```bash
python run.py
```

7. **Yeni bir terminal açın ve frontend'i çalıştırın**:
```bash
cd frontend
npm install
npm start
```

8. **Tarayıcınızda uygulamayı açın**:
http://localhost:3000 adresinde uygulama erişilebilir olacak.

## Sorun Giderme

- **Python sürüm hatası**: Python 3.10 kullandığınızdan emin olun. `python --version` komutu ile kontrol edebilirsiniz.
- **Paket yükleme hatası**: Xcode Command Line Tools'u kurun: `xcode-select --install`
- **API anahtarı hatası**: Gemini API anahtarınızın doğru şekilde `.env` dosyasında ayarlandığından emin olun.
- **Backend bağlantı hatası**: Backend'in 8000 portunda çalıştığından emin olun: `http://localhost:8000`

## Önemli Bilgiler

- Backend API'ye Swagger dokümantasyonu aracılığıyla erişebilirsiniz: http://localhost:8000/docs
- Python 3.13 gibi çok yeni sürümler bazı paketlerle uyumluluk sorunları yaşayabilir, bu nedenle Python 3.10 kullanmanız önerilir. 