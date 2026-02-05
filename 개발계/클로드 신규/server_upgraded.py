from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import requests
import json
import logging
from datetime import datetime

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('server.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# 앱 초기화
app = Flask(__name__)
CORS(app)

# 🚩 환경 설정: 집이면 "HOME", 회사면 "OFFICE"
ENV = "HOME"  # "HOME" 또는 "OFFICE"로 설정
logger.info(f"Server starting in {ENV} environment")

# --- HTML 서빙 로직 ---
@app.route('/')
def index():
    """브라우저에 IP:5000만 쳤을 때 index.html을 보여줍니다."""
    logger.info(f"Main page accessed from {request.remote_addr}")
    return send_from_directory('.', 'index_upgraded.html')

@app.route('/<path:path>')
def static_proxy(path):
    """CSS, JS, 이미지 등 부수적인 파일들을 불러올 수 있게 합니다."""
    try:
        return send_from_directory('.', path)
    except Exception as e:
        logger.error(f"Error serving static file {path}: {str(e)}")
        return jsonify({"error": "File not found"}), 404

# --- AI 가이드 API 로직 ---
@app.route('/api/ai-guide', methods=['POST', 'OPTIONS'])
def ai_guide():
    if request.method == 'OPTIONS':
        return '', 200

    start_time = datetime.now()
    client_ip = request.remote_addr
    logger.info(f"AI Guide request from {client_ip}")

    try:
        # 1. 데이터 받기
        user_data = request.json
        if not user_data:
            logger.warning("Empty request data received")
            return jsonify({"answer": "요청 데이터가 없습니다."}), 400

        p_name = user_data.get('projectName', '미지정 공사')
        amount = user_data.get('amount', '0')
        period = user_data.get('period', '0')
        user_q = user_data.get('question', '이 공사의 안전&환경&설비 관리 주의사항을 알려줘.').strip()

        logger.info(f"Processing request - Project: {p_name}, Amount: {amount}억, Period: {period}개월")

        p_info = f"[공사 개요]\n- 공사명: {p_name}\n- 공사금액: {amount}억원\n- 공사기간: {period}개월"
        
        # 사용자가 추가 질문을 입력했는지 확인
        if user_q and user_q != '이 공사의 안전&환경 관리 주의사항을 알려줘.':
            full_content = f"{p_info}\n\n[사용자 문의]\n{user_q}\n\n위 공사에 대해 포스코 퓨처엠 안전&환경&설비 전문가로서 구체적으로 답변해줘."
        else:
            full_content = f"{p_info}\n\n포스코 퓨처엠 안전&환경&설비 전문가로서 이 공사의 주요 안전관리 포인트와 주의사항을 알려줘."

        # 2. 환경에 따른 분기
        if ENV == "HOME":
            logger.info("Using Gemini API")
            api_key = os.getenv("MY_API_KEY_GOOGLE")
            if not api_key:
                logger.error("Gemini API key not found")
                return jsonify({"answer": "❌ API 키가 설정되지 않았습니다. 환경 변수를 확인하세요."}), 500

            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
            
            payload = {
                "contents": [{"parts": [{"text": full_content}]}],
                "generationConfig": {
                    "temperature": 0.7,
                    "topK": 40,
                    "topP": 0.95,
                    "maxOutputTokens": 2048,
                }
            }
            
            res = requests.post(url, json=payload, timeout=30)
            res_json = res.json()

            if 'candidates' in res_json and len(res_json['candidates']) > 0:
                final_answer = res_json['candidates'][0]['content']['parts'][0]['text']
                logger.info(f"Gemini API request successful - Response length: {len(final_answer)} chars")
            elif 'error' in res_json:
                error_msg = res_json['error'].get('message', '알 수 없는 오류')
                logger.error(f"Gemini API error: {error_msg}")
                final_answer = f"❌ Gemini API 에러: {error_msg}"
            else:
                logger.error("Unexpected Gemini API response structure")
                final_answer = "❌ AI 응답 구조를 분석할 수 없습니다. API 키나 네트워크를 확인하세요."

        else:
            logger.info("Using POSCO GPT API")
            api_key_env = os.environ.get("POSCO_GPT_KEY")
            if not api_key_env:
                logger.error("POSCO GPT API key not found")
                return jsonify({"answer": "❌ POSCO GPT API 키가 설정되지 않았습니다."}), 500

            url = "http://aigpt.posco.net/gpgpta01-gpt/gptApi/personalApi"
            headers = {
                "Authorization": f"Bearer {api_key_env}",
                "Content-Type": "application/json"
            }
            payload = {
                "messages": [
                    {"role": "system", "content": "너는 포스코 퓨처엠의 안전&환경&설비 전문가야. 구체적이고 실용적인 답변을 제공해."},
                    {"role": "user", "content": full_content}
                ],
                "model": "gpt-4o",
                "temperature": 0.7
            }
            
            response = requests.post(url, headers=headers, data=json.dumps(payload), timeout=30)
            final_answer = response.text
            logger.info(f"POSCO GPT request successful - Response length: {len(final_answer)} chars")

        # 3. 처리 시간 로깅
        elapsed_time = (datetime.now() - start_time).total_seconds()
        logger.info(f"Request completed in {elapsed_time:.2f} seconds")

        return jsonify({"answer": final_answer})

    except requests.exceptions.Timeout:
        logger.error("API request timeout")
        return jsonify({"answer": "❌ 요청 시간이 초과되었습니다. 다시 시도해주세요."}), 504
    
    except requests.exceptions.RequestException as e:
        logger.error(f"API request error: {str(e)}")
        return jsonify({"answer": f"❌ API 연결 오류: {str(e)}"}), 503
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return jsonify({"answer": f"❌ 서버 오류 발생: {str(e)}"}), 500

# 헬스 체크 엔드포인트
@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "environment": ENV,
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    logger.info("=" * 50)
    logger.info("Server starting...")
    logger.info(f"Environment: {ENV}")
    logger.info(f"Access URL: http://0.0.0.0:5000")
    logger.info("=" * 50)
    
    # host='0.0.0.0'으로 설정하여 외부(동료 PC) 접속 허용
    app.run(host='0.0.0.0', port=5000, debug=True)
