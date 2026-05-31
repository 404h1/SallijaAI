// # v2. 5-Tab 하단 네비게이션 (중앙 홈 버튼 플로팅)

import { NavLink } from 'react-router-dom';
import { Database, Sparkles, Home, CalendarDays, User } from 'lucide-react';
import styles from './BottomNav.module.css';

const TABS = [
  { to: '/data', label: '데이터', icon: Database },
  { to: '/action/plan', label: '액션', icon: Sparkles },
  { to: '/home', label: '홈', icon: Home, isFab: true },
  { to: '/performance', label: '성과', icon: CalendarDays },
  { to: '/settings', label: '마이', icon: User },
];

export default function BottomNav() {
  return (
    <div className={styles.navContainer}>
      {/* 둥근 배경을 위한 가상 요소나 클리핑은 CSS로 처리 */}
      <nav className={styles.nav} aria-label="주요 메뉴">
        {TABS.map(({ to, label, icon: Icon, isFab }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => 
              `${styles.tab} ${isFab ? styles.fabTab : ''} ${isActive ? styles.active : ''}`
            }
          >
            <div className={isFab ? styles.fabIconWrapper : styles.iconWrapper}>
              <Icon size={isFab ? 26 : 22} strokeWidth={isFab ? 2.5 : 2} />
            </div>
            <span className={styles.label}>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
