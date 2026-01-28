# home_server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/ai-guide', methods=['POST'])
def ai_guide():
    # 1. 환경변수 읽기 (CMD에서 설정한 이름으로 가져옵니다)
    api_key = os.environ.get("MY_API_KEY_GOOGLE")
    
    if not api_key:
        return jsonify({"error": "API Key가 설정되지 않았습니다. CMD에서 확인해 주세요."}), 500

    # 웹사이트에서 보낸 데이터 받기
    user_data = request.json
    
    # Google Gemini API URL (Flash 모델 기준)
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    # Gemini 전용 페이로드 구조로 변경
    prompt_text = (
        f"너는 포스코 퓨처엠의 안전 전문가야. 공사 조건을 보고 주의사항을 알려줘.\n\n"
        f"공사명: {user_data['projectName']}, 금액: {user_data['amount']}억, "
        f"기간: {user_data['period']}개월. 주의할 점 3가지만."
    )

    payload = {
        "contents": [{
            "parts": [{"text": prompt_text}]
        }]
    }

    try:
        # API 호출
        response = requests.post(url, headers=headers, json=payload)
        result = response.json()
        
        # 터미널 출력 (디버깅용)
        print("--- Gemini 응답 내용 ---")
        print(json.dumps(result, indent=2, ensure_ascii=False))
        print("-----------------------")
        
        # Gemini 응답에서 텍스트만 추출하여 JS가 처리하기 쉬운 형태로 반환
        # (참고: Gemini의 응답 구조는 result['candidates'][0]['content']['parts'][0]['text'] 입니다)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)