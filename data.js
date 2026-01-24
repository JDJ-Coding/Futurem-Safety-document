/**

2026년 안전&환경 체크리스트 데이터 (data.js)

원본 파일의 모든 데이터를 그대로 보존했습니다.
*/

const checklistData = {
1: {
title: "Ⅰ. 안전&환경 (자사 기준)",
items: [
{ name: "유해화학물질 취급 도급신고", status: "●", description: "양극재 공장 필수\n(단독 건물 제외: 전기실, 유틸리티동 등)", exemption: "별도 건물 신축 제외", remark: "자사 양극재 공정과정에서 필수", baseAmount: 0, basePeriod: 0, legal: "화관법 제31조" },
{ name: "유해화학물질 취급담당자 교육 + MSDS 교육 (통합)", status: "●", description: "교육증 첨부: 온라인 8h + 오프라인 8h 가능\nMSDS 자체 교육 후 서명본 및 MSDS 원본 첨부", exemption: "화학물질 미사용 공사 시 면제", remark: "통합하여 "화학물질 관리 교육"으로 통칭 가능\n산안법 제114조(MSDS) + 화관법 제33조(유해화학물질담당자) 동시 충족", baseAmount: 0, basePeriod: 0, legal: "화관법 제33조, 산안법 제114조" },
{ name: "특별교육(안전보건플랫폼 자료 활용)", status: "●", description: "특정 작업 해당 시 실시 결과보고서", exemption: "해당 공종 없을 시 면제", remark: "자사 양식 활용. 고소작업, 타워크레인 등 특정공종이 포함될 경우 필수", baseAmount: 0, basePeriod: 0, legal: "산안법 제29조" },
{ name: "D-1 회의 참석(일정)", status: "●", description: "작업 전일 회의 참석 기록\n(발주처/정비섹션 주관)", exemption: "해당 없음", remark: "자사 규정에 따른 필수 참석 항목", baseAmount: 0, basePeriod: 0, legal: "사규" },
{ name: "안심건강인증제(건강검진결과)", status: "○", description: "50대 이상 작업자 투입 시\n최근 6개월 내 건강검진 결과지", exemption: "50대 미만만 투입할 경우 면제", remark: "특수건강검진 또는 일반건강검진 인정\n외국인 작업자는 별도 확인", baseAmount: 0, basePeriod: 0, legal: "산안법 제129조" },
{ name: "보호구역 출입 보안서약서", status: "●", description: "현장 출입 인원 전원 보안 서약서\n(자사 핵심기술 보호)", exemption: "해당 없음", remark: "핵심기술 관련 구역 출입 인원 전수 작성 필수\n자사 규정 양식 사용", baseAmount: 0, basePeriod: 0, legal: "사규" }
]
},
2: {
title: "Ⅱ. 시공계획서 (착공 30일 전)",
items: [
{ name: "공사 개요서", status: "●", description: "공사명, 공사금액, 공사예정기간\n공사장소, 공사범위, 도급체계 (발주청 기준)", exemption: "해당 없음", remark: "건진법 시행규칙 별지 제101호 양식 사용 필수", baseAmount: 20, basePeriod: 0, reference: "참고표 3", legal: "건진법 제62조" },
{ name: "세부공정표", status: "●", description: "일자별 상세 공정 스케줄\n(Gantt Chart 형식)", exemption: "해당 없음", remark: "타 공종 간섭 명시 필수", baseAmount: 0, basePeriod: 0, legal: "건진법 제62조" },
{ name: "시공 상세도면 및 레이아웃", status: "●", description: "평면도, 단면도, Isometric도 등", exemption: "해당 없음", remark: "발주처 승인도면 기반", baseAmount: 0, basePeriod: 0, legal: "건진법 제62조" },
{ name: "시공 절차 및 방법서", status: "●", description: "공정별 상세 시공 공법 설명서", exemption: "해당 없음", remark: "자사 표준 시공법 명시", baseAmount: 0, basePeriod: 0, legal: "건진법 제62조" },
{ name: "현장 조직도 및 비상연락망", status: "●", description: "직책별 비상연락망", exemption: "해당 없음", remark: "24시간 연락처 필수", baseAmount: 0, basePeriod: 0, legal: "산안법 제15, 17조" },
{ name: "인력 투입 계획서", status: "●", description: "공종별 인원수 리스트", exemption: "해당 없음", remark: "투입 예정 기간별 작성", baseAmount: 0, basePeriod: 0, legal: "산안법 제31조" },
{ name: "장비 투입 계획서 및 제원표", status: "○", description: "투입 장비 목록 및 사양서", exemption: "장비 미투입 시 면제", remark: "주요 양중기 카탈로그 필수", baseAmount: 0, basePeriod: 0, legal: "건진법 제62조" },
{ name: "작업안전분석(JSA) / 위험성평가서", status: "●", description: "단위 작업별 위험요인 대책", exemption: "해당 없음", remark: "자체 양식 활용 가능", baseAmount: 0, basePeriod: 0, legal: "산안법 제36조" },
{ name: "안전관리 계획서", status: "●", description: "현장 안전점검 대책", exemption: "해당 없음", remark: "정비섹션 점검 일정 포함", baseAmount: 0, basePeriod: 0, legal: "산안법" },
{ name: "품질관리 계획서", status: "●", description: "자재 검수 및 품질 검사 기준", exemption: "2억 미만 간소화 가능", remark: "배관 비파괴검사 기준 명시", baseAmount: 20, basePeriod: 0, legal: "건진법 제55조" },
{ name: "환경관리 계획서", status: "●", description: "폐기물 및 소음 방지 대책", exemption: "해당 없음", remark: "양극재 공장 특성 반영", baseAmount: 0, basePeriod: 0, legal: "환경영향평가법" },
{ name: "인허가 계획 및 신고증 사본", status: "○", description: "관련 신고서 및 승인증", exemption: "해당 없을 시 면제", remark: "대기배출허가 확인", baseAmount: 0, basePeriod: 0, legal: "관련법령" },
{ name: "고위험작업계획서(상세)", status: "○", description: "고위험 공종별 상세 계획", exemption: "해당 공종 없을 시 면제", remark: "정비섹션 승인 필수", baseAmount: 0, basePeriod: 0, legal: "사규" },
{ name: "비상대응계획서(ERP)", status: "○", description: "시나리오별 구호체계", exemption: "해당 없음", remark: "화학물질 누출 필수 포함", baseAmount: 0, basePeriod: 0, legal: "산안법/화관법" },
{ name: "시운전 계획서", status: "○", description: "설비 시운전 절차", exemption: "부품 교체 시 면제", remark: "신규 설치 시 필수", baseAmount: 0, basePeriod: 0, legal: "산안법" },
{ name: "LOTO 설치 계획서", status: "○", description: "에너지 격리 위치/방법", exemption: "단독 작업 시 면제", remark: "정비섹션 협의 필수", baseAmount: 0, basePeriod: 0, legal: "산안법 제23조" },
{ name: "공사안내문 및 표지판 설치 계획", status: "○", description: "현장 설치 예정 위치도", exemption: "해당 없음", remark: "단계별 설치 일정", baseAmount: 0, basePeriod: 0, legal: "산안법" }
]
},
3: {
title: "Ⅲ. 착공계 (착공 직전 1일 전)",
items: [
{ name: "착공 신고서", status: "●", description: "공사 착수 보고 공식 공문", exemption: "해당 없음", remark: "발주처 공식 제출", baseAmount: 0, basePeriod: 0, legal: "건진법" },
{ name: "현장대리인 선임계 및 증빙", status: "●", description: "선임계(4종세트):\n선임계+경력서+자격증+재직증명서", exemption: "기준 상이", remark: "누락 시 반려 (사전 직무교육 확인 필수)", baseAmount: 0, basePeriod: 0, reference: "참고표 1", legal: "건진법" },
{ name: "일용근로자 근로계약서 사본", status: "○", description: "투입 일용직 근로자 계약서", exemption: "전원 정규직 투입 시 면제", remark: "외국인 비자 만료 여부 확인 필수", baseAmount: 0, basePeriod: 0, legal: "근로기준법 제17조" },
{ name: "4대보험 가입증명원", status: "●", description: "사업장 고용/산재보험 가입 증명서", exemption: "해당 없음", remark: "건설현장 단위 최신본 제출", baseAmount: 0, basePeriod: 0, legal: "고용산재보험법" },
{ name: "하도급 승인 신청서 및 계약서", status: "○", description: "하도급사 정보 및 계약서 사본", exemption: "직영 공사(하도급 없음) 시 면제", remark: "재하도급은 원칙적 금지", baseAmount: 0, basePeriod: 0, legal: "건산법 제29조" },
{ name: "안전관리비 사용계획서", status: "●", description: "법정 요율에 따른 집행 계획서", exemption: "2억 미만 공사 시 간소화 가능", remark: "품목별 요율 준수 확인 필수", baseAmount: 20, basePeriod: 0, reference: "참고표 3", legal: "산안법 제72조" },
{ name: "안전관리자 선임 신고서", status: "○", description: "노동청 날인된 선임 신고증", exemption: "50억 미만 공사 선임 의무 면제", remark: "상시 전담 여부 확인", baseAmount: 50, basePeriod: 0, reference: "참고표 2", legal: "산안법 제16, 17조" },
{ name: "재해예방 기술지도 계약서", status: "○", description: "외부 전문기관 기술지도 계약 사본", exemption: "1억 또는 1개월 미만 공사 면제", remark: "안전관리자 선임 시 기술지도 면제", baseAmount: 1, basePeriod: 1, legal: "산안법 제73조" },
{ name: "건설업 기초안전보건교육 이수증", status: "○", description: "신규 투입 작업자별 교육 이수 카드", exemption: "사전 이수자 면제", remark: "4시간 법정 필수 교육", baseAmount: 0, basePeriod: 0, legal: "산안법 제31조" },
{ name: "건설기계 조종사 자격 및 검사증", status: "○", description: "면허증 및 기계 정기검사증", exemption: "중장비 미사용 시 면제", remark: "유효기간 확인 (만료 시 투입 금지)", baseAmount: 0, basePeriod: 0, legal: "건설기계관리법" },
{ name: "전문공사업 등록증 사본", status: "○", description: "해당 공종 관련 면허증", exemption: "해당 없을 시 면제", remark: "업종 적격성 재확인", baseAmount: 0, basePeriod: 0, legal: "관련 공사업법" }
]
},
4: {
title: "Ⅳ. 착공 시 (당일)",
items: [
{ name: "필수안전교육", status: "●", description: "착공 당일 안전환경그룹 주관 교육", exemption: "해당 없음", remark: "참석자 전원 서명부 작성", baseAmount: 0, basePeriod: 0, legal: "산안법" },
{ name: "안전작업허가서", status: "●", description: "현장 당일 작업 승인 문서", exemption: "해당 없음", remark: "정비섹션 최종 승인 날인 필수", baseAmount: 0, basePeriod: 0, legal: "산안법/사규" },
{ name: "TBM (Tool Box Meeting)", status: "●", description: "작업 전 안전 미팅 기록부", exemption: "해당 없음", remark: "당일 위험요소 공유 기록", baseAmount: 0, basePeriod: 0, legal: "산안법" },
{ name: "위험성평가서(JSA) 활용", status: "●", description: "기 수립된 위험 대책의 현장 확인", exemption: "해당 없음", remark: "현장 이행 상태 점검", baseAmount: 0, basePeriod: 0, legal: "산안법 제36조" }
]
}
};

