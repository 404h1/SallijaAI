// # v1. 하단 탭 네비 — 대시보드 / 액션 / 이력 / 설정

import { NavLink } from 'react-router-dom';
import { LayoutGrid, Sparkles, History, Settings } from 'lucide-react';
import styles from './BottomNav.module.css';

const TABS = [
  { to: '/dashboard', label: '진단', icon: LayoutGrid },
  { to: '/action/content', label: '액션', icon: Sparkles },
  { to: '/history', label: '이력', icon: History },
  { to: '/settings', label: '설정', icon: Settings },
];

export default function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="주요 메뉴">
      {TABS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        >
          <Icon size={22} strokeWidth={2} />
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
