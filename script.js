// Comprehensive Data Structure
const checklistData = {
    1: {
        title: "Ⅰ. 안전&환경 (자사 기준)",
        items: [
            { name: "유해화학물질 취급 도급신고", status: "●", description: "양극재 공장 필수\n(단독 건물 제외: 전기실, 유틸리티동 등)", exemption: "별도 건물 신축 제외", remark: "자사 양극재 공정과정에서 필수", baseAmount: 0, basePeriod: 0, legal: "화관법 제31조" },
            { name: "유해화학물질 취급담당자 교육 + MSDS 교육 (통합)", status: "●", description: "교육증 첨부: 온라인 8h + 오프라인 8h 가능\nMSDS 자체 교육 후 서명본 및 MSDS 원본 첨부", exemption: "화학물질 미사용 공사 시 면제", remark: "통합하여 \"화학물질 관리 교육\"으로 통칭 가능\n산안법 제114조(MSDS) + 화관법 제33조(유해화학물질담당자) 동시 충족", baseAmount: 0, basePeriod: 0, legal: "화관법 제33조, 산안법 제114조" },
            { name: "특별교육(안전보건플랫폼 자료 활용)", status: "●", description: "특정 작업 해당 시 실시 결과보고서", exemption: "해당 공종 없을 시 면제", remark: "자사 양식 활용. 고소작업, 타워크레인 등 특정공종이 포함될 경우 필수", baseAmount: 0, basePeriod: 0, legal: "산안법 제29조" },
            { name: "D-1 회의 참석(일정)", status: "●", description: "작업 전일 회의 참석 기록\n(발주처/정비섹션 주관)", exemption: "해당 없음", remark: "자사 규정에 따른 필수 참석 항목", baseAmount: 0, basePeriod: 0, legal: "사규" },
            { name: "안심건강인증제(건강검진결과)", status: "○", description: "50대 이상 작업자 투입 시\n최근 6개월 내 건강검진 결과지", exemption: "50대 미만만 투입할 경우 면제", remark: "특수건강검진 또는 일반건강검진 인정\n외국인 작업자는 별도 확인", baseAmount: 0, basePeriod: 0, legal: "산안법 제129조" },
            { name: "보호구역 출입 보안서약서", status: "●", description: "현장 출입 인원 전원 보안 서약서\n(자사 핵심기술 보호)", exemption: "해당 없음", remark: "핵심기술 관련 구역 출입 인원 전수 작성 필수\n자사 규정 양식 사용", baseAmount: 0, basePeriod: 0, legal: "사규" }
        ]
    },
    2: {
        title: "Ⅱ. 시공계획서 (착공 30일 전)",
        items: [
            { name: "공사 개요서", status: "●", description: "공사명, 공사금액, 공사예정기간\n공사장소, 공사범위, 도급체계 (발주청 기준)", exemption: "해당 없음", remark: "건진법 시행규칙 별지 제101호 양식 사용 필수\n공사금액이 2억 원 이상인 경우 유해위험방지계획서 제출 대상", baseAmount: 20, basePeriod: 0, reference: "참고표 3", legal: "건진법 제62조" },
            { name: "세부공정표", status: "●", description: "일자별 상세 공정 스케줄\n(Gantt Chart 형식) 및 주요 공종별 시공 순서", exemption: "해당 없음", remark: "타 공종(전기, 소방 등) 간섭 명시 필수\n타이트한 공정은 주간 단위로 작성", baseAmount: 0, basePeriod: 0, legal: "건진법 제62조" },
            { name: "시공 상세도면 및 레이아웃", status: "●", description: "평면도, 단면도, Isometric도 등\n현장 시공도면", exemption: "해당 없음", remark: "발주처 승인도면 기반\n설계변경 시 수정도면 제출 필수", baseAmount: 0, basePeriod: 0, legal: "건진법 제62조" },
            { name: "시공 절차 및 방법서", status: "●", description: "공정별 상세 시공 공법 설명서\n(양극재, 배관 등)", exemption: "해당 없음", remark: "자사 표준 시공법 또는\n발주처 요구 시공법 명시", baseAmount: 0, basePeriod: 0, legal: "건진법 제62조" },
            { name: "현장 조직도 및 비상연락망", status: "●", description: "현장대리인, 안전관리자,\n품질관리자 등 직책별 비상연락망", exemption: "해당 없음", remark: "24시간 연락 가능한 휴대폰 번호 필수 기재", baseAmount: 0, basePeriod: 0, legal: "산안법 제15, 17조" },
            { name: "인력 투입 계획서", status: "●", description: "공종별 인원수 및 자격/숙련도 리스트\n(일용직, 정규직 구분)", exemption: "해당 없음", remark: "투입 예정 기간별 인력현황 표 형식", baseAmount: 0, basePeriod: 0, legal: "산안법 제31조" },
            { name: "장비 투입 계획서 및 제원표", status: "○", description: "투입 장비 목록 및 상세 사양서(카탈로그)\n기술사 확인서 (가설구조물의 경우)", exemption: "장비 미투입(인력 시공만) 시 면제", remark: "타워크레인, 양중기, 고소작업대 등 주요 양중기 포함 시 제조사 카탈로그 필수", baseAmount: 0, basePeriod: 0, legal: "건설기계관리법, 건진법 제62조 제11항" },
            { name: "작업안전분석(JSA) / 위험성평가서", status: "●", description: "단위 작업별 위험요인 및\n감소대책 수립 (공종별 세분화)", exemption: "해당 없음", remark: "자체 양식 활용 가능\n타 공종 간섭 부분 특히 명시", baseAmount: 0, basePeriod: 0, legal: "산안법 제36조" },
            { name: "안전관리 계획서", status: "●", description: "현장 안전점검 및 사고예방 대책\n비상상황 대응 절차", exemption: "해당 없음", remark: "발주처/정비섹션의 안전점검 일정 포함", baseAmount: 0, basePeriod: 0, legal: "산안법" },
            { name: "품질관리 계획서", status: "●", description: "자재 검수(배관, 용접 등) 및\n시공 품질 검사 기준", exemption: "2억 원 미만 공사 간소화 가능\n(주요 검사항목만 명시)", remark: "배관 비파괴검사/내압시험 기준 명시\n양극재 공사의 경우 양성판정 조건 명확히", baseAmount: 20, basePeriod: 0, legal: "건진법 제55조" },
            { name: "환경관리 계획서", status: "●", description: "폐기물 처리, 소음/분진(비산) 방지\n수질오염 예방 대책", exemption: "해당 없음", remark: "양극재 공사의 특성상\n화학물질 폐기 관리 필수", baseAmount: 0, basePeriod: 0, legal: "환경영향평가법" },
            { name: "인허가 계획 및 신고증 사본", status: "○", description: "대기, 공작물, 고압가스 등 관련 신고서\n(해당할 경우) 및 승인증", exemption: "해당 없을 시 면제", remark: "양극재 공정에서 화학물질 배출 시\n대기배출허가 확인", baseAmount: 0, basePeriod: 0, legal: "관련법령" },
            { name: "고위험작업계획서(상세)", status: "○", description: "화재, 질식, 고소작업, 중량물 취급 등\n고위험 공종별 상세 계획", exemption: "해당 공종 없을 시 면제", remark: "정비섹션 승인 필수. 자사 양식 활용\n고소작업(2m 이상), 밀폐공간, 양중기 운영 등이 포함될 경우 필수", baseAmount: 0, basePeriod: 0, legal: "사규" },
            { name: "비상대응계획서(ERP)", status: "○", description: "화재/폭발, 화학물질 누출,\n인명사고 시나리오별 구호체계 및 대피로", exemption: "해당 위험 공종 없을 시 면제", remark: "양극재 공장의 경우\n화학물질 누출 시나리오 필수 포함", baseAmount: 0, basePeriod: 0, legal: "산안법/화관법" },
            { name: "시운전 계획서", status: "○", description: "전기·기계 설비 시운전 절차 및\n안전 체크리스트", exemption: "단순 부품 교체만 시행할 경우 면제", remark: "신규 설비 설치 또는 기존 설비 개조 시 필수", baseAmount: 0, basePeriod: 0, legal: "산안법" },
            { name: "LOTO 설치 계획서", status: "○", description: "에너지 격리(잠금/표지) 위치 및 방법\n(타워크레인, 양중기 등)", exemption: "단독 작업으로 필요 없을 시 면제", remark: "기존설비 간섭 시 정비섹션 협의 필수", baseAmount: 0, basePeriod: 0, legal: "산안법 제23조" },
            { name: "공사안내문 및 표지판 설치 계획", status: "○", description: "현장 설치 예정 표지판 종류,\n위치도, 설치 일정", exemption: "해당 없음", remark: "공사 진행 상황에 따른\n단계별 표지판 교체 일정 포함", baseAmount: 0, basePeriod: 0, legal: "산안법" }
        ]
    },
    3: {
        title: "Ⅲ. 착공계 (착공 직전 1일 전)",
        items: [
            { name: "착공 신고서", status: "●", description: "공사 착수 보고 공식 공문\n(발주처 제출용)", exemption: "해당 없음", remark: "공문 형식으로 발주처 공식 제출 필수", baseAmount: 0, basePeriod: 0, legal: "건진법" },
            { name: "현장대리인 선임계 및 증빙", status: "●", description: "선임계(4종세트):\n선임계 + 경력서 + 자격증 + 재직증명서", exemption: "공사금액 또는 공기에 따라\n자격 기준 상이", remark: "하나라도 누락 시 반려\n자격조건 사전 확인 필수", baseAmount: 0, basePeriod: 0, reference: "참고표 1", legal: "건진법" },
            { name: "일용근로자 근로계약서 사본", status: "○", description: "투입 일용직 근로계약서 사본", exemption: "정규직 투입 시 면제 가능\n(재직증명서로 대체)", remark: "외국인 근로자의 경우\n비자 확인 서류 추가 필수", baseAmount: 0, basePeriod: 0, legal: "근로기준법 제17조" },
            { name: "4대보험 가입증명원", status: "●", description: "고용보험 + 산재보험\n각각의 가입 증명서", exemption: "해당 없음", remark: "사업장 승인번호 및 보험료 납부 현황 확인\n월별 변동사항 있을 시 최신본 제출", baseAmount: 0, basePeriod: 0, legal: "고용산재보험법" },
            { name: "하도급 승인 신청서 및 계약서", status: "○", description: "하도급 계약서 사본 및\n하도급사 정보 (사업자등록증, 기술인 자격증 등)", exemption: "하도급 없을 시 면제\n자신이 원도급사로부터 받은 범위 내에서만 하도급 가능", remark: "재하도급 절대 금지\n(예외: 전문건설업자가 같은 전문공사를 다른 전문건설업자에게 위탁하는 경우만 가능, 발주처 승낙 필수, 공사금액 20% 이내)", baseAmount: 0, basePeriod: 0, legal: "건산법 제29조" },
            { name: "안전관리비 사용계획서", status: "●", description: "법정 안전관리비 계상 및\n월별 집행 계획", exemption: "2억 원 미만 공사 간소화 가능\n(안전관리비 최소 계상, 품질관리 등 항목 생략 가능)", remark: "요율 준수 확인: 5천만~2억(0.9%), 2억~5억(0.7%), 5억~50억(0.5%), 50억 이상(0.3%)", baseAmount: 20, basePeriod: 0, reference: "참고표 3", legal: "산안법 제72조" },
            { name: "안전관리자 선임 신고서", status: "○", description: "노동청 날인본\n(안전관리자 배치 시만 필수)", exemption: "공사금액 50억 원 이상: 반드시 배치 의무\n선임 인원 기준 참조", remark: "선임 시 기술지도 면제 가능\n전담 배치 여부는 공사금액에 따라 결정됨", baseAmount: 50, basePeriod: 0, reference: "참고표 2", legal: "산안법 제16조·제17조, 시행령 별표3" },
            { name: "재해예방 기술지도 계약서", status: "○", description: "외부 전문기관과의 기술지도 계약서\n(안전관리자 미선임 시 필수)", exemption: "1억 원 미만 or 1개월 미만 공사 면제\n또는 안전관리자 선임 시 면제", remark: "기술지도 기관의 신분증, 자격증,\n계약서 사본 제출", baseAmount: 1, basePeriod: 1, legal: "산안법 제73조" },
            { name: "건설업 기초안전보건교육 이수증", status: "○", description: "작업자별 교육 이수 카드\n(앞/뒷면 사본)", exemption: "정규직(재직증명서로 확인 가능한 자)\n대체 가능", remark: "온라인/오프라인 구분\n4시간 필수", baseAmount: 0, basePeriod: 0, legal: "산안법 제31조" },
            { name: "건설기계 조종사 자격 및 검사증", status: "○", description: "지게차, 타워크레인, 양중기 등의\n면허증 및 기계 검사증", exemption: "장비 미사용 시 면제", remark: "유효기간 만료 전 갱신 필수\n기계 정기점검 기록 포함", baseAmount: 0, basePeriod: 0, legal: "건설기계관리법" },
            { name: "전문공사업 등록증 사본", status: "○", description: "전기공사, 소방공사, 통신공사 등\n관련 전문건설업 면허증", exemption: "전문공사 미포함 시 면제", remark: "업종 적격성 확인\n타사 전문공사 하도급 시 해당 업체의 등록증 필수", baseAmount: 0, basePeriod: 0, legal: "관련 공사업법" }
        ]
    },
    4: {
        title: "Ⅳ. 착공 시 (당일)",
        items: [
            { name: "필수안전교육", status: "●", description: "안전환경그룹 요청 시\n현장에서 실시(1~1.5시간)", exemption: "해당 없음", remark: "정비섹션 주관\n교육 참석자 명부 작성 및 서명 필수", baseAmount: 0, basePeriod: 0, legal: "산안법" },
            { name: "안전작업허가서", status: "●", description: "정비섹션 양식에 따른\n당일 작업 승인서", exemption: "해당 없음", remark: "정비섹션 승인 필수\n자사 규정 양식 사용. 각 작업 유형별로 작성", baseAmount: 0, basePeriod: 0, legal: "산안법/사규" },
            { name: "TBM (Tool Box Meeting)", status: "●", description: "정비섹션 양식에 따른\n당일 작업팀 안전 미팅 기록", exemption: "해당 없음", remark: "정비섹션 주관\n당일 투입 작업자 전원 참석, 작업 내용 및 위험요소 공유", baseAmount: 0, basePeriod: 0, legal: "산안법" },
            { name: "위험성평가서(JSA) 활용", status: "●", description: "시공계획서 기반\n당일 점검 및 실행", exemption: "해당 없음", remark: "시공계획서 내 위험성평가 내용을 현장에서 재확인하고 추가 위험요소 파악", baseAmount: 0, basePeriod: 0, legal: "산안법 제36조" }                    
        ]
    }
};

