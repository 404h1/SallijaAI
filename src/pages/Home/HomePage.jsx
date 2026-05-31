// # v1. 앱 메인 허브 (Home Page)

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClipboardList, MapPin, Sparkles, Megaphone, CheckCircle2, ChevronRight, X, BookOpen } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import styles from './HomePage.module.css';

const QUICK_MENUS = [
  { label: '가게 진단서', icon: ClipboardList, to: '/dashboard', color: '#4facfe' },
  { label: '상권 레이더', icon: MapPin, to: '/radar', color: '#ff758c' },
  { label: '마케팅/콘텐츠', icon: Sparkles, to: '/action/content', color: '#00f2fe' },
  { label: '정책자금', icon: Megaphone, to: '/action/policy', color: '#f78ca0' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // URL에 ?popup=welcome 이 있으면 팝업 노출 (회원가입 직후)
    if (location.search.includes('popup=welcome')) {
      setShowPopup(true);
    }
  }, [location]);

  return (
    <AppShell>
      <div className={styles.container}>
        
        {/* 살리자 로고 헤더 */}
        <header className={styles.homeHeader}>
          <img src="/assets/logo.png" alt="살리자 AI" className={styles.logo} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
          <h1 className={styles.textLogo} style={{ display: 'none' }}>살리자 AI</h1>
        </header>

        {/* 상단 배너 (JOBDA 스타일) */}
        <div className={styles.topBanner}>
          <div className={styles.bannerBadge}>🚨 마감 임박 : 정책자금 알림</div>
          <div className={styles.bannerCard}>
            <div className={styles.bannerContent}>
              <h3>2026년 상반기<br/>소상공인 대환대출</h3>
              <p>05.28(목) ~ 06.08(월)</p>
            </div>
            <div className={styles.bannerImagePlaceholder}></div>
          </div>
        </div>

        {/* 4구 퀵 메뉴 */}
        <div className={styles.quickMenus}>
          {QUICK_MENUS.map((menu, idx) => (
            <div key={idx} className={styles.menuItem} onClick={() => navigate(menu.to)}>
              <div className={styles.menuIconWrapper} style={{ color: menu.color }}>
                <menu.icon size={28} strokeWidth={2.5} />
              </div>
              <span className={styles.menuLabel}>{menu.label}</span>
            </div>
          ))}
        </div>

        {/* 하단 피드 섹션 */}
        <div className={styles.feedSection}>
          <div className={styles.feedHeader}>
            <h3 className={styles.feedTitle}>추천 퀘스트</h3>
            <span className={styles.feedSub}>남은 퀘스트 3개</span>
          </div>
          
          <div className={styles.feedScroll}>
            {/* 튜토리얼 카드 */}
            <div className={`${styles.feedCard} ${styles.tutorialCard}`} onClick={() => navigate('/data')}>
              <div className={`${styles.cardVisual} ${styles.gradientBlue}`}>
                <div className={styles.badgePopular}>✨ 지금 인기</div>
                <BookOpen size={48} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
              </div>
              <div className={styles.cardBottom}>
                <h4>기초 데이터 등록 튜토리얼</h4>
                <button className={styles.actionBtn}>진행하기</button>
              </div>
            </div>

            {/* 오늘의 액트 카드 */}
            <div className={`${styles.feedCard} ${styles.actCard}`} onClick={() => navigate('/action/plan')}>
              <div className={`${styles.cardVisual} ${styles.gradientPurple}`}>
                <div className={styles.badgeAi}>✨ AI 추천</div>
                <Sparkles size={48} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
              </div>
              <div className={styles.cardBottom}>
                <h4>인스타 단골 타겟 광고 세팅</h4>
                <button className={styles.actionBtn}>실행하기</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 가입 환영 팝업 */}
      {showPopup && (
        <div className={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div className={styles.popupModal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setShowPopup(false)}><X size={20} /></button>
            <div className={styles.popupIcon}>🎉</div>
            <h2 className={styles.popupTitle}>가게 등록 완료!</h2>
            <p className={styles.popupDesc}>살리자 AI가 사장님의 매출과 상권을 분석할 준비를 마쳤습니다. 매일 추천되는 퀘스트를 달성해보세요.</p>
            <button className={styles.popupConfirmBtn} onClick={() => setShowPopup(false)}>시작하기</button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
