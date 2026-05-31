// # v2. 통합 진단 대시보드 — 팝업(position:fixed)을 early return 밖으로 분리
// 원칙: 뒤에선 8개 다 돌고, 앞에선 핵심만. (master_design_v2 §0)

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown, X, TrendingUp, ChevronRight } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import DiagnosisCard from '../../components/domain/DiagnosisCard';
import { LoadingState, ErrorState, EmptyState, SkeletonCard } from '../../components/common/States';
import { useStoreProfile } from '../../context/StoreProfileContext';
import { useDiagnosis } from '../../context/DiagnosisContext';
import { AXES } from '../../config/modules';
import styles from './DashboardPage.module.css';

const EXPANDED_COUNT = 2;

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile, status } = useStoreProfile();
  const { results, priorityQueue, riskScore, riskLabel, axisSummary, loading, error, lastRunAt, runDiagnosis } =
    useDiagnosis();
  const [showAll, setShowAll] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [popupOpen, setPopupOpen] = useState(searchParams.get('showPopup') === 'true');

  const closePopup = () => {
    setPopupOpen(false);
    setSearchParams({});
  };

  useEffect(() => {
    if (status === 'complete' && !lastRunAt && !loading) {
      runDiagnosis();
    }
  }, [status, lastRunAt, loading, runDiagnosis]);

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

        {/* 성공 사례 */}
        <div className={styles.popupStory}>
          <p><strong>🍗 영등포 B치킨집 사장님</strong></p>
          <p>운전자금이 <strong>4개월</strong>밖에 안 남았다는 걸 살리자 AI가 먼저 알려줬어요. 정책자금 신청하고 인건비 구조 바꿨더니 한 달 만에 <strong>흑자 전환</strong>했습니다.</p>
        </div>
        <div className={styles.popupStory} style={{ marginTop: 8 }}>
          <p><strong>☕ 마포구 카페 사장님</strong></p>
          <p>점심 매출 공백이 잡히자 <strong>월매출 +22%</strong>. 브런치 세트 하나로 해결됐어요.</p>
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
