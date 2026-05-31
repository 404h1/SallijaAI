// # v1. 페이지 헤더 — 뒤로가기 + 제목 + 우측 액션 슬롯

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import styles from './PageHeader.module.css';

/**
 * @param {string} title
 * @param {boolean} back   - 뒤로가기 버튼 (기본 true)
 * @param {string} to      - 뒤로가기 목적지 (없으면 navigate(-1))
 * @param {boolean} home   - 우측 홈(대시보드) 버튼 (기본 true)
 * @param {ReactNode} right - 우측 액션 슬롯 (지정 시 home 버튼 대체)
 */
export default function PageHeader({ title, subtitle, back = true, to, home = true, right }) {
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
        <div className={styles.right}>
          {right ?? (home && (
            <button
              className={styles.homeBtn}
              onClick={() => navigate('/dashboard')}
              aria-label="처음으로"
            >
              <Home size={20} />
              <span className={styles.homeLabel}>처음</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
