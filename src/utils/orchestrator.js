// # v1. 오케스트레이터 — 모듈 진단을 우선순위로 정렬 + 3축/위험 요약
// 원칙(master_design_v2 §0): 뒤에선 다 고려, 앞에선 핵심 2~3개만.

import { MOCK_RESULTS } from '../mock/diagnosis';

const RISK_WEIGHT = { critical: 100, high: 75, medium: 50, low: 25 };
const RISK_LABEL = { critical: '심각', high: '높음', medium: '주의', low: '안정' };

/** 우선순위 점수 = 임팩트(60%) + 위험(40%) */
export function priorityScore(result) {
  const impact = result.impactScore ?? 0;
  const risk = RISK_WEIGHT[result.riskLevel] ?? 0;
  return Math.round(impact * 0.6 + risk * 0.4);
}

/**
 * 진단 실행 — mock 결과를 우선순위로 정렬해 오케스트레이션 산출물 생성.
 * 실제 백엔드 붙이면 이 함수만 fetch로 교체.
 */
export function runOrchestration() {
  const results = Object.values(MOCK_RESULTS).map((r) => ({
    ...r,
    priority: priorityScore(r),
  }));

  // 우선순위 내림차순
  results.sort((a, b) => b.priority - a.priority);

  // 3축 집계 (축별 최고 임팩트)
  const axisSummary = { A: 0, B: 0, C: 0 };
  for (const r of results) {
    for (const ax of r.axis) {
      axisSummary[ax] = Math.max(axisSummary[ax], r.impactScore);
    }
  }

  // 종합 위험 스코어 = 상위 위험 모듈 가중 평균 (0~100)
  const riskScore = Math.round(
    results.reduce((sum, r) => sum + (RISK_WEIGHT[r.riskLevel] ?? 0) * (r.impactScore / 100), 0) /
      results.length
  );

  const priorityQueue = results.map((r) => r.moduleId);

  return {
    results: Object.fromEntries(results.map((r) => [r.moduleId, r])),
    priorityQueue,
    riskScore,
    riskLabel: riskScoreLabel(riskScore),
    axisSummary,
    lastRunAt: new Date().toISOString(),
  };
}

/** 종합 위험 스코어 → 라벨 */
export function riskScoreLabel(score) {
  if (score >= 70) return '심각';
  if (score >= 50) return '높음';
  if (score >= 30) return '주의';
  return '안정';
}

export { RISK_LABEL };
