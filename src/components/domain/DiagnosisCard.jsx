// # v1. 진단 카드 — 대시보드 우선순위 큐의 단위. 펼침/접힘 2가지 변형.

import { useNavigate } from 'react-router-dom';
import { ChevronRight, AlertTriangle } from 'lucide-react';
import { getModule } from '../../config/modules';
import { AxisChips, ScopeBadge, DataStatusBadge } from '../common/Badges';
import styles from './DiagnosisCard.module.css';

const RISK_META = {
  critical: { label: '심각', cls: 'critical' },
  high: { label: '높음', cls: 'high' },
  medium: { label: '주의', cls: 'medium' },
  low: { label: '안정', cls: 'low' },
};

/**
 * @param {object} result   - ModuleResult (+priority)
 * @param {boolean} expanded - 펼침 여부 (상위 카드만 true)
 */
export default function DiagnosisCard({ result, expanded = false }) {
  const navigate = useNavigate();
  const mod = getModule(result.moduleId);
  const risk = RISK_META[result.riskLevel] || RISK_META.low;

  const go = () => navigate(`/diagnosis/${result.moduleId}`);

  return (
    <button
      className={`${styles.card} ${expanded ? styles.expanded : ''}`}
      onClick={go}
      aria-label={`${mod?.name} 진단 상세`}
    >
      {/* 상단: 모듈명 + 축 + 위험 */}
      <div className={styles.top}>
        <div className={styles.modInfo}>
          <span className={styles.modName}>{mod?.short || result.moduleId}</span>
          <AxisChips axes={result.axis} size="xs" />
        </div>
        <span className={`${styles.risk} ${styles[risk.cls]}`}>
          {result.riskLevel === 'critical' && <AlertTriangle size={11} strokeWidth={2.5} />}
          {risk.label}
        </span>
      </div>

      {/* 헤드라인 */}
      <p className={styles.headline}>{result.diagnosis.headline}</p>

      {/* 펼침: 상세 + 메트릭 미리보기 */}
      {expanded && (
        <>
          <p className={styles.detail}>{result.diagnosis.detail}</p>
          <div className={styles.metricRow}>
            {result.diagnosis.metrics.slice(0, 3).map((m, i) => (
              <div key={i} className={styles.miniMetric}>
                <span className={`${styles.miniValue} ${styles[m.tone]}`}>
                  {m.value}
                  <em>{m.unit}</em>
                </span>
                <span className={styles.miniLabel}>{m.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.prescription}>
            <span className={styles.rxTag}>처방</span>
            {result.prescription.summary}
          </div>
        </>
      )}

      {/* 하단: 스코프·상태 + 화살표 */}
      <div className={styles.bottom}>
        <div className={styles.badges}>
          <ScopeBadge scope={result.scope} size="xs" />
          <DataStatusBadge status={result.dataStatus} />
        </div>
        <span className={styles.cta}>
          자세히 <ChevronRight size={15} />
        </span>
      </div>
    </button>
  );
}
