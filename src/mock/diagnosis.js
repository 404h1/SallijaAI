// # v1. Mock 진단 결과 — 8개 모듈 (영등포 황금올리브 치킨 골든패스)
// ModuleResult 표준 스키마. 실제 백엔드 붙이기 전까지 프론트가 이 형태를 먹는다.
//
// metric.tone:  'good' | 'bad' | 'warn' | 'neutral'
// action.type:  'content'(F7) | 'policy'(F5) | 'plan' | 'expert' | 'diagnosis'
// riskLevel:    'low' | 'medium' | 'high' | 'critical'

export const MOCK_RESULTS = {
  // ─────────────────────────────────────────── F8. 손익분기·현금흐름 [B·C]
  F8: {
    moduleId: 'F8',
    axis: ['B', 'C'],
    scope: 'store',
    dataStatus: 'ready',
    impactScore: 95,
    riskLevel: 'critical',
    confidence: 92,
    diagnosis: {
      headline: '본전의 82% — 운전자금이 약 4개월 남았어요',
      detail:
        '지금 매출은 손익분기점의 82% 수준입니다. 객단가 18,000원 기준으로 하루 9테이블만 더 채우면 본전을 넘습니다. 다만 부채 상환을 감안하면 운전자금이 약 4개월치라, 비용 레버를 빨리 당기는 게 가장 급합니다.',
      metrics: [
        { label: '손익분기 달성률', value: '82', unit: '%', scope: 'store', source: '사장님 입력', tone: 'bad' },
        { label: '본전까지', value: '+9', unit: '테이블/일', scope: 'store', source: '사장님 입력', tone: 'warn' },
        { label: '운전자금 잔존', value: '4', unit: '개월', scope: 'store', source: '사장님 입력', tone: 'bad' },
        { label: '월 고정비', value: '3,780', unit: '만원', scope: 'store', source: '사장님 입력', tone: 'neutral' },
      ],
    },
    prescription: {
      summary: '인건비 레버가 가장 효과 큽니다. 인건비를 매출의 25%로 맞추면 적자→흑자 전환이 가능해요.',
      actions: [
        { type: 'plan', label: '비용 절감 실행 플랜 보기', target: '/action/plan' },
        { type: 'policy', label: '부채 갈아타기 정책자금 찾기', target: '/action/policy' },
        { type: 'expert', label: '세무사·신용회복위 연결', target: null },
      ],
    },
    sources: [{ name: '사장님 입력·POS OCR', scope: 'store' }],
  },

  // ─────────────────────────────────────────── F5. 정책자금·지원사업 매칭 [C]
  F5: {
    moduleId: 'F5',
    axis: ['C'],
    scope: 'national',
    dataStatus: 'ready',
    impactScore: 88,
    riskLevel: 'high',
    confidence: 85,
    diagnosis: {
      headline: '지금 받을 수 있는 지원 3건 — 그중 1건은 D-9 마감',
      detail:
        '사장님 프로필(업종·지역·영업기간)로 자격을 대조한 결과 신청 가능한 지원사업이 3건 확인됐습니다. 소상공인 정책자금 융자는 마감이 9일 남았어요. 신청서 초안은 사장님 데이터로 미리 채워 드립니다.',
      metrics: [
        { label: '신청 가능', value: '3', unit: '건', scope: 'national', source: '기업마당', tone: 'good' },
        { label: '가장 임박', value: 'D-9', unit: '', scope: 'national', source: '기업마당', tone: 'warn' },
        { label: '예상 한도', value: '7,000', unit: '만원', scope: 'national', source: '기업마당', tone: 'good' },
      ],
    },
    prescription: {
      summary: '①소상공인 정책자금 융자(D-9)부터 신청하세요. 신청서 초안과 필요서류 체크리스트를 만들어 뒀어요.',
      actions: [
        { type: 'policy', label: '정책자금 매칭 보기', target: '/action/policy' },
        { type: 'expert', label: '소진공 담당자 연결', target: null },
      ],
    },
    sources: [
      { name: '기업마당 지원사업 API', scope: 'national' },
      { name: '희망리턴·새출발기금', scope: 'national' },
    ],
  },

  // ─────────────────────────────────────────── F7. 마케팅 콘텐츠 생성 [A]
  F7: {
    moduleId: 'F7',
    axis: ['A'],
    scope: 'store',
    dataStatus: 'ready',
    impactScore: 72,
    riskLevel: 'low',
    confidence: 80,
    diagnosis: {
      headline: '차별화 포인트가 준비됐어요 — 바로 홍보글로 만들 수 있어요',
      detail:
        '경쟁 레이더와 유동 분석에서 나온 "배달 전용 세트" 강점을 인스타·블로그·네이버 플레이스 글 초안으로 바로 뽑아 드립니다. 트렌드 키워드(치킨 배달)도 반영했어요.',
      metrics: [
        { label: '생성 가능 채널', value: '3', unit: '종', scope: 'store', source: '처방 연동', tone: 'good' },
        { label: '반영 트렌드 키워드', value: '+32', unit: '% 검색↑', scope: 'national', source: '데이터랩', tone: 'good' },
      ],
    },
    prescription: {
      summary: '메뉴 사진 1장만 올리면 채널별 초안 3종이 나옵니다. 2주 한정 실험으로 클릭·문의를 추적해 보세요.',
      actions: [{ type: 'content', label: '콘텐츠 스튜디오 열기', target: '/action/content' }],
    },
    sources: [
      { name: '진단 처방', scope: 'store' },
      { name: '네이버 데이터랩 트렌드', scope: 'national' },
    ],
  },

  // ─────────────────────────────────────────── F2. 수요·트렌드 예보 [A·B]
  F2: {
    moduleId: 'F2',
    axis: ['A', 'B'],
    scope: 'neighborhood',
    dataStatus: 'ready',
    impactScore: 68,
    riskLevel: 'medium',
    confidence: 74,
    diagnosis: {
      headline: '동네 "치킨 배달" 검색 +32% — 수요가 오는 신호예요',
      detail:
        '전월 대비 동네 배달 검색량이 32% 급증했습니다. 수요 선행지표라 지금이 배달 메뉴 노출·재고를 점검할 타이밍이에요. (날씨 상관은 데이터가 8주 미만이라 아직 끄둔 상태)',
      metrics: [
        { label: '배달 검색 추이', value: '+32', unit: '%', scope: 'neighborhood', source: '데이터랩', tone: 'good' },
        { label: '날씨 상관', value: 'OFF', unit: '', scope: 'store', source: '데이터 부족', tone: 'neutral' },
      ],
    },
    prescription: {
      summary: '다음 주 배달 재고를 늘리고, 트렌드를 탄 한정 프로모션을 띄우세요.',
      actions: [
        { type: 'plan', label: '발주 조정표 보기', target: '/action/plan' },
        { type: 'content', label: '한정 프로모션 문구 생성', target: '/action/content' },
      ],
    },
    sources: [
      { name: '네이버 데이터랩 트렌드', scope: 'national' },
      { name: '기상청 단기예보', scope: 'neighborhood' },
    ],
  },

  // ─────────────────────────────────────────── F1. 주변 경쟁 점포 레이더 [A·B]
  F1: {
    moduleId: 'F1',
    axis: ['A', 'B'],
    scope: 'neighborhood',
    dataStatus: 'seoul_only',
    impactScore: 64,
    riskLevel: 'medium',
    confidence: 70,
    diagnosis: {
      headline: '반경 500m 치킨집 7개 — 과포화 상위 20%예요',
      detail:
        '이들이 동네 치킨 추정매출 월 1.4억을 나눠 먹어 점포당 약 2,000만 원, 시 평균(3,200만)의 63% 수준입니다. 가격 경쟁은 다 같이 죽는 길이라 배달 전용·세트 차별화가 안전합니다.',
      metrics: [
        { label: '반경 500m 동종', value: '7', unit: '개', scope: 'neighborhood', source: '소진공 상가정보', tone: 'warn' },
        { label: '점포당 추정매출', value: '2,000', unit: '만원', scope: 'neighborhood', source: '서울 상권분석', tone: 'bad' },
        { label: '시 평균 대비', value: '63', unit: '%', scope: 'district', source: '서울 상권분석', tone: 'bad' },
        { label: '㎡당 임대료', value: '54.2', unit: '천원', scope: 'district', source: '한국부동산원', tone: 'neutral' },
      ],
    },
    prescription: {
      summary: '가격 말고 "우리집만의 강점"으로 차별화하세요. 배달 전용 세트가 안전한 진입점입니다.',
      actions: [
        { type: 'content', label: '차별화 홍보글 만들기', target: '/action/content' },
        { type: 'plan', label: '차별화 메뉴 기획안 보기', target: '/action/plan' },
      ],
    },
    sources: [
      { name: '소진공 상가정보', scope: 'neighborhood' },
      { name: '서울 상권분석서비스', scope: 'district' },
      { name: '한국부동산원 임대료', scope: 'district' },
    ],
  },

  // ─────────────────────────────────────────── F3. 유동인구–영업시간 적합도 [A]
  F3: {
    moduleId: 'F3',
    axis: ['A'],
    scope: 'neighborhood',
    dataStatus: 'seoul_only',
    impactScore: 58,
    riskLevel: 'low',
    confidence: 68,
    diagnosis: {
      headline: '동네는 점심에 붐비는데, 사장님 매출은 저녁에 몰려요',
      detail:
        '우리 행정동 유동인구는 점심(12~14시)이 피크인데 사장님 매출은 저녁 집중입니다. 점심 비중이 15%로 동네 평균(28%)의 절반 수준이라, 비는 점심 시간이 가장 큰 기회예요.',
      metrics: [
        { label: '내 점심 매출 비중', value: '15', unit: '%', scope: 'store', source: 'POS', tone: 'bad' },
        { label: '동네 평균', value: '28', unit: '%', scope: 'neighborhood', source: '생활인구', tone: 'neutral' },
        { label: '점심 유동 피크', value: '12-14', unit: '시', scope: 'neighborhood', source: '생활인구', tone: 'good' },
      ],
    },
    prescription: {
      summary: '점심 세트·픽업 메뉴로 비는 시간대를 채우세요.',
      actions: [
        { type: 'plan', label: '점심 세트 기획안 보기', target: '/action/plan' },
        { type: 'content', label: '점심 한정 프로모션 생성', target: '/action/content' },
      ],
    },
    sources: [
      { name: '서울 생활인구 데이터', scope: 'neighborhood' },
      { name: 'POS 시간대 매출', scope: 'store' },
    ],
  },

  // ─────────────────────────────────────────── F4. 지역 소비 추세 진단 [C]
  F4: {
    moduleId: 'F4',
    axis: ['C'],
    scope: 'district',
    dataStatus: 'quarterly_lag',
    impactScore: 76,
    riskLevel: 'high',
    confidence: 66,
    diagnosis: {
      headline: '하락의 대부분이 동네가 아니라 사장님 가게 문제예요',
      detail:
        '최근 분기 사장님 매출은 −12%인데 영등포구 치킨 전체는 −3%뿐입니다. 즉 "점포 효과"가 큽니다 — 동네 수요는 살아있으니 메뉴·리뷰·접객부터 점검하면 로컬 마케팅이 먹힙니다. (분기 단위·1~2분기 시차 데이터)',
      metrics: [
        { label: '내 매출 변화', value: '-12', unit: '%', scope: 'store', source: 'POS', tone: 'bad' },
        { label: '동네 업종 변화', value: '-3', unit: '%', scope: 'district', source: '서울 상권분석', tone: 'warn' },
        { label: '점포 효과 비중', value: '75', unit: '%', scope: 'store', source: '분리 계산', tone: 'bad' },
      ],
    },
    prescription: {
      summary: '동네 탓이 아니라 가게 직격 처방이 우선입니다. 메뉴·리뷰·접객 개선 + 로컬 배달 프로모션.',
      actions: [
        { type: 'plan', label: '가게 개선 체크리스트', target: '/action/plan' },
        { type: 'content', label: '로컬 마케팅 초안', target: '/action/content' },
      ],
    },
    sources: [
      { name: '서울 상권분석 추정매출(분기)', scope: 'district' },
      { name: '네이버 데이터랩 지역통계', scope: 'district' },
    ],
  },

  // ─────────────────────────────────────────── F6. 평판 추세 경보 [C]
  F6: {
    moduleId: 'F6',
    axis: ['C'],
    scope: 'store',
    dataStatus: 'manual',
    impactScore: 54,
    riskLevel: 'medium',
    confidence: 60,
    diagnosis: {
      headline: '직접 적어주신 별점이 4.3 → 3.9로 3주째 하락 중',
      detail:
        '수동 입력 별점이 0.4점 떨어졌고, 블로그 언급량도 줄었습니다. 별점·리뷰 본문은 공식 API가 없어 자동 수집은 불가하지만, 추세 이탈은 분명한 조기경보 신호예요. 서비스·대기 차원을 점검하세요.',
      metrics: [
        { label: '별점 추이', value: '4.3→3.9', unit: '', scope: 'store', source: '수동 입력', tone: 'bad' },
        { label: '블로그 언급량', value: '-18', unit: '%', scope: 'neighborhood', source: '네이버 블로그', tone: 'warn' },
      ],
    },
    prescription: {
      summary: '약점 차원(서비스·대기)별 리뷰 응답 템플릿과 개선 체크리스트를 준비했어요.',
      actions: [
        { type: 'content', label: '리뷰 응답 템플릿 생성', target: '/action/content' },
        { type: 'plan', label: '서비스 개선 체크리스트', target: '/action/plan' },
      ],
    },
    sources: [
      { name: '사장님 수동 입력', scope: 'store' },
      { name: '네이버 블로그 검색', scope: 'neighborhood' },
    ],
  },
};

/** 모듈 id로 mock 결과 조회 */
export function getMockResult(id) {
  return MOCK_RESULTS[id] || null;
}
