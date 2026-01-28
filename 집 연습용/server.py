from flask import Flask, request, jsonify
from flask_cors import CORS
import requests, os, json

app = Flask(__name__)
CORS(app)

# 🚩 집이면 "HOME", 회사면 "OFFICE"로 이것만 바꾸면 끝!
ENV = "HOME" 

@app.route('/api/ai-guide', methods=['POST'])
def ai_guide():
    user_data = request.json
    p_info = f"공사명:{user_data.get('projectName')}, {user_data.get('amount')}억, {user_data.get('period')}개월"

    if ENV == "HOME":
        # [집] Gemini 설정
        api_key = "AIzaSyAIjNXATSWd7nnGljFo8EZ3SEBe3bzCzfM"
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
        payload = {"contents": [{"parts": [{"text": f"{p_info} 안전 주의사항 요약해줘."}]}]}
        res = requests.post(url, json=payload)
        final_answer = res.json()['candidates'][0]['content']['parts'][0]['text']
    else:
        # [회사] POSCO GPT 설정
        api_key = os.environ.get("POSCO_GPT_KEY")
        url = "http://aigpt.posco.net/gpgpta01-gpt/gptApi/personalApi"
        headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
        payload = {
            "messages": [{"role": "user", "content": f"{p_info} 주의사항 알려줘."}],
            "model": "gpt-5-chat-lates"
        }
        res = requests.post(url, headers=headers, data=json.dumps(payload))
        final_answer = res.json()['choices'][0]['message']['content']

    # JS가 읽기 쉽게 "answer"라는 이름으로 통일해서 응답
    return jsonify({"answer": final_answer})

if __name__ == '__main__':
    app.run(port=5000)