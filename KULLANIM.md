# Öğrenci Ders Çalışma Sistemi - Kullanım Talimatları

## Docker ile Çalıştırma

1. `.env` dosyasını oluşturun:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

2. Docker Compose ile uygulamayı başlatın:
```bash
docker-compose up
```

3. Tarayıcınızda http://localhost:3000 adresine gidin

## Olası Hatalar ve Çözümleri

1. **Python Komut Hatası**: Python veya pip komutları çalışmıyorsa, Docker kullanarak bu sorunları çözebilirsiniz.

2. **pydantic-core Derleme Hatası**: Bu paketin derlenmesinde sorun yaşanıyorsa, Docker sürümünü kullanmanız önerilir.

3. **API Anahtarı Hatası**: Gemini API anahtarının doğru şekilde .env dosyasına eklendiğinden emin olun.

4. **Bağlantı Hatası**: Backend ve frontend bağlantısında sorun yaşanıyorsa, her iki servisin de çalıştığından emin olun.

## Manuel Çalıştırma İçin Notlar

Python 3.10 veya daha düşük bir sürüm kullanmanız önerilir. Python 3.13 gibi çok yeni sürümler, bazı paketlerle uyumluluk sorunları yaşayabilir. 