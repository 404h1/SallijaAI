// # v2. 사이드 네비게이션 (데스크탑/태블릿 최적화)

import { NavLink, useNavigate } from 'react-router-dom';
import { useStoreProfile } from '../../context/StoreProfileContext';
import styles from './SideNav.module.css';

const MENUS = [
  { to: '/dashboard', label: '통합 진단' },
  { to: '/action/plan', label: '오늘의 액션', badge: 3 },
  { to: '/radar', label: '상권 레이더' },
  { to: '/action/policy', label: '정책자금', badge: 3 },
  { to: '/action/content', label: '콘텐츠 만들기' },
  { to: '/performance', label: '성과 추적' },
];

export default function SideNav() {
  const { profile } = useStoreProfile();
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <span className={styles.profileIcon}>🍗</span>
          <strong className={styles.profileName}>{profile?.name || '가게 이름'}</strong>
        </div>
        <p className={styles.profileMeta}>
          {profile?.region || '서울 영등포구'} · 운영 2년 4개월<br />
          박정훈 사장님
        </p>
      </div>

      <nav className={styles.navMenu}>
        {MENUS.map((menu) => (
          <NavLink
            key={menu.to}
            to={menu.to}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.navLabel}>{menu.label}</span>
            {menu.badge && <span className={styles.badge}>{menu.badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={styles.bottomAction}>
        <button className={styles.newAnalysisBtn} onClick={() => navigate('/setup/sales')}>
          + 새 진단 시작
        </button>
      </div>
    </aside>
  );
}
