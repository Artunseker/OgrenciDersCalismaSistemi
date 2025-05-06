from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.db.database import create_tables

# Veritabanı tablolarını oluştur
create_tables()

app = FastAPI(
    title="Öğrenci Ders Çalışma Sistemi",
    description="Öğrenme stili analizine dayalı kişiselleştirilmiş ders çalışma programı oluşturma uygulaması",
    version="1.0.0"
)

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gerçek projede güvenlik için belirli domainler belirtilmeli
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API rotalarını ekle
app.include_router(router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Öğrenci Ders Çalışma Sistemi API'sine Hoş Geldiniz"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 