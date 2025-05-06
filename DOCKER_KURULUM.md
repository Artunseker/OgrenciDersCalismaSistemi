# Docker ile Kurulum ve Çalıştırma

## macOS için Docker Kurulumu

1. Docker Desktop'ı [Docker'ın resmi sitesinden](https://www.docker.com/products/docker-desktop/) indirin ve kurun

2. Kurulum tamamlandıktan sonra Docker Desktop'ı başlatın

3. Terminal'den Docker'ın düzgün kurulduğunu doğrulayın:
```bash
docker --version
docker-compose --version
```

## Proje Dizininde Docker Compose ile Çalıştırma

1. Proje klasörüne gidin:
```bash
cd /path/to/öğrenci_ders_çalışma_sistemi
```

2. `.env` dosyasını oluşturun ve Gemini API anahtarınızı ekleyin:
```bash
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
```

3. Docker Compose ile uygulama konteynerlerini oluşturun ve başlatın:
```bash
docker-compose up -d
```

4. Uygulama hazır olduğunda aşağıdaki adreslere erişebilirsiniz:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Dokümantasyonu: http://localhost:8000/docs

5. Konteynerlerin durumunu görüntülemek için:
```bash
docker-compose ps
```

6. Konteyner loglarını görüntülemek için:
```bash
docker-compose logs -f
```

7. Uygulamayı durdurmak için:
```bash
docker-compose down
```

## Sorun Giderme

- **Docker daemon çalışmıyor hatası**: Docker Desktop uygulamasının çalıştığından emin olun
- **Port çakışması hatası**: 8000 veya 3000 portları başka uygulamalar tarafından kullanılıyorsa, `docker-compose.yml` dosyasında port ayarlarını değiştirin
- **Gemini API hatası**: `.env` dosyasında API anahtarının doğru ayarlandığından emin olun

## Docker Compose Dosyası Yapılandırması

`docker-compose.yml` dosyasının yapısı şu şekildedir:

```yaml
version: '3'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./app:/app/app
      - ./run.py:/app/run.py
    restart: on-failure
    env_file:
      - .env

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend/src:/app/src
    restart: on-failure
    depends_on:
      - backend
```

İhtiyaç duyarsanız bu yapılandırmayı değiştirebilirsiniz. 