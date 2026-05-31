// # v2. 상권 레이더 (Market Radar) - 네이티브 모바일 하프맵 + 바텀시트 UI

import { useState } from 'react';
import { Search, MapPin, Store, Navigation } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import styles from './MarketRadar.module.css';

export default function MarketRadarPage() {
  const [location, setLocation] = useState('서울 영등포구 영등포역');
  const [category, setCategory] = useState('치킨');

  return (
    <AppShell>
      <div className={styles.container}>
        <PageHeader title="상권 레이더" back={true} home={false} />
        
        {/* 상단 맵 영역 (전체 화면의 절반 차지) */}
        <div className={styles.mapSection}>
          {/* 가상의 지도 배경 (CSS 패턴으로 구현) */}
          <div className={styles.mapBackground}>
            <div className={styles.radiusCircle}></div>
            
            {/* 기준 점포 핀 */}
            <div className={styles.centerPin}>
              <div className={styles.centerMarker}>
                <Store size={14} color="white" />
              </div>
            </div>

            {/* 경쟁 점포 핀들 */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${styles.competitorPin} ${styles[`p${i+1}`]}`}>
                <MapPin size={16} color="var(--color-danger)" fill="white" />
              </div>
            ))}
          </div>
          
          <div className={styles.mapSearchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input type="text" value={location} readOnly className={styles.searchInput} />
            <div className={styles.searchDivider}></div>
            <input type="text" value={category} readOnly className={styles.searchInput} />
          </div>
          
          <button className={styles.myLocationBtn}>
            <Navigation size={18} />
          </button>
        </div>

        {/* 하단 바텀 시트 영역 */}
        <div className={styles.bottomSheet}>
          <div className={styles.dragHandle}></div>
          
          <div className={styles.sheetHeader}>
            <div>
              <h2 className={styles.sheetTitle}>영등포역 500m 반경</h2>
              <p className={styles.sheetSub}>유사도 92%의 A급 상권입니다.</p>
            </div>
            <div className={styles.scoreBadge}>
              <span className={styles.scoreLabel}>상권 점수</span>
              <span className={styles.scoreValue}>84점</span>
            </div>
          </div>

          <div className={styles.sheetContent}>
            <div className={styles.statGrid}>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>경쟁 점포</span>
                <strong className={styles.statValue}>6개</strong>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>일 유동인구</span>
                <strong className={styles.statValue}>3.2만명</strong>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>평균 객단가</span>
                <strong className={styles.statValue}>18,400원</strong>
              </div>
            </div>

            <div className={styles.listSection}>
              <h3 className={styles.listTitle}>주요 경쟁점 현황</h3>
              
              <div className={styles.competitorItem}>
                <div className={styles.compIcon}>1</div>
                <div className={styles.compInfo}>
                  <h4>BHC 영등포점</h4>
                  <p>거리 120m · 월 추정 매출 8,500만원</p>
                </div>
              </div>
              
              <div className={styles.competitorItem}>
                <div className={styles.compIcon}>2</div>
                <div className={styles.compInfo}>
                  <h4>교촌치킨 영등포역점</h4>
                  <p>거리 250m · 월 추정 매출 1억 2,000만원</p>
                </div>
              </div>
              
              <button className={styles.expandBtn}>경쟁점 4개 더보기</button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
