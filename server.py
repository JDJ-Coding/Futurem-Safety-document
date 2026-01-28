from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/ai-guide', methods=['POST', 'OPTIONS'])
def ai_guide():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        api_key_env = os.environ.get("POSCO_GPT_KEY")
        user_data = request.json
        
        url = "http://aigpt.posco.net/gpgpta01-gpt/gptApi/personalApi"
        headers = {
            "Authorization": f"Bearer {api_key_env}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "messages": [
                {"role": "system", "content": "너는 포스코 퓨처엠의 안전 전문가야."},
                {"role": "user", "content": f"공사: {user_data.get('projectName')}, 금액: {user_data.get('amount')}억"}
            ],
            "model": "gpt-4o" 
        }

        # API 호출
        response = requests.post(url, headers=headers, data=json.dumps(payload))

        # [수정 핵심] JSON이 아니라 텍스트로 바로 받습니다.
        ai_text = response.text 

        print("\n" + "="*50)
        print("AI가 보내온 답변:")
        print(ai_text)
        print("="*50 + "\n")

        # 자바스크립트가 읽기 편하게 JSON 형태로 감싸서 보내줍니다.
        return jsonify({"answer": ai_text})

    except Exception as e:
        print(f"!!! 에러 발생: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
