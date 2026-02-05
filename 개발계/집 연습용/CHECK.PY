import requests

api_key = "AIzaSyAIjNXATSWd7nnGljFo8EZ3SEBe3bzCzfM"
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"

response = requests.get(url)
models = response.json()

if 'models' in models:
    print("=== 사용할 수 있는 모델 목록 ===")
    for m in models['models']:
        print(m['name'])
else:
    print("모델 목록을 가져오지 못했습니다. 에러 내용:", models)