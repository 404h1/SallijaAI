// # v2. 진단 카드 — 확장 카드에 처방 빠른 액션 버튼 인라인 추가

import { useNavigate } from 'react-router-dom';
import { ChevronRight, AlertTriangle, Sparkles, FileText, ClipboardList, Phone } from 'lucide-react';
import { getModule } from '../../config/modules';
import { AxisChips, ScopeBadge, DataStatusBadge } from '../common/Badges';
import styles from './DiagnosisCard.module.css';

const ACTION_ICON = {
  content: Sparkles,
  policy: FileText,
  plan: ClipboardList,
  expert: Phone,
};

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

  const goDetail = () => navigate(`/diagnosis/${result.moduleId}`);

  // 타깃 있는 액션만 추림
  const liveActions = result.prescription.actions.filter((a) => a.target);

  return (
    // div로 감싸서 내부 button 중첩 문제 방지
    <div
      className={`${styles.card} ${expanded ? styles.expanded : ''}`}
      onClick={goDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && goDetail()}
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

      {/* 펼침: 상세 + 메트릭 + 처방 + 빠른 액션 */}
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

          {/* ── 빠른 액션 버튼 (처방 연결) ── */}
          {liveActions.length > 0 && (
            <div className={styles.actionRow} onClick={(e) => e.stopPropagation()}>
              {liveActions.map((a, i) => {
                const Icon = ACTION_ICON[a.type] || ChevronRight;
                const isPrimary = i === 0;
                return (
                  <button
                    key={i}
                    className={`${styles.quickBtn} ${isPrimary ? styles.quickPrimary : styles.quickGhost}`}
                    onClick={() => navigate(a.target)}
                  >
                    <Icon size={15} />
                    {a.label}
                  </button>
                );
              })}
            </div>
          )}
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
    </div>
  );
}
