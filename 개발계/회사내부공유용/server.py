from flask import Flask, request, jsonify, render_template  # [수정] render_template 추가
from flask_cors import CORS
import os
import requests
import json

# [수정] templates와 static 폴더를 명시적으로 지정
app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# 🚩 환경 설정: 집이면 "HOME", 회사면 "OFFICE"로 변경하세요.
ENV = "OFFICE" 

# --- [추가] 동료들이 접속했을 때 index.html을 보여주는 설정 ---
@app.route('/')
def home():
    # templates 폴더 안의 index.html을 읽어서 화면에 띄웁니다.
    return render_template('index.html')

# --- [기존 코드] AI 분석 API ---
@app.route('/api/ai-guide', methods=['POST', 'OPTIONS'])
def ai_guide():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        user_data = request.json
        p_name = user_data.get('projectName', '미지정 공사')
        amount = user_data.get('amount', '0')
        period = user_data.get('period', '0')
        
        user_q = user_data.get('question', '').strip()
        if not user_q:
            user_q = "이 공사의 안전 관리 주의사항과 필수 안전 대책을 알려줘."

        p_info = f"[공사 개요]\n- 공사명: {p_name}\n- 공사금액: {amount}억원\n- 공사기간: {period}개월"
        full_content = f"{p_info}\n\n[상세 요청사항]\n{user_q}\n\n위의 공사 조건과 요청사항을 종합하여 포스코 퓨처엠 안전 전문가로서 답변해줘."

        if ENV == "HOME":
            api_key = os.getenv("MY_API_KEY_GOOGLE")
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
            
            payload = {
                "contents": [{
                    "parts": [{"text": f"너는 포스코 퓨처엠의 안전 전문가야. 아래 정보를 바탕으로 답해줘.\n{full_content}"}]
                }]
            }
            res = requests.post(url, json=payload)
            res_json = res.json()
            final_answer = res_json['candidates'][0]['content']['parts'][0]['text']

        else:
            api_key_env = os.environ.get("POSCO_GPT_KEY")
            url = "http://aigpt.posco.net/gpgpta01-gpt/gptApi/personalApi"
            headers = {
                "Authorization": f"Bearer {api_key_env}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "messages": [
                    {"role": "system", "content": "너는 포스코 퓨처엠의 안전 전문가야. 제공된 공사 정보를 바탕으로 질문에 전문적으로 답변해."},
                    {"role": "user", "content": full_content}
                ],
                "model": "gpt-4o"
            }
            
            response = requests.post(url, headers=headers, data=json.dumps(payload))
            final_answer = response.text

        print("\n" + "="*50)
        print(f"[{ENV} 환경] AI 분석 결과:")
        print(final_answer)
        print("="*50 + "\n")

        return jsonify({"answer": final_answer})

    except Exception as e:
        print(f"!!! 에러 발생: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # host='0.0.0.0'으로 설정해야 다른 PC에서 접속 가능합니다.
    app.run(host='0.0.0.0', port=5000, debug=True)