const referenceData = {
"참고표 1": {
title: "공사금액별 현장대리인 자격 기준",
data: [
["공사예정금액", "자격기준", "필요 경력"],
["700억 원 이상", "기술사", "-"],
["500억~700억 원", "기술사 또는 기능장", "기술사 또는 5년 이상 경력"],
["300억~500억 원", "기술사, 기능장, 또는 기사", "기사 10년 이상 경력"],
["100억~300억 원", "기사 이상", "기사 5년 이상 또는 산업기사 7년 이상"],
["30억~100억 원", "기사 이상", "기사 3년 이상 또는 산업기사 5년 이상"],
["30억 미만", "산업기사 이상 또는 해당 업종 등록기준 기술능력자", "3년 이상 경력"]
]
},
"참고표 2": {
title: "공사금액별 안전관리자 선임 기준",
data: [
["공사예정금액", "선임 인원", "선임 방법"],
["50억~120억 원", "1명 이상", "별표 4 기준 중 택1"],
["120억~800억 원", "1명 이상", "전담 의무"],
["800억~1,500억 원", "2명 이상", "전담 의무"],
["1,500억~2,200억 원", "3명 이상", "전담 의무"],
["50억 미만", "배치 면제", "기술지도 대상"]
]
},
"참고표 3": {
title: "안전관리비 계상기준",
data: [
["공사금액", "안전관리비율", "간소화 여부", "특기사항"],
["5천만~2억 원", "0.9%", "간소화 가능", "기초안전보건교육비 등 포함"],
["2억~5억 원", "0.7%", "기본 적용", "본사 사용비 5% 이내"],
["5억~50억 원", "0.5%", "기본 적용", "전담 관리비 포함"],
["50억 원 이상", "0.3%", "기본 적용", "전기/통신공사 요율 상이"]
]
}
};