// Reference tables data
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
            ["50억~120억 원", "1명 이상", "별표 4 제1~7호, 제10~12호 중 택1"],
            ["120억~800억 원", "1명 이상", "별표 4 제1~7호, 제10호 중 택1 (전담 의무)"],
            ["800억~1,500억 원", "2명 이상", "같음 (전담 의무)"],
            ["1,500억~2,200억 원", "3명 이상", "별표 4 제1~7호 중 택1, 산업안전지도사 1명 이상"],
            ["50억 미만", "배치 면제", "안전관리자 선임 불요"]
        ]
    },
    "참고표 3": {
        title: "안전관리비 계상기준",
        data: [
            ["공사금액", "안전관리비율", "간소화 여부", "특기사항"],
            ["5천만~2억 원", "0.9%", "간소화 적용 가능", "의료비, 기타 비용 생략 가능"],
            ["2억~5억 원", "0.7%", "기본 적용", "모든 항목 포함"],
            ["5억~50억 원", "0.5%", "기본 적용", "모든 항목 포함"],
            ["50억 원 이상", "0.3%", "기본 적용", "모든 항목 포함"]
        ]
    }
};

// Utility functions - 정합성 검증
function getStatusDisplay(status, item, amount, period) {
    // ● = 항상 필수 (조건 없음)
    if (status === "●") {
        return { text: "필수", class: "required" };
    }
    
    // ○ = 조건부 필수
    if (status === "○") {
        // baseAmount와 basePeriod 모두 0이면 = 항상 "확인 필요"
        if (item.baseAmount === 0 && item.basePeriod === 0) {
            return { text: "확인 필요", class: "check" };
        }
        
        // baseAmount 조건만 있을 때 (예: 20억 이상)
        if (item.baseAmount > 0 && item.basePeriod === 0) {
            if (amount >= item.baseAmount) {
                return { text: "필수", class: "required" };
            } else {
                return { text: "미해당", class: "exempt" };
            }
        }
        
        // basePeriod 조건만 있을 때 (예: 1개월 이상)
        if (item.baseAmount === 0 && item.basePeriod > 0) {
            if (period >= item.basePeriod) {
                return { text: "필수", class: "required" };
            } else {
                return { text: "미해당", class: "exempt" };
            }
        }
        
        // baseAmount와 basePeriod 모두 있을 때 (둘 다 만족해야 필수)
        if (item.baseAmount > 0 && item.basePeriod > 0) {
            if (amount >= item.baseAmount && period >= item.basePeriod) {
                return { text: "필수", class: "required" };
            } else {
                return { text: "미해당", class: "exempt" };
            }
        }
        
        return { text: "확인 필요", class: "check" };
    }
    
    return { text: "확인 필요", class: "check" };
}

