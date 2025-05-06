from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config.settings import DATABASE_URL

# SQLAlchemy veritabanı motoru oluştur
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Oturum fabrikası oluştur
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Temel model sınıfı
Base = declarative_base()

def get_db():
    """Veritabanı oturumu döndürür"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Veritabanı tabloları oluştur
def create_tables():
    """Tablolar yoksa oluşturur"""
    Base.metadata.create_all(bind=engine) 