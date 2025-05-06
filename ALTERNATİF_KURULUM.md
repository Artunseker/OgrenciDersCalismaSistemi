# Alternatif Kurulum Yöntemleri

Docker yüklü değilse veya Docker kullanmak istemiyorsanız, aşağıdaki yöntemleri kullanabilirsiniz.

## Yöntem 1: Python 3.10 veya daha düşük sürüm kurmak

Python 3.10 kurulumunu [Python'un resmi sitesinden](https://www.python.org/downloads/release/python-3100/) yapabilirsiniz.

1. Python 3.10 kurun
2. Sanal ortam oluşturun:
```bash
python3.10 -m venv venv_py310
source venv_py310/bin/activate  # Unix/macOS
# veya
venv_py310\Scripts\activate  # Windows
```
3. Gereksinimleri yükleyin:
```bash
pip install -r requirements.txt
```
4. Backend'i çalıştırın:
```bash
python run.py
```

## Yöntem 2: pyenv ile farklı Python sürümleri yönetimi

1. pyenv kurun ([macOS](https://github.com/pyenv/pyenv#homebrew-in-macos)/[Linux](https://github.com/pyenv/pyenv-installer)/[Windows](https://github.com/pyenv-win/pyenv-win#installation))

2. Python 3.10 sürümünü yükleyin:
```bash
pyenv install 3.10.0
```

3. Proje klasöründe bu sürümü kullanın:
```bash
pyenv local 3.10.0
```

4. Sanal ortam oluşturun ve gereksinimleri yükleyin:
```bash
python -m venv venv
source venv/bin/activate  # Unix/macOS
pip install -r requirements.txt
```

5. Backend'i çalıştırın:
```bash
python run.py
```

## Yöntem 3: Conda ile ortam yönetimi

1. [Miniconda](https://docs.conda.io/en/latest/miniconda.html) yükleyin

2. Python 3.10 ile yeni bir conda ortamı oluşturun:
```bash
conda create -n ogrenci_app python=3.10
conda activate ogrenci_app
```

3. Gereksinimleri yükleyin:
```bash
pip install -r requirements.txt
```

4. Backend'i çalıştırın:
```bash
python run.py
```

## Frontend Kurulumu (Tüm yöntemler için)

1. Node.js ve npm kurun (önerilen sürüm: Node.js 18)
2. Frontend klasörüne geçin ve bağımlılıkları yükleyin:
```bash
cd frontend
npm install
```
3. Frontend'i çalıştırın:
```bash
npm start
```

## Not

Tüm kurulum yöntemlerinde Gemini API anahtarınızı `.env` dosyasında belirtmelisiniz:
```
GEMINI_API_KEY=your_gemini_api_key_here
``` 