from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from datetime import datetime

from app.db.models import Student, SurveyResponse, AnalysisResult

# Student CRUD işlemleri
def create_student(db: Session, name: str, grade: str, subjects: List[str] = None) -> Student:
    """Veritabanına yeni öğrenci ekler"""
    db_student = Student(name=name, grade=grade)
    if subjects:
        db_student.set_subjects(subjects)
    
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def get_student(db: Session, student_id: int) -> Optional[Student]:
    """ID'ye göre öğrenciyi getirir"""
    return db.query(Student).filter(Student.id == student_id).first()

def get_students(db: Session, skip: int = 0, limit: int = 100) -> List[Student]:
    """Öğrencileri listeler"""
    return db.query(Student).offset(skip).limit(limit).all()

def get_student_by_name(db: Session, name: str) -> Optional[Student]:
    """İsme göre öğrenciyi arar"""
    return db.query(Student).filter(Student.name == name).first()

# Survey Response CRUD işlemleri
def create_survey_response(db: Session, student_id: int, question_id: int, answer: str) -> SurveyResponse:
    """Veritabanına yeni anket yanıtı ekler"""
    db_response = SurveyResponse(student_id=student_id, question_id=question_id, answer=answer)
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    return db_response

def get_student_survey_responses(db: Session, student_id: int) -> List[SurveyResponse]:
    """Öğrencinin anket yanıtlarını listeler"""
    return db.query(SurveyResponse).filter(SurveyResponse.student_id == student_id).all()

def create_bulk_survey_responses(db: Session, student_id: int, responses: List[Dict[str, Any]]) -> List[SurveyResponse]:
    """Veritabanına toplu anket yanıtları ekler"""
    db_responses = []
    for response in responses:
        db_response = SurveyResponse(
            student_id=student_id,
            question_id=response["question_id"],
            answer=response["answer"]
        )
        db.add(db_response)
        db_responses.append(db_response)
    
    db.commit()
    for response in db_responses:
        db.refresh(response)
    
    return db_responses

# Analysis Result CRUD işlemleri
def create_analysis_result(
    db: Session, 
    student_id: int, 
    learning_style: str, 
    description: str = None,
    strengths: List[str] = None,
    weaknesses: List[str] = None,
    study_program: Dict[str, Any] = None
) -> AnalysisResult:
    """Veritabanına yeni analiz sonucu ekler"""
    db_result = AnalysisResult(
        student_id=student_id,
        learning_style=learning_style,
        description=description
    )
    
    if strengths:
        db_result.set_strengths(strengths)
    
    if weaknesses:
        db_result.set_weaknesses(weaknesses)
    
    if study_program:
        db_result.set_study_program(study_program)
    
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result

def get_student_analysis_results(db: Session, student_id: int) -> List[AnalysisResult]:
    """Öğrencinin analiz sonuçlarını listeler"""
    return db.query(AnalysisResult).filter(AnalysisResult.student_id == student_id).all()

def get_latest_analysis_result(db: Session, student_id: int) -> Optional[AnalysisResult]:
    """Öğrencinin en son analiz sonucunu getirir"""
    return db.query(AnalysisResult)\
        .filter(AnalysisResult.student_id == student_id)\
        .order_by(AnalysisResult.created_at.desc())\
        .first() 