// 렌더링 캐시 추가
const renderedSteps = {};

// 각 단계별 필수 서류 개수 계산
function calculateRequiredDocuments(step, amount, period) {
    const stepData = checklistData[step];
    if (!stepData) return 0;
    
    let count = 0;
    stepData.items.forEach(item => {
        const statusDisplay = getStatusDisplay(item.status, item, amount, period);
        if (statusDisplay.class === "required") {
            count++;
        }
    });
    return count;
}

// 모든 단계의 필수 서류 개수 업데이트
function updateDocumentCounts(amount, period) {
    for (let i = 1; i <= 4; i++) {
        const count = calculateRequiredDocuments(i, amount, period);
        const countElement = document.getElementById(`count${i}`);
        if (countElement) {
            countElement.textContent = `(필수 ${count}개)`;
        }
    }
}

function generateAllPages() {
    const amount = parseFloat(document.getElementById("contractAmount").value);
    const period = parseFloat(document.getElementById("contractPeriod").value);

    // 모든 step 렌더링
    for (let i = 1; i <= 4; i++) {
        renderStep(i);
    }

    // 첫 번째 탭만 시각적으로 활성화 (다른 step 콘텐츠는 DOM에 유지)
    for (let i = 1; i <= 4; i++) {
        if (i === 1) {
            document.getElementById(`step${i}`).classList.add('active');
            document.querySelectorAll('.step-tab')[i-1].classList.add('active');
        } else {
            // active 클래스는 제거하되, innerHTML은 유지됨
            document.getElementById(`step${i}`).classList.remove('active');
            document.querySelectorAll('.step-tab')[i-1].classList.remove('active');
        }
    }
}

