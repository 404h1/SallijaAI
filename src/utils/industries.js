// # v1. 업종 목록 (소진공 업종 분류 기반 — 대분류 > 중분류 간소화 버전)

export const INDUSTRY_GROUPS = [
  {
    group: '음식',
    items: [
      { code: 'Q01', name: '치킨·닭강정' },
      { code: 'Q02', name: '한식·백반' },
      { code: 'Q03', name: '분식·김밥' },
      { code: 'Q04', name: '카페·디저트' },
      { code: 'Q05', name: '제과·베이커리' },
      { code: 'Q06', name: '고기·구이' },
      { code: 'Q07', name: '중식' },
      { code: 'Q08', name: '일식·돈가스' },
      { code: 'Q09', name: '주점·호프' },
      { code: 'Q10', name: '패스트푸드·버거' },
      { code: 'Q11', name: '피자·파스타' },
    ],
  },
  {
    group: '소매',
    items: [
      { code: 'R01', name: '편의점' },
      { code: 'R02', name: '슈퍼·식료품' },
      { code: 'R03', name: '의류·패션' },
      { code: 'R04', name: '화장품·뷰티' },
      { code: 'R05', name: '꽃·화원' },
    ],
  },
  {
    group: '서비스',
    items: [
      { code: 'S01', name: '미용실·헤어' },
      { code: 'S02', name: '네일·뷰티샵' },
      { code: 'S03', name: '세탁소' },
      { code: 'S04', name: '학원·교습소' },
      { code: 'S05', name: '헬스·피트니스' },
      { code: 'S06', name: '동물병원·펫샵' },
    ],
  },
];

/** code → name 역조회 */
export function findIndustryName(code) {
  for (const g of INDUSTRY_GROUPS) {
    const found = g.items.find((i) => i.code === code);
    if (found) return found.name;
  }
  return '';
}
