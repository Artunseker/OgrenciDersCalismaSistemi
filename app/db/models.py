from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import json

from app.db.database import Base

class Student(Base):
    """Öğrenci bilgilerini tutan tablo"""
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    grade = Column(String(20), nullable=False)
    subjects = Column(Text, nullable=True)  # JSON formatında saklanacak
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # İlişkiler
    survey_responses = relationship("SurveyResponse", back_populates="student")
    analysis_results = relationship("AnalysisResult", back_populates="student")

    def set_subjects(self, subjects_list):
        """Dersleri JSON formatında saklar"""
        self.subjects = json.dumps(subjects_list)
    
    def get_subjects(self):
        """JSON formatındaki dersleri liste olarak döndürür"""
        if self.subjects:
            return json.loads(self.subjects)
        return []

class SurveyResponse(Base):
    """Öğrenci anket yanıtlarını tutan tablo"""
    __tablename__ = "survey_responses"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    question_id = Column(Integer, nullable=False)
    answer = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # İlişkiler
    student = relationship("Student", back_populates="survey_responses")

class AnalysisResult(Base):
    """Öğrenme stili analiz sonuçlarını tutan tablo"""
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    learning_style = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    strengths = Column(Text, nullable=True)  # JSON formatında saklanacak
    weaknesses = Column(Text, nullable=True)  # JSON formatında saklanacak
    study_program = Column(Text, nullable=True)  # JSON formatında saklanacak
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # İlişkiler
    student = relationship("Student", back_populates="analysis_results")
    
    def set_strengths(self, strengths_list):
        """Güçlü yönleri JSON formatında saklar"""
        self.strengths = json.dumps(strengths_list)
    
    def get_strengths(self):
        """JSON formatındaki güçlü yönleri liste olarak döndürür"""
        if self.strengths:
            return json.loads(self.strengths)
        return []
    
    def set_weaknesses(self, weaknesses_list):
        """Zayıf yönleri JSON formatında saklar"""
        self.weaknesses = json.dumps(weaknesses_list)
    
    def get_weaknesses(self):
        """JSON formatındaki zayıf yönleri liste olarak döndürür"""
        if self.weaknesses:
            return json.loads(self.weaknesses)
        return []
    
    def set_study_program(self, study_program_dict):
        """Çalışma programını JSON formatında saklar"""
        self.study_program = json.dumps(study_program_dict)
    
    def get_study_program(self):
        """JSON formatındaki çalışma programını sözlük olarak döndürür"""
        if self.study_program:
            return json.loads(self.study_program)
        return {} 