// # v1. 앱 셸 — 모바일 우선 컨테이너 + 하단 네비. 콘텐츠 페이지 공통 골격.

import BottomNav from './BottomNav';
import styles from './AppShell.module.css';

/**
 * @param {ReactNode} header  - 상단 고정 헤더 (PageHeader 등). 없으면 생략.
 * @param {boolean} nav       - 하단 네비 표시 여부 (기본 true)
 */
export default function AppShell({ header, nav = true, children }) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {header}
        <main className={`${styles.body} ${nav ? styles.withNav : ''}`}>{children}</main>
        {nav && <BottomNav />}
      </div>
    </div>
  );
}
