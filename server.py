from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import requests
import json

# 1. 앱 초기화
app = Flask(__name__)
CORS(app)

# 🚩 환경 설정: 집이면 "HOME", 회사면 "OFFICE"
ENV = "HOME" 

# --- [추가] 동료 접속을 위한 HTML 서빙 로직 ---

@app.route('/')
def index():
    """브라우저에 IP:5000만 쳤을 때 index.html을 보여줍니다."""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    """CSS, JS, 이미지 등 부수적인 파일들을 불러올 수 있게 합니다."""
    return send_from_directory('.', path)

# --- [기존] AI 가이드 API 로직 ---

@app.route('/api/ai-guide', methods=['POST', 'OPTIONS'])
def ai_guide():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        # 1. 데이터 받기
        user_data = request.json
        p_name = user_data.get('projectName', '미지정 공사')
        amount = user_data.get('amount', '0')
        period = user_data.get('period', '0')
        user_q = user_data.get('question', '이 공사의 안전 관리 주의사항을 알려줘.').strip()

        p_info = f"[공사 개요]\n- 공사명: {p_name}\n- 공사금액: {amount}억원\n- 공사기간: {period}개월"
        full_content = f"{p_info}\n\n{user_q}\n\n포스코 퓨처엠 안전 전문가로서 답변해줘."

        # 2. 환경에 따른 분기
        if ENV == "HOME":
            # --- [집] Gemini 설정 ---
            api_key = os.getenv("MY_API_KEY_GOOGLE")
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
            
            payload = {
                "contents": [{"parts": [{"text": full_content}]}]
            }
            
            res = requests.post(url, json=payload)
            res_json = res.json()

            # 'candidates' 안전하게 추출
            if 'candidates' in res_json and len(res_json['candidates']) > 0:
                final_answer = res_json['candidates'][0]['content']['parts'][0]['text']
            elif 'error' in res_json:
                final_answer = f"Gemini API 에러: {res_json['error'].get('message', '알 수 없는 오류')}"
            else:
                final_answer = "AI 응답 구조를 분석할 수 없습니다. API 키나 네트워크를 확인하세요."

        else:
            # --- [회사] POSCO GPT 설정 ---
            api_key_env = os.environ.get("POSCO_GPT_KEY")
            url = "http://aigpt.posco.net/gpgpta01-gpt/gptApi/personalApi"
            headers = {
                "Authorization": f"Bearer {api_key_env}",
                "Content-Type": "application/json"
            }
            payload = {
                "messages": [
                    {"role": "system", "content": "너는 포스코 퓨처엠의 안전 전문가야."},
                    {"role": "user", "content": full_content}
                ],
                "model": "gpt-4o"
            }
            response = requests.post(url, headers=headers, data=json.dumps(payload))
            final_answer = response.text 

        # 3. 결과 반환
        return jsonify({"answer": final_answer})

    except Exception as e:
        print(f"!!! 에러 발생: {str(e)}")
        return jsonify({"answer": f"서버 오류 발생: {str(e)}"}), 200

if __name__ == '__main__':
    # host='0.0.0.0'으로 설정하여 외부(동료 PC) 접속 허용
    app.run(host='0.0.0.0', port=5000, debug=True)