function switchStep(step) {
    // Hide all steps
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`step${i}`).classList.remove('active');
        document.querySelectorAll('.step-tab')[i-1].classList.remove('active');
    }
    
    // Show selected step
    document.getElementById(`step${step}`).classList.add('active');
    document.querySelectorAll('.step-tab')[step-1].classList.add('active');
    
    // Generate table for this step
    renderStep(step);
}

function renderStep(step) {
    const stepContainer = document.getElementById(`step${step}`);
    const amount = parseFloat(document.getElementById("contractAmount").value);
    const period = parseFloat(document.getElementById("contractPeriod").value);
    
    const stepData = checklistData[step];
    if (!stepData) return;
    
    if (renderedSteps[step]) {
        updateStatusBadges(step, amount, period);
        return;
    }
    
    let html = `<div class="section-title">${stepData.title}</div>`;
    html += `<table>
                <thead>
                    <tr>
                        <th style="width: 50px;">No.</th>
                        <th>서류 종류</th>
                        <th style="width: 75px;">필수 여부</th>
                        <th style="width: 25%;">상세 설명(제출 내용)</th>
                        <th style="width: 20%;">면제 및 간소화 조건</th>
                        <th style="width: 18%;">특이사항</th>
                        <th style="width: 60px;">참고</th>
                    </tr>
                </thead>
                <tbody>`;

    stepData.items.forEach((item, index) => {
        const statusDisplay = getStatusDisplay(item.status, item, amount, period);
        const badgeClass = statusDisplay.class;
        const badgeText = statusDisplay.text;

        let refBtn = "";
        if (item.reference) {
            refBtn = `<button class="reference-btn" onclick="openModal('${item.reference}')">📚</button>`;
        }

        const nameHtml = `<strong class="legal-tooltip" data-legal="${item.legal || ''}">${item.name}</strong>`;

        html += `<tr>
                    <td>${index + 1}</td>
                    <td>${nameHtml}</td>
                    <td>
                        <span class="status-badge ${badgeClass}" data-step="${step}" data-item="${index}">
                            ${badgeText}
                        </span>
                    </td>
                    <td>${(item.description || '').replace(/\n/g, '<br>')}</td>
                    <td>${(item.exemption || '').replace(/\n/g, '<br>')}</td>
                    <td>${(item.remark || '').replace(/\n/g, '<br>')}</td>
                    <td>${refBtn}</td>
                </tr>`;
    });

    html += `</tbody></table>`;
    stepContainer.innerHTML = html;
    renderedSteps[step] = true;
}

