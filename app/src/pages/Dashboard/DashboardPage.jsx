// # v2. 통합 진단 대시보드 — 팝업(position:fixed)을 early return 밖으로 분리
// 원칙: 뒤에선 8개 다 돌고, 앞에선 핵심만. (master_design_v2 §0)

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown, X, TrendingUp, ChevronRight, Star } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import DiagnosisCard from '../../components/domain/DiagnosisCard';
import { LoadingState, ErrorState, EmptyState, SkeletonCard } from '../../components/common/States';
import { useStoreProfile } from '../../context/StoreProfileContext';
import { useDiagnosis } from '../../context/DiagnosisContext';
import { AXES } from '../../config/modules';
import styles from './DashboardPage.module.css';

import imgChicken from '../../assets/personas/chicken.png';
import imgCafe from '../../assets/personas/cafe.png';
import imgKorean from '../../assets/personas/korean.png';
import imgSalon from '../../assets/personas/salon.png';
import imgGym from '../../assets/personas/gym.png';

const EXPANDED_COUNT = 2;

const MOCK_REVIEWS = [
  {
    id: 1,
    persona: "🍗 영등포 B치킨집",
    avatar: imgChicken,
    text: "운전자금이 4개월밖에 안 남았다는 걸 먼저 알려줬어요. 정책자금 신청하고 인건비 구조 바꿨더니 한 달 만에 흑자 전환했습니다."
  },
  {
    id: 2,
    persona: "☕ 마포구 카페 사장",
    avatar: imgCafe,
    text: "점심 매출 공백이 심했는데, AI가 브런치 세트 메뉴를 제안해줬어요. 도입 후 바로 월매출 22% 올랐습니다!"
  },
  {
    id: 3,
    persona: "🍚 강남 백반집 사장",
    avatar: imgKorean,
    text: "식자재 원가율이 이렇게 높은지 몰랐어요. 배달 채널을 효율화하고 나서 영업이익률이 무려 8%p나 개선됐습니다."
  },
  {
    id: 4,
    persona: "✂️ 홍대 미용실 원장",
    avatar: imgSalon,
    text: "단골 재방문율이 떨어지는 걸 바로 캐치해주네요. 리뷰 관리 자동화로 네이버 예약이 전월 대비 30% 늘었어요!"
  },
  {
    id: 5,
    persona: "💪 분당 헬스장 관장",
    avatar: imgGym,
    text: "비수기 매출 방어를 위해 전단지 문구를 뽑았는데, PT 문의가 2배나 폭증했습니다. 진짜 최고예요."
  }
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile, status } = useStoreProfile();
  const { results, priorityQueue, riskScore, riskLabel, axisSummary, loading, error, lastRunAt, runDiagnosis } =
    useDiagnosis();
  const [showAll, setShowAll] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [popupOpen, setPopupOpen] = useState(searchParams.get('showPopup') === 'true');
  const [reviewIndex, setReviewIndex] = useState(0);

  const closePopup = () => {
    setPopupOpen(false);
    setSearchParams({});
  };

  useEffect(() => {
    if (status === 'complete' && !lastRunAt && !loading) {
      runDiagnosis();
    }
  }, [status, lastRunAt, loading, runDiagnosis]);

  useEffect(() => {
    if (!popupOpen) return;
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % MOCK_REVIEWS.length);
    }, 3500); // 3.5초마다 휙휙 넘어감
    return () => clearInterval(timer);
  }, [popupOpen]);

  // ── 팝업 (position:fixed → early return 영향 없음) ──────────────
  const Popup = popupOpen ? (
    <div className={styles.popupOverlay} onClick={closePopup}>
      <div className={styles.popupCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.popupClose} onClick={closePopup} aria-label="닫기">
          <X size={18} />
        </button>
        <div className={styles.popupIcon}>
          <TrendingUp size={28} color="white" />
        </div>
        <h2>지금 분석 자료만 올리면<br />무료 보고서를 드려요</h2>

        {/* 성공 사례 (리뷰 스와이프) */}
        <div className={styles.reviewCarousel}>
          {MOCK_REVIEWS.map((review, idx) => (
            <div 
              key={review.id} 
              className={`${styles.reviewCard} ${idx === reviewIndex ? styles.active : ''}`}
            >
              <div className={styles.reviewHeader}>
                <div className={styles.reviewProfile}>
                  <img src={review.avatar} alt="Profile" className={styles.reviewAvatar} />
                  <strong>{review.persona}</strong>
                </div>
                <div className={styles.stars}>
                  <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                  <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                  <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                  <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                  <Star size={14} fill="var(--color-warning)" color="var(--color-warning)" />
                </div>
              </div>
              <p className={styles.reviewText}>"{review.text}"</p>
            </div>
          ))}
          <div className={styles.carouselDots}>
            {MOCK_REVIEWS.map((_, idx) => (
              <span 
                key={idx} 
                className={`${styles.dot} ${idx === reviewIndex ? styles.activeDot : ''}`} 
              />
            ))}
          </div>
        </div>

        <p className={styles.popupDesc}>
          매출·비용 자료를 올려주시면 AI가 분석해<br />
          <b>맞춤 처방 보고서</b>를 만들어 드립니다.
        </p>
        <button className={styles.popupBtn} onClick={() => { closePopup(); navigate('/setup/sales'); }}>
          3분 만에 자료 연동하기
        </button>
      </div>
    </div>
  ) : null;

  // ── 가게 정보 미완료 ────────────────────────────────────────────
  if (status !== 'complete') {
    return (
      <>
        {Popup}
        <AppShell header={<Brand />}>
          <div className={styles.content}>
            <div className={styles.welcomeBox}>
              <p className={styles.welcomeHi}>안녕하세요 👋</p>
              <p className={styles.welcomeTitle}>
                {profile?.name ? `${profile.name} 분석 준비 중` : '가게 자료를 연동해 주세요'}
              </p>
              <p className={styles.welcomeDesc}>
                매출·비용 자료만 올리면 8개 모듈이 한꺼번에 진단을 시작해요.
              </p>
              <button className={styles.primaryBtn} onClick={() => navigate('/setup/sales')}>
                자료 연동하러 가기 <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </AppShell>
      </>
    );
  }

  // ── 로딩 ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        {Popup}
        <AppShell header={<Brand />}>
          <div className={styles.skeletonWrap}>
            <LoadingState message="8개 모듈을 분석하고 있어요…" />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </AppShell>
      </>
    );
  }

  // ── 에러 ────────────────────────────────────────────────────────
  if (error) {
    return (
      <>
        {Popup}
        <AppShell header={<Brand />}>
          <ErrorState desc={error} onRetry={runDiagnosis} />
        </AppShell>
      </>
    );
  }

  // ── 정상 대시보드 ───────────────────────────────────────────────
  const queue = priorityQueue.map((id) => results[id]).filter(Boolean);
  const expandedCards = queue.slice(0, EXPANDED_COUNT);
  const collapsedCards = queue.slice(EXPANDED_COUNT);

  return (
    <>
      {Popup}
      <AppShell header={<Brand />}>
        <div className={styles.content}>
          {/* 위험 스코어 + 가게명 */}
          <section className={styles.hero}>
            <div className={styles.heroLeft}>
              <p className={styles.heroStore}>{profile.name}</p>
              <p className={styles.heroSub}>
                {profile.industryName} · {profile.region}
              </p>
            </div>
            <div className={`${styles.riskGauge} ${styles[`risk_${riskBucket(riskScore)}`]}`}>
              <span className={styles.riskScore}>{riskScore}</span>
              <span className={styles.riskLabel}>위험 {riskLabel}</span>
            </div>
          </section>

          {/* 3축 요약 */}
          <section className={styles.axisSummary}>
            {Object.keys(AXES).map((key) => (
              <div key={key} className={styles.axisItem}>
                <span className={styles.axisLabel} style={{ color: AXES[key].color }}>
                  {AXES[key].full}
                </span>
                <div className={styles.axisTrack}>
                  <div
                    className={styles.axisFill}
                    style={{ width: `${axisSummary[key]}%`, background: AXES[key].color }}
                  />
                </div>
              </div>
            ))}
          </section>

          {/* 우선순위 큐 */}
          <section className={styles.queue}>
            <div className={styles.queueHead}>
              <h2 className={styles.queueTitle}>지금 가장 중요한 것</h2>
              <span className={styles.queueCount}>{queue.length}개 모듈 분석됨</span>
            </div>

            <div className={styles.cards}>
              {expandedCards.map((r) => (
                <DiagnosisCard key={r.moduleId} result={r} expanded />
              ))}
            </div>

            {collapsedCards.length > 0 && (
              <>
                {showAll && (
                  <div className={styles.cards}>
                    {collapsedCards.map((r) => (
                      <DiagnosisCard key={r.moduleId} result={r} />
                    ))}
                  </div>
                )}
                <button className={styles.moreBtn} onClick={() => setShowAll((v) => !v)}>
                  {showAll ? '접기' : `나머지 ${collapsedCards.length}개 모듈 더보기`}
                  <ChevronDown size={18} className={showAll ? styles.flip : ''} />
                </button>
              </>
            )}
          </section>
        </div>
      </AppShell>
    </>
  );
}

function riskBucket(score) {
  if (score >= 70) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 30) return 'medium';
  return 'low';
}

function Brand() {
  return (
    <header className={styles.brand}>
      <div className={styles.brandMark}>살</div>
      <span className={styles.brandName}>
        <em>살리자</em> AI
      </span>
    </header>
  );
}
