// # v1. 페이지 헤더 — 뒤로가기 + 제목 + 우측 액션 슬롯

import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import styles from './PageHeader.module.css';

/**
 * @param {string} title
 * @param {boolean} back   - 뒤로가기 버튼 (기본 true)
 * @param {string} to      - 뒤로가기 목적지 (없으면 navigate(-1))
 * @param {ReactNode} right - 우측 액션 슬롯
 */
export default function PageHeader({ title, subtitle, back = true, to, right }) {
  const navigate = useNavigate();
  const goBack = () => (to ? navigate(to) : navigate(-1));

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        {back ? (
          <button className={styles.backBtn} onClick={goBack} aria-label="뒤로">
            <ChevronLeft size={24} />
          </button>
        ) : (
          <span className={styles.spacer} />
        )}
        <div className={styles.titleBox}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.right}>{right}</div>
      </div>
    </header>
  );
}
