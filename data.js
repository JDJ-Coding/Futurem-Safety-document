/**
 * 2026 안전&환경 체크리스트 데이터
 * 문구 수정은 여기서 하세요.
 */

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
            { name: "공사 개요서", status: "●", description: "공사명, 공사금액, 공사예정기간\n공사장소, 공사범위, 도급체계 (발주청 기준)", exemption: "해당 없음", remark: "건진법 시행규칙 별지 제101호 양식 사용 필수", baseAmount: 20, basePeriod: 0, reference: "참고표 3", legal: "건진법 제62조" },
            { name: "세부공정표", status: "●", description: "일자별 상세 공정 스케줄\n(Gantt Chart 형식)", exemption: "해당 없음", remark: "타 공종 간섭 명시 필수", baseAmount: 0, basePeriod: 0, legal: "건진법 제62조" }
            // ... 생략된 데이터는 기존 형식을 유지하여 추가 가능합니다.
        ]
    },
    3: {
        title: "Ⅲ. 착공계 (착공 직전 1일 전)",
        items: [
            { name: "착공 신고서", status: "●", description: "공사 착수 보고 공식 공문", exemption: "해당 없음", remark: "공문 형식 제출", baseAmount: 0, basePeriod: 0, legal: "건진법" },
            { name: "현장대리인 선임계 및 증빙", status: "●", description: "선임계(4종세트):\n선임계+경력서+자격증+재직증명서", exemption: "기준 상이", remark: "누락 시 반려", baseAmount: 0, basePeriod: 0, reference: "참고표 1", legal: "건진법" }
        ]
    },
    4: {
        title: "Ⅳ. 착공 시 (당일)",
        items: [
            { name: "필수안전교육", status: "●", description: "안전환경그룹 요청 시\n현장 실시", exemption: "해당 없음", remark: "정비섹션 주관", baseAmount: 0, basePeriod: 0, legal: "산안법" }
        ]
    }
};

const referenceData = {
    "참고표 1": {
        title: "공사금액별 현장대리인 자격 기준",
        data: [
            ["공사예정금액", "자격기준", "필요 경력"],
            ["700억 원 이상", "기술사", "-"],
            ["30억 미만", "산업기사 이상", "3년 이상 경력"]
        ]
    }
};