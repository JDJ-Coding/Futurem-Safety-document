# server.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # 웹사이트와 통신을 허용해줍니다.
import os
import requests
import json

app = Flask(__name__)
CORS(app)  # 보안 허용

@app.route('/api/ai-guide', methods=['POST'])
def ai_guide():
    # 1. 환경변수 읽기
    api_key_env = os.environ.get("POSCO_GPT_KEY")
    
    # 웹사이트에서 보낸 데이터 받기
    user_data = request.json
    
    url = "http://aigpt.posco.net/gpgpta01-gpt/gptApi/personalApi"
    
    headers = {
        "Authorization": f"Bearer {api_key_env}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "messages": [
            {
                "role": "system",
                "content": "너는 포스코 퓨처엠의 안전 전문가야. 공사 조건을 보고 주의사항을 알려줘."
            },
            {
                "role": "user",
                "content": f"공사명: {user_data['projectName']}, 금액: {user_data['amount']}억, 기간: {user_data['period']}개월. 주의할 점 3가지만."
            }
        ],
        "model": "gpt-5-chat-lates"
    }

    # API 호출 부분 수정
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    
    # 1. 먼저 결과를 변수에 담습니다.
    result = response.json()
    
    # 2. 터미널에 출력합니다. (이제 진하게 보일 거예요!)
    print("--- AI 응답 내용 ---")
    print(result) 
    print("-------------------")
    
    # 3. 마지막에 화면(JS)으로 보내줍니다.
    return jsonify(result)



if __name__ == '__main__':
    # 내 컴퓨터(localhost) 5000번 포트에서 실행
    app.run(port=5000)