function updateStatusBadges(step, amount, period) {
    const stepData = checklistData[step];
    const badges = document.querySelectorAll(`.status-badge[data-step="${step}"]`);
    
    badges.forEach((badge, index) => {
        const item = stepData.items[index];
        const statusDisplay = getStatusDisplay(item.status, item, amount, period);
        badge.textContent = statusDisplay.text;
        badge.className = `status-badge ${statusDisplay.class}`;
        badge.setAttribute('data-step', step);
        badge.setAttribute('data-item', index);
    });
}

function updateAllSteps() {
    for (let i = 1; i <= 4; i++) {
        renderStep(i);
    }
}

function openModal(reference) {
    const modal = document.getElementById("referenceModal");
    const modalBody = document.getElementById("modalBody");
    const refData = referenceData[reference];

    if (refData) {
        let tableHtml = `<div class="modal-title">${refData.title}</div>`;
        tableHtml += `<table class="reference-table"><tbody>`;

        refData.data.forEach((row, rowIndex) => {
            if (rowIndex === 0) {
                tableHtml += `<tr>`;
                row.forEach(cell => {
                    tableHtml += `<th>${cell}</th>`;
                });
                tableHtml += `</tr>`;
            } else {
                tableHtml += `<tr>`;
                row.forEach(cell => {
                    tableHtml += `<td>${cell}</td>`;
                });
                tableHtml += `</tr>`;
            }
        });

        tableHtml += `</tbody></table>`;
        modalBody.innerHTML = tableHtml;
        modal.style.display = "block";
    }
}

