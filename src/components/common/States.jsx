// # v1. 공통 상태 컴포넌트 — Loading / Empty / Error + MetricStat

import { Loader2, Inbox, AlertCircle, RefreshCw } from 'lucide-react';
import { ScopeBadge } from './Badges';
import styles from './States.module.css';

/** 로딩 */
export function LoadingState({ message = '불러오는 중…' }) {
  return (
    <div className={styles.state}>
      <Loader2 size={32} className={styles.spin} />
      <p className={styles.stateText}>{message}</p>
    </div>
  );
}

/** 데이터 없음 */
export function EmptyState({ title = '아직 없어요', desc, action }) {
  return (
    <div className={styles.state}>
      <div className={styles.emptyIcon}>
        <Inbox size={28} />
      </div>
      <p className={styles.stateTitle}>{title}</p>
      {desc && <p className={styles.stateText}>{desc}</p>}
      {action}
    </div>
  );
}

/** 에러 */
export function ErrorState({ title = '문제가 생겼어요', desc, onRetry }) {
  return (
    <div className={styles.state}>
      <div className={`${styles.emptyIcon} ${styles.errorIcon}`}>
        <AlertCircle size={28} />
      </div>
      <p className={styles.stateTitle}>{title}</p>
      {desc && <p className={styles.stateText}>{desc}</p>}
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          <RefreshCw size={16} />
          다시 시도
        </button>
      )}
    </div>
  );
}

/** 스켈레톤 카드 */
export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skLine} style={{ width: '40%' }} />
      <div className={styles.skLine} style={{ width: '80%' }} />
      <div className={styles.skLine} style={{ width: '60%' }} />
    </div>
  );
}

/**
 * 수치 + 스코프 + 출처를 묶는 원자 컴포넌트.
 * tone: good | bad | warn | neutral
 */
export function MetricStat({ label, value, unit, scope, source, tone = 'neutral' }) {
  return (
    <div className={styles.metric}>
      <div className={styles.metricLabel}>
        {label}
        {scope && <ScopeBadge scope={scope} size="xs" />}
      </div>
      <div className={`${styles.metricValue} ${styles[tone]}`}>
        {value}
        {unit && <span className={styles.metricUnit}>{unit}</span>}
      </div>
      {source && <div className={styles.metricSource}>출처: {source}</div>}
    </div>
  );
}
