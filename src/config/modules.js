// # v1. F1~F8 모듈 정의 (축·스코프·데이터상태·난이도)
// 페이지 코드 변경 없이 이 파일만 수정하면 모듈 추가/변경 가능.

/** 3축 메타 */
export const AXES = {
  A: { key: 'A', label: '매출↑', full: '매출 늘리기', color: 'var(--axis-a)', bg: 'var(--axis-a-bg)' },
  B: { key: 'B', label: '비용↓', full: '비용 줄이기', color: 'var(--axis-b)', bg: 'var(--axis-b-bg)' },
  C: { key: 'C', label: '위험↓', full: '위험 낮추기', color: 'var(--axis-c)', bg: 'var(--axis-c-bg)' },
};

/** 분석 스코프 메타 */
export const SCOPES = {
  store: { key: 'store', label: '우리 가게', color: 'var(--scope-store)' },
  neighborhood: { key: 'neighborhood', label: '우리 동네', color: 'var(--scope-neighborhood)' },
  district: { key: 'district', label: '시군구', color: 'var(--scope-district)' },
  national: { key: 'national', label: '전국', color: 'var(--scope-national)' },
};

/** 데이터 신뢰 상태 라벨 */
export const DATA_STATUS = {
  ready: { key: 'ready', label: '제공', tone: 'ok' },
  quarterly_lag: { key: 'quarterly_lag', label: '분기 시차', tone: 'warn' },
  seoul_only: { key: 'seoul_only', label: '서울 한정', tone: 'warn' },
  manual: { key: 'manual', label: '수동 입력', tone: 'info' },
  coming_soon: { key: 'coming_soon', label: '준비중', tone: 'muted' },
};

/** F1~F8 모듈 카탈로그 (master_design_v2 §2 기준) */
export const MODULES = [
  {
    id: 'F8',
    name: '손익분기·현금흐름',
    short: 'BEP·현금',
    axis: ['B', 'C'],
    scope: 'store',
    dataStatus: 'ready',
    difficulty: 1,
    tier: 1,
    summary: '본전까지 얼마 남았는지, 운전자금이 몇 개월 버티는지 계산합니다.',
  },
  {
    id: 'F5',
    name: '정책자금·지원사업 매칭',
    short: '정책 매칭',
    axis: ['C'],
    scope: 'national',
    dataStatus: 'ready',
    difficulty: 2,
    tier: 1,
    summary: '받을 수 있는 지원금을 자격·마감일 기준으로 골라 신청까지 돕습니다.',
  },
  {
    id: 'F7',
    name: '마케팅 콘텐츠 생성',
    short: '콘텐츠 생성',
    axis: ['A'],
    scope: 'store',
    dataStatus: 'ready',
    difficulty: 1,
    tier: 1,
    summary: '처방을 인스타·블로그·플레이스 글 초안으로 바로 만들어 줍니다.',
  },
  {
    id: 'F2',
    name: '수요·트렌드 예보',
    short: '수요 예보',
    axis: ['A', 'B'],
    scope: 'neighborhood',
    dataStatus: 'ready',
    difficulty: 2,
    tier: 2,
    summary: '동네 검색 트렌드와 날씨로 다음 주 수요를 미리 봅니다.',
  },
  {
    id: 'F1',
    name: '주변 경쟁 점포 레이더',
    short: '경쟁 레이더',
    axis: ['A', 'B'],
    scope: 'neighborhood',
    dataStatus: 'seoul_only',
    difficulty: 2,
    tier: 2,
    summary: '반경 내 동종 점포 수와 포화도로 차별화 포인트를 찾습니다.',
  },
  {
    id: 'F3',
    name: '유동인구–영업시간 적합도',
    short: '유동 적합도',
    axis: ['A'],
    scope: 'neighborhood',
    dataStatus: 'seoul_only',
    difficulty: 2,
    tier: 2,
    summary: '동네 사람이 다니는 시간과 내 매출 시간의 갭을 봅니다.',
  },
  {
    id: 'F4',
    name: '지역 소비 추세 진단',
    short: '소비 추세',
    axis: ['C'],
    scope: 'district',
    dataStatus: 'quarterly_lag',
    difficulty: 2,
    tier: 3,
    summary: '내 매출 하락이 나 때문인지 동네 때문인지 구분합니다.',
  },
  {
    id: 'F6',
    name: '평판 추세 경보',
    short: '평판 레이더',
    axis: ['C'],
    scope: 'store',
    dataStatus: 'manual',
    difficulty: 1,
    tier: 3,
    summary: '별점·언급량 추세로 평판 이상을 조기에 알립니다.',
  },
];

/** id로 모듈 조회 */
export function getModule(id) {
  return MODULES.find((m) => m.id === id) || null;
}
