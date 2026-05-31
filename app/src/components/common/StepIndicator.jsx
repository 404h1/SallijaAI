// # v1. 스텝 진행 표시기

import { Check } from 'lucide-react';
import styles from './StepIndicator.module.css';

/**
 * @param {string[]} steps - 스텝 라벨 배열
 * @param {number} current - 현재 스텝 인덱스 (0-based)
 */
export default function StepIndicator({ steps, current }) {
  return (
    <div className={styles.wrap} role="list" aria-label="진행 단계">
      {steps.map((label, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div className={styles.step} key={label} role="listitem" aria-current={isActive ? 'step' : undefined}>
            <div className={styles.dotRow}>
              {i > 0 && <div className={`${styles.bar} ${i <= current ? styles.filled : ''}`} />}
              <div className={`${styles.dot} ${isActive ? styles.active : ''} ${isDone ? styles.done : ''}`}>
                {isDone ? <Check size={15} strokeWidth={3} /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`${styles.bar} ${i < current ? styles.filled : ''}`} />}
            </div>
            <span className={`${styles.label} ${isActive ? styles.active : ''}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
