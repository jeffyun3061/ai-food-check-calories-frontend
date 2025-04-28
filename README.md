📄 README.md (AI Food Check Calories - Frontend)
markdown
복사
편집
# 🍽️ AI Food Check Calories - Frontend

AI를 활용해 **음식 사진을 업로드**하면  
**탄수화물, 단백질, 지방, 칼로리**를 분석해주는 서비스의 프론트엔드입니다.

> ✅ 실제 음식 사진을 분석하는 것처럼 자연스러운 결과를 제공하며,  
> ✅ 하루 권장 칼로리 가이드도 함께 안내합니다.

---

## 🚀 주요 기능

- 음식 사진을 업로드하여 AI 분석 요청
- AI가 예측한 탄단지 및 총 칼로리 결과 제공
- 성인 기준 하루 권장 칼로리 안내 문구 출력

---

## 🛠️ 기술 스택

- **Next.js 14** (React 기반)
- **TypeScript**
- **Axios** (API 호출)
- **Tailwind CSS** (기본 스타일링)

---

## ⚙️ 프로젝트 실행 방법

1. 레포지토리 클론

```bash
git clone https://github.com/jeffyun3061/ai-food-check-calories-frontend.git
cd ai-food-check-calories-frontend
패키지 설치

bash
복사
편집
npm install
.env 파일 생성 후 환경변수 설정

bash
복사
편집
NEXT_PUBLIC_API_URL=http://localhost:8000
개발 서버 실행

bash
복사
편집
npm run dev
브라우저에서 접속

arduino
복사
편집
http://localhost:3000
📷 화면 예시

파일 선택	분석 결과
음식 사진 업로드 화면	분석된 탄단지 및 칼로리 결과 표시
📢 참고
백엔드 서버가 별도로 필요합니다.

AI Food Check Calories Backend 레포지토리 참고

백엔드는 Django + OpenAI API를 사용하여 음식 이미지를 분석합니다.

✨ 프로젝트 목표
AI를 활용해 음식 사진 분석을 실제로 구현해 보는 것

직관적이고 누구나 사용하기 쉬운 서비스 제공

"사진을 업로드하면 영양 성분이 바로 분석되는" 경험 제공

