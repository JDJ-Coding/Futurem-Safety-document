from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import json

app = Flask(__name__)
CORS(app)

# 🚩 환경 설정: 집이면 "HOME", 회사면 "OFFICE"로 변경하세요.
ENV = "OFFICE" 

@app.route('/api/ai-guide', methods=['POST', 'OPTIONS'])
def ai_guide():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        # 1. 클라이언트(JS)로부터 데이터 받기
        user_data = request.json
        p_name = user_data.get('projectName', '미지정 공사')
        amount = user_data.get('amount', '0')
        period = user_data.get('period', '0')
        
        # [수정] 사용자가 입력한 내용을 가져오되, 공백만 있다면(strip) 기본 질문을 넣습니다.
        user_q = user_data.get('question', '').strip()
        if not user_q:
            user_q = "이 공사의 안전 관리 주의사항과 필수 안전 대책을 알려줘."

        # 2. [개선] AI에게 보낼 프롬프트를 더 명확하게 구성
        # 정보와 질문을 명확히 구분해주면 AI가 더 똑똑하게 답변합니다.
        p_info = f"[공사 개요]\n- 공사명: {p_name}\n- 공사금액: {amount}억원\n- 공사기간: {period}개월"
        
        # 최종적으로 AI에게 전달될 전체 내용
        full_content = f"{p_info}\n\n[상세 요청사항]\n{user_q}\n\n위의 공사 조건과 요청사항을 종합하여 포스코 퓨처엠 안전 전문가로서 답변해줘."

        # 3. 환경(ENV)에 따른 분기 처리
        if ENV == "HOME":
            # --- [집] 사외망용 Gemini 설정 ---
            api_key = "AIzaSyAIjNXATSWd7nnGljFo8EZ3SEBe3bzCzfM"
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
            
            payload = {
                "contents": [{
                    "parts": [{"text": f"너는 포스코 퓨처엠의 안전 전문가야. 아래 정보를 바탕으로 답해줘.\n{full_content}"}]
                }]
            }
            res = requests.post(url, json=payload)
            res_json = res.json()
            # Gemini의 응답 구조에서 텍스트 추출
            final_answer = res_json['candidates'][0]['content']['parts'][0]['text']

        else:
            # --- [회사] 사내망용 POSCO GPT 설정 ---
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
                "model": "gpt-4o"  # 또는 "gpt-5-chat-lates"
            }
            
            # API 호출
            response = requests.post(url, headers=headers, data=json.dumps(payload))
            
            # 요청하신 대로 JSON 파싱 없이 response.text를 그대로 가져옵니다.
            # (만약 포스코 API가 결과 텍스트만 리턴한다면 이 방식이 맞습니다.)
            final_answer = response.text

        # 4. 서버 콘솔에 로그 출력 (디버깅용)
        print("\n" + "="*50)
        print(f"[{ENV} 환경] AI 분석 결과:")
        print(final_answer)
        print("="*50 + "\n")

        # 5. JS가 읽을 수 있도록 JSON 형태로 응답
        return jsonify({"answer": final_answer})

    except Exception as e:
        print(f"!!! 에러 발생: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # host='0.0.0.0'을 추가하면 다른 PC에서도 이 IP로 접속이 가능해집니다.
    app.run(host='0.0.0.0', port=5000, debug=True)
