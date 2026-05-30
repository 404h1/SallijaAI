// # v1. 모듈 상세 진단 — F1~F8 동적. 진단(headline·detail·metrics) + 처방(actions) + 출처.

import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, FileText, ClipboardList, Phone, Stethoscope, ChevronRight } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { EmptyState, MetricStat } from '../../components/common/States';
import { AxisChips, ScopeBadge, DataStatusBadge, SourceTag } from '../../components/common/Badges';
import { getModule } from '../../config/modules';
import { getMockResult } from '../../mock/diagnosis';
import styles from './DiagnosisPage.module.css';

const RISK_META = {
  critical: { label: '심각', cls: 'critical' },
  high: { label: '높음', cls: 'high' },
  medium: { label: '주의', cls: 'medium' },
  low: { label: '안정', cls: 'low' },
};

const ACTION_ICON = {
  content: Sparkles,
  policy: FileText,
  plan: ClipboardList,
  expert: Phone,
  diagnosis: Stethoscope,
};

export default function DiagnosisPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const mod = getModule(moduleId);
  const result = getMockResult(moduleId);

  if (!mod || !result) {
    return (
      <AppShell header={<PageHeader title="진단 상세" to="/dashboard" />}>
        <EmptyState
          title="모듈을 찾을 수 없어요"
          desc="존재하지 않는 진단입니다."
          action={
            <button className={styles.primaryBtn} onClick={() => navigate('/dashboard')}>
              대시보드로
            </button>
          }
        />
      </AppShell>
    );
  }

  const risk = RISK_META[result.riskLevel] || RISK_META.low;

  const onAction = (action) => {
    if (action.target) navigate(action.target);
  };

  return (
    <AppShell header={<PageHeader title={mod.name} subtitle={mod.short} to="/dashboard" />}>
      <div className={styles.content}>
        {/* 헤더: 축·스코프·위험 */}
        <section className={styles.meta}>
          <div className={styles.metaTags}>
            <AxisChips axes={result.axis} />
            <ScopeBadge scope={result.scope} />
            <DataStatusBadge status={result.dataStatus} />
          </div>
          <span className={`${styles.riskPill} ${styles[risk.cls]}`}>위험 {risk.label}</span>
        </section>

        {/* 진단 */}
        <section className={styles.block}>
          <h2 className={styles.headline}>{result.diagnosis.headline}</h2>
          <p className={styles.detail}>{result.diagnosis.detail}</p>
        </section>

        {/* 핵심 지표 */}
        <section className={styles.block}>
          <h3 className={styles.blockTitle}>핵심 지표</h3>
          <div className={styles.metrics}>
            {result.diagnosis.metrics.map((m, i) => (
              <MetricStat key={i} {...m} />
            ))}
          </div>
        </section>

        {/* 처방 */}
        <section className={styles.block}>
          <h3 className={styles.blockTitle}>처방</h3>
          <div className={styles.rxBox}>
            <p className={styles.rxSummary}>{result.prescription.summary}</p>
            <div className={styles.actions}>
              {result.prescription.actions.map((a, i) => {
                const Icon = ACTION_ICON[a.type] || ChevronRight;
                const disabled = !a.target;
                return (
                  <button
                    key={i}
                    className={`${styles.actionBtn} ${disabled ? styles.actionDisabled : ''}`}
                    onClick={() => onAction(a)}
                    disabled={disabled}
                  >
                    <span className={styles.actionLeft}>
                      <Icon size={17} />
                      {a.label}
                    </span>
                    {disabled ? (
                      <span className={styles.soon}>준비중</span>
                    ) : (
                      <ChevronRight size={18} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 출처 */}
        <section className={styles.block}>
          <h3 className={styles.blockTitle}>데이터 출처</h3>
          <div className={styles.sources}>
            {result.sources.map((s, i) => (
              <SourceTag key={i} name={s.name} scope={s.scope} />
            ))}
          </div>
          <p className={styles.confidence}>신뢰도 {result.confidence}% · 영향도 {result.impactScore}점</p>
        </section>
      </div>
    </AppShell>
  );
}
