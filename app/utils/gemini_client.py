import google.generativeai as genai
from app.config.settings import GEMINI_API_KEY, GEMINI_MODEL
from typing import Dict, List, Any
import json

# Gemini API yapılandırması
genai.configure(api_key=GEMINI_API_KEY)

def get_gemini_model():
    """Gemini modelini yapılandırır ve döndürür"""
    return genai.GenerativeModel(GEMINI_MODEL)

def create_prompt_from_student_data(student_data: Dict[str, Any]) -> str:
    """
    Öğrenci bilgileri ve anket yanıtlarından Gemini için prompt oluşturur
    
    Args:
        student_data: Öğrenci bilgileri ve anket yanıtlarını içeren sözlük
        
    Returns:
        Gemini için hazırlanmış prompt metni
    """
    student_info = student_data["student_info"]
    survey_responses = student_data["survey_responses"]
    
    # Prompt template
    prompt = f"""
    Bir öğrencinin öğrenme stilini analiz ederek kişiselleştirilmiş bir ders çalışma programı oluşturmaya yardımcı olmanı istiyorum.
    
    Öğrencinin Bilgileri:
    - İsim: {student_info['name']}
    - Sınıf: {student_info['grade']}
    - Çalıştığı Dersler: {', '.join(student_info['subjects'])}
    
    Öğrenme Stili Anketi Yanıtları:
    """
    
    # Anket yanıtlarını ekle
    for answer in survey_responses:
        prompt += f"- Soru {answer['question_id']}: Cevap {answer['answer']}\n"
    
    prompt += """
    Bu bilgilere göre, lütfen:
    
    1. Öğrencinin öğrenme stilini analiz et (Görsel, İşitsel, Okuma/Yazma, Kinestetik veya bir kombinasyon).
    2. Bu öğrenme stilinin güçlü ve zayıf yönlerini belirt.
    3. Bu öğrenme stiline uygun, öğrencinin derslerine yönelik:
       a) Günlük bir çalışma rutini
       b) Haftalık bir çalışma programı
       c) Spesifik çalışma teknikleri ve önerileri içeren
    kişiselleştirilmiş bir ders çalışma programı oluştur.
    
    Yanıtını aşağıdaki JSON formatında ver:
    ```json
    {
      "student_name": "Öğrencinin adı",
      "learning_style_analysis": {
        "learning_style": "Öğrenme stili adı",
        "description": "Öğrenme stilinin kısa açıklaması",
        "strengths": ["Güçlü yön 1", "Güçlü yön 2", ...],
        "weaknesses": ["Zayıf yön 1", "Zayıf yön 2", ...]
      },
      "study_program": {
        "daily_routine": [
          {
            "activity": "Aktivite adı",
            "duration": "Süre",
            "description": "Aktivite açıklaması",
            "subject": "İlgili ders (varsa)",
            "techniques": ["Teknik 1", "Teknik 2", ...]
          },
          ...
        ],
        "weekly_schedule": {
          "Pazartesi": [ { ... aktiviteler ... } ],
          "Salı": [ ... ],
          ...
        },
        "recommendations": ["Öneri 1", "Öneri 2", ...]
      }
    }
    ```
    
    Lütfen sadece JSON yanıtı ver, başka bir şey ekleme.
    """
    
    return prompt

async def analyze_learning_style(student_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Öğrenci verilerini Gemini API'ye gönderir ve analiz sonucunu alır
    
    Args:
        student_data: Öğrenci bilgileri ve anket yanıtları
        
    Returns:
        Analiz sonuçları ve çalışma programı içeren sözlük
    """
    model = get_gemini_model()
    prompt = create_prompt_from_student_data(student_data)
    
    # Gemini API'ye istek gönder
    response = await model.generate_content_async(prompt)
    
    # JSON yanıtını parse et
    try:
        result_text = response.text
        # JSON bölümünü çıkar (```json ve ``` arasındaki kısım)
        if "```json" in result_text and "```" in result_text:
            json_start = result_text.find("```json") + 7
            json_end = result_text.rfind("```")
            json_str = result_text[json_start:json_end].strip()
        else:
            json_str = result_text
        
        # JSON parse
        result_data = json.loads(json_str)
        return result_data
    except Exception as e:
        # Hata durumunda basit bir yanıt döndür
        print(f"JSON parsing error: {e}")
        return {
            "error": "Yanıt işlenirken bir hata oluştu",
            "raw_response": response.text
        } 