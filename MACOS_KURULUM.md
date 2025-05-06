# macOS İçin Kurulum Talimatları

## Homebrew ile Python 3.10 Kurulumu

1. Homebrew kurun (yoksa):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Python 3.10 kurun:
```bash
brew install python@3.10
```

3. Python 3.10'u PATH'e ekleyin:
```bash
echo 'export PATH="/usr/local/opt/python@3.10/bin:$PATH"' >> ~/.zshrc
# veya
echo 'export PATH="/usr/local/opt/python@3.10/bin:$PATH"' >> ~/.bash_profile

# Kabuğu yeniden yükleyin
source ~/.zshrc  # veya source ~/.bash_profile
```

4. Python 3.10 sürümünü doğrulayın:
```bash
python3.10 --version
```

5. Sanal ortam oluşturun:
```bash
python3.10 -m venv venv_py310
source venv_py310/bin/activate
```

6. Gereksinimleri yükleyin:
```bash
pip install -r requirements.txt
```

7. Backend'i çalıştırın:
```bash
python run.py
```

## Xcode Command Line Tools

Bazı Python paketleri derlenirken Xcode Command Line Tools gerekebilir. Yüklemek için:

```bash
xcode-select --install
```

## Frontend Kurulumu

1. Node.js kurun (Homebrew ile):
```bash
brew install node@18
```

2. Frontend klasörüne geçin:
```bash
cd frontend
```

3. Bağımlılıkları yükleyin:
```bash
npm install
```

4. Frontend'i çalıştırın:
```bash
npm start
```

## Gemini API Anahtarı

`.env` dosyasını oluşturun ve API anahtarınızı ekleyin:
```bash
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
``` 