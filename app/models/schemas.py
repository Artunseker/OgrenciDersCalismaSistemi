from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class StudentInfo(BaseModel):
    """Öğrenci kişisel bilgileri için model"""
    name: str = Field(..., description="Öğrencinin adı")
    grade: str = Field(..., description="Öğrencinin sınıfı")
    subjects: List[str] = Field(default=[], description="Öğrencinin çalıştığı dersler")

class SurveyQuestion(BaseModel):
    """Anket sorusu için model"""
    id: int
    question: str
    options: List[Dict[str, str]]

class SurveyAnswer(BaseModel):
    """Anket cevabı için model"""
    question_id: int
    answer: str

class SurveyResponse(BaseModel):
    """Anket yanıtları için model"""
    answers: List[SurveyAnswer]

class StudentData(BaseModel):
    """Öğrenci bilgileri ve anket yanıtları için birleşik model"""
    student_info: StudentInfo
    survey_responses: List[SurveyAnswer]

class LearningStyleAnalysis(BaseModel):
    """Öğrenme stili analizi sonuçları için model"""
    learning_style: str
    description: str
    strengths: List[str]
    weaknesses: List[str]

class StudyProgramItem(BaseModel):
    """Çalışma programı öğesi için model"""
    activity: str
    duration: str
    description: str
    subject: Optional[str] = None
    techniques: List[str]

class StudyProgram(BaseModel):
    """Çalışma programı için model"""
    daily_routine: List[StudyProgramItem]
    weekly_schedule: Optional[Dict[str, List[StudyProgramItem]]] = None
    recommendations: List[str]

class AnalysisResponse(BaseModel):
    """API yanıtı için genel model"""
    student_name: str
    learning_style_analysis: LearningStyleAnalysis
    study_program: StudyProgram 