function closeModal() {
    document.getElementById("referenceModal").style.display = "none";
}

function printPage() {
    // 1. 인쇄 전, 현재 설정된 금액/기간에 맞춰 모든 탭(1~4)의 내용을 강제로 생성합니다.
    // 기존에 작성하신 generateAllPages() 함수가 이 역할을 완벽히 수행합니다.
    generateAllPages();

    // 2. 브라우저가 내용을 그릴 시간을 아주 잠깐(0.5초) 준 뒤 인쇄 창을 띄웁니다.
    // (내용이 많으면 그리는 데 시간이 걸릴 수 있어 안전장치를 두는 것입니다)
    setTimeout(() => {
        window.print();
    }, 500);
}

function downloadPDF() {
    const element = document.querySelector(".container");
    const projectName = document.getElementById("projectName").value || "안전&환경_서류_체크리스트";
    const opt = {
        margin: 10,
        filename: `${projectName}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
        pagebreak: { mode: 'avoid-all' }
    };

    html2pdf().set(opt).from(element).save();
}

function resetForm() {
    document.getElementById("projectName").value = "";
    document.getElementById("companyName").value = "";
    document.getElementById("contractAmount").value = "50";
    document.getElementById("contractPeriod").value = "12";
    updateSliderValues();
    document.getElementById("tableContainer").innerHTML = `
        <div class="empty-state">
            <p>📊 위의 조건을 설정하고 "체크리스트 업데이트" 버튼을 클릭하세요.</p>
        </div>
    `;
}

function updateSliderValues() {
    const amount = document.getElementById("contractAmount").value;
    const period = document.getElementById("contractPeriod").value;
    document.getElementById("contractAmountInput").value = amount;
    document.getElementById("contractPeriodInput").value = period;
}

function updateTable() {
    const btn = document.getElementById("updateBtn");
    btn.classList.add("loading");
    btn.disabled = true;

    // 약간의 딜레이를 줘서 로딩 UI가 보이도록 함
    setTimeout(() => {
        updateAllSteps();
        
        btn.classList.remove("loading");
        btn.disabled = false;
    }, 300);
}

function validateAndCleanInput(type) {
    if (type === 'amount') {
        let input = document.getElementById("contractAmountInput");
        input.value = input.value.replace(/[^0-9.]/g, '');
        if ((input.value.match(/\./g) || []).length > 1) {
            let parts = input.value.split('.');
            input.value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        let val = parseFloat(input.value) || 0;
        val = Math.max(0, Math.min(100, val));
        val = Math.round(val * 10) / 10;
        document.getElementById("contractAmount").value = val;
        document.getElementById("contractAmountInput").value = val;
    } else if (type === 'period') {
        let input = document.getElementById("contractPeriodInput");
        input.value = input.value.replace(/[^0-9.]/g, '');
        if ((input.value.match(/\./g) || []).length > 1) {
            let parts = input.value.split('.');
            input.value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        let val = parseFloat(input.value) || 0.5;
        val = Math.max(0.5, Math.min(36, val));
        // 0.5 단위로 반올림
        val = Math.round(val * 2) / 2;
        document.getElementById("contractPeriod").value = val;
        document.getElementById("contractPeriodInput").value = val;
    }
    updateSliderValues();
}

// Event listeners - blur 이벤트에서만 검증 (입력 중에는 자유롭게)
document.getElementById("contractAmount").addEventListener("input", updateSliderValues);
document.getElementById("contractPeriod").addEventListener("input", updateSliderValues);
document.getElementById("contractAmountInput").addEventListener("blur", function() { validateAndCleanInput('amount'); });
document.getElementById("contractPeriodInput").addEventListener("blur", function() { validateAndCleanInput('period'); });

// Event listeners with debounce for better performance
let debounceTimer;
function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => updateAllSteps(), 50);
}

document.getElementById("contractAmount").addEventListener("input", function() {
    document.getElementById("contractAmountInput").value = this.value;
    debouncedUpdate();
});

document.getElementById("contractPeriod").addEventListener("input", function() {
    document.getElementById("contractPeriodInput").value = this.value;
    debouncedUpdate();
});

document.getElementById("contractAmountInput").addEventListener("input", function() {
    document.getElementById("contractAmount").value = this.value;
    debouncedUpdate();
});

document.getElementById("contractPeriodInput").addEventListener("input", function() {
    document.getElementById("contractPeriod").value = this.value;
    debouncedUpdate();
});

window.onclick = function(event) {
    const modal = document.getElementById("referenceModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// === 이 부분을 추가하세요 ===
function updateAndNotify() {
    const btn = document.getElementById("updateBtn");
    btn.classList.add("loading");
    btn.disabled = true;
    btn.innerHTML = "업데이트 중...";

    setTimeout(() => {
        const amount = parseFloat(document.getElementById("contractAmount").value);
        const period = parseFloat(document.getElementById("contractPeriod").value);
        
        generateAllPages();
        updateDocumentCounts(amount, period);
        
        btn.classList.remove("loading");
        btn.disabled = false;
        btn.innerHTML = "📊 체크리스트 업데이트";
        alert('업데이트 되었습니다.\n제출 서류를 확인해주세요.');
    }, 500);
}
// ============================

// Initialize
document.getElementById("contractAmount").addEventListener("input", updateSliderValues);
document.getElementById("contractPeriod").addEventListener("input", updateSliderValues);
updateSliderValues();
renderStep(1);

// === script.js 맨 아랫부분에 추가 ===

// === script.js 맨 아랫부분에 기존 generateAiGuide 함수를 지우고 아래로 교체하세요 ===

async function generateAiGuide() {
    const aiContent = document.getElementById("aiContent");
    const aiGuideBox = document.getElementById("aiGuideBox");
    const btn = document.getElementById("aiGuideBtn");

    // 1. 현재 입력된 공사 정보 가져오기
    const projectName = document.getElementById("projectName").value || "미지정 공사";
    const amount = document.getElementById("contractAmount").value;
    const period = document.getElementById("contractPeriod").value;
    // [추가] 사용자가 입력한 질문(텍스트) 가져오기
    const userQuestion = document.getElementById('userQuestion').value; 

    // 2. UI 로딩 상태로 변경
    btn.innerHTML = "AI 분석 중...";
    btn.disabled = true;
    aiGuideBox.style.display = "block";
    aiContent.innerText = "파이썬 서버를 통해 분석 중입니다. 잠시만 기다려주세요...";

    try {
        // 3. 내 컴퓨터에서 실행 중인 파이썬 서버(server.py)로 요청
        const response = await fetch('http://localhost:5000/api/ai-guide', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                projectName: projectName,
                amount: amount,
                period: period,
                question: userQuestion // <--- 파이썬의 user_data.get('question')과 일치해야 함!
            })
        });

        if (!response.ok) throw new Error("서버 연결 실패 (server.py가 켜져있는지 확인하세요)");

        const result = await response.json();
        
        // 4. [중요 수정] 서버에서 'answer'라는 이름표에 담아 보냈으므로 이를 가져옵니다.
        if (result.answer) {
            // 줄바꿈(\n)을 그대로 보여주기 위해 innerText를 사용합니다.
            aiContent.innerText = result.answer;
        } else if (result.error) {
            aiContent.innerText = "AI 에러: " + result.error;
        } else {
            aiContent.innerText = "답변 형식이 올바르지 않습니다.";
        }

    } catch (error) {
        console.error("상세 에러 내용:", error); 
        aiContent.innerText = `❌ 연결 실패: ${error.message}`;
    } finally {
        // 5. 버튼 상태 복구
        btn.innerHTML = "✨ AI 공사 가이드 (Beta)";
        btn.disabled = false;
    }
}
