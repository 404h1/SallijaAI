// # v1. 신뢰성 배지 — ScopeBadge / DataStatusBadge / AxisChip / SourceTag
// master_design_v2 "정직성 원칙"의 물리적 구현. 모든 수치에 출처·스코프를 강제 표기.

import { MapPin, Database } from 'lucide-react';
import { AXES, SCOPES, DATA_STATUS } from '../../config/modules';
import styles from './Badges.module.css';

/** 분석 스코프 (가게/동네/시군구/전국) */
export function ScopeBadge({ scope, size = 'sm' }) {
  const meta = SCOPES[scope];
  if (!meta) return null;
  return (
    <span
      className={`${styles.scope} ${size === 'xs' ? styles.xs : ''}`}
      style={{ '--scope-color': meta.color }}
    >
      <MapPin size={size === 'xs' ? 10 : 11} strokeWidth={2.5} />
      {meta.label}
    </span>
  );
}

/** 데이터 신뢰 상태 (제공/분기시차/서울한정/수동/준비중) */
export function DataStatusBadge({ status }) {
  const meta = DATA_STATUS[status];
  if (!meta || status === 'ready') return null; // ready는 굳이 표기 안 함
  return <span className={`${styles.dataStatus} ${styles[meta.tone]}`}>{meta.label}</span>;
}

/** 3축 칩 (A 매출↑ / B 비용↓ / C 위험↓) */
export function AxisChip({ axis, size = 'sm' }) {
  const meta = AXES[axis];
  if (!meta) return null;
  return (
    <span
      className={`${styles.axis} ${size === 'xs' ? styles.xs : ''}`}
      style={{ background: meta.bg, color: meta.color }}
    >
      {meta.label}
    </span>
  );
}

/** 여러 축을 한 번에 */
export function AxisChips({ axes, size = 'sm' }) {
  return (
    <span className={styles.axisGroup}>
      {axes.map((a) => (
        <AxisChip key={a} axis={a} size={size} />
      ))}
    </span>
  );
}

/** 데이터 출처 태그 */
export function SourceTag({ name, scope }) {
  return (
    <span className={styles.source}>
      <Database size={11} strokeWidth={2} />
      {name}
      {scope && <ScopeBadge scope={scope} size="xs" />}
    </span>
  );
}
