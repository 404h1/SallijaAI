// # v1. Mock 추적(PDCA) 이력 + 회생 사례

/** 진단·실행 이력 (최신순) */
export const MOCK_HISTORY = [
  {
    id: 'h1',
    date: '2026-05-30',
    type: 'diagnosis',
    title: '5월 통합 진단',
    summary: '손익분기 82% · 위험 높음. 인건비 레버 + 정책자금 우선 처방.',
    riskLevel: 'critical',
  },
  {
    id: 'h2',
    date: '2026-05-22',
    type: 'action',
    title: '배달 전용 세트 홍보글 게시',
    summary: 'F7 콘텐츠로 인스타·블로그 초안 생성 → 게시. 2주 실험 시작.',
    riskLevel: 'low',
  },
  {
    id: 'h3',
    date: '2026-05-10',
    type: 'action',
    title: '소상공인 정책자금 신청',
    summary: 'F5 매칭으로 융자 신청서 초안 작성 → 제출 완료.',
    riskLevel: 'medium',
  },
  {
    id: 'h4',
    date: '2026-04-30',
    type: 'diagnosis',
    title: '4월 통합 진단',
    summary: '손익분기 79% · 별점 4.3. 평판 추세 안정.',
    riskLevel: 'high',
  },
];

/** 별점 추세 (F6) */
export const MOCK_RATING_TREND = [
  { period: '3월', rating: 4.4, reviews: 128 },
  { period: '4월', rating: 4.3, reviews: 134 },
  { period: '5월 1주', rating: 4.2, reviews: 137 },
  { period: '5월 2주', rating: 4.0, reviews: 139 },
  { period: '5월 3주', rating: 3.9, reviews: 141 },
];

/** 월 매출 추세 */
export const MOCK_SALES_TREND = [
  { period: '1월', sales: 8100 },
  { period: '2월', sales: 7800 },
  { period: '3월', sales: 7500 },
  { period: '4월', sales: 7350 },
  { period: '5월', sales: 7200 },
];

/** 회생 사례 5종 (핵심 자산) */
export const MOCK_RECOVERY_CASES = [
  {
    source: '재도전성공패키지',
    industry: '외식·치킨',
    crisisSignal: '프라임코스트 85%',
    recoveryAction: ['배달 전용 전환', '메뉴 단순화'],
    recoveryDim: ['채널', '메뉴'],
    outcome: '6개월 후 매출 +22%',
  },
  {
    source: '희망리턴패키지',
    industry: '카페',
    crisisSignal: '점심 매출 공백',
    recoveryAction: ['브런치 세트 도입', '오피스 단체주문'],
    recoveryDim: ['메뉴', '채널'],
    outcome: '4개월 후 흑자 전환',
  },
  {
    source: '백년가게',
    industry: '한식·백반',
    crisisSignal: '고정비 과다',
    recoveryAction: ['주방 동선 개선', '인건비 재배치'],
    recoveryDim: ['비용', '운영'],
    outcome: '영업이익률 +8%p',
  },
];
