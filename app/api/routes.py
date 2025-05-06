from fastapi import APIRouter, HTTPException, status, Depends
from app.models.schemas import StudentData, AnalysisResponse
from app.utils.gemini_client import analyze_learning_style
from app.config.settings import LEARNING_STYLE_SURVEY
from typing import List, Dict, Any, Optional

from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import crud, models

router = APIRouter()

@router.get("/survey-questions", response_model=List[Dict[str, Any]])
async def get_survey_questions():
    """Öğrenme stili anket sorularını döndürür"""
    return LEARNING_STYLE_SURVEY

@router.post("/analyze-learning-style", response_model=Dict[str, Any])
async def analyze_student_learning_style(data: StudentData, db: Session = Depends(get_db)):
    """
    Öğrenci bilgilerini ve anket yanıtlarını alır, 
    Gemini API kullanarak analiz yapar ve sonuçları döndürür
    """
    try:
        # Gelen veriyi sözlük formatına dönüştür
        student_data = {
            "student_info": data.student_info.dict(),
            "survey_responses": [answer.dict() for answer in data.survey_responses]
        }
        
        # Veritabanına öğrenci bilgilerini kaydet
        student_info = data.student_info
        db_student = crud.get_student_by_name(db, name=student_info.name)
        
        # Öğrenci yoksa, yeni öğrenci oluştur
        if not db_student:
            db_student = crud.create_student(
                db=db, 
                name=student_info.name, 
                grade=student_info.grade, 
                subjects=student_info.subjects
            )
        
        # Öğrencinin anket yanıtlarını kaydet
        for answer in data.survey_responses:
            crud.create_survey_response(
                db=db,
                student_id=db_student.id,
                question_id=answer.question_id,
                answer=answer.answer
            )
        
        # Gemini analizi yap
        result = await analyze_learning_style(student_data)
        
        # Hata kontrolü
        if "error" in result:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Gemini API analiz hatası: {result.get('error', 'Bilinmeyen hata')}"
            )
        
        # Analiz sonuçlarını veritabanına kaydet
        learning_style_analysis = result.get("learning_style_analysis", {})
        study_program = result.get("study_program", {})
        
        crud.create_analysis_result(
            db=db,
            student_id=db_student.id,
            learning_style=learning_style_analysis.get("learning_style", ""),
            description=learning_style_analysis.get("description", ""),
            strengths=learning_style_analysis.get("strengths", []),
            weaknesses=learning_style_analysis.get("weaknesses", []),
            study_program=study_program
        )
        
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"İşlem sırasında hata oluştu: {str(e)}"
        )

@router.get("/students", response_model=List[Dict[str, Any]])
async def get_all_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Tüm öğrencileri listeler"""
    students = crud.get_students(db, skip=skip, limit=limit)
    result = []
    
    for student in students:
        student_data = {
            "id": student.id,
            "name": student.name,
            "grade": student.grade,
            "subjects": student.get_subjects(),
            "created_at": student.created_at
        }
        result.append(student_data)
    
    return result

@router.get("/students/{student_id}", response_model=Dict[str, Any])
async def get_student_details(student_id: int, db: Session = Depends(get_db)):
    """Belirli bir öğrencinin detaylarını ve analiz sonuçlarını getirir"""
    student = crud.get_student(db, student_id=student_id)
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Öğrenci bulunamadı: ID {student_id}"
        )
    
    # Öğrenci anket yanıtlarını getir
    survey_responses = crud.get_student_survey_responses(db, student_id=student_id)
    responses_data = [
        {"question_id": response.question_id, "answer": response.answer}
        for response in survey_responses
    ]
    
    # En son analiz sonucunu getir
    analysis = crud.get_latest_analysis_result(db, student_id=student_id)
    analysis_data = None
    
    if analysis:
        analysis_data = {
            "learning_style": analysis.learning_style,
            "description": analysis.description,
            "strengths": analysis.get_strengths(),
            "weaknesses": analysis.get_weaknesses(),
            "study_program": analysis.get_study_program(),
            "created_at": analysis.created_at
        }
    
    # Sonuçları birleştir
    result = {
        "id": student.id,
        "name": student.name,
        "grade": student.grade,
        "subjects": student.get_subjects(),
        "created_at": student.created_at,
        "survey_responses": responses_data,
        "analysis_result": analysis_data
    }
    
    return result 