// # v1. 통합 진단 대시보드 — 우선순위 큐(상위 2~3 펼침 + 더보기) + 3축 요약 + 위험 스코어
// 원칙: 뒤에선 8개 다 돌고, 앞에선 핵심만. (master_design_v2 §0)

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import DiagnosisCard from '../../components/domain/DiagnosisCard';
import { LoadingState, ErrorState, EmptyState, SkeletonCard } from '../../components/common/States';
import { useStoreProfile } from '../../context/StoreProfileContext';
import { useDiagnosis } from '../../context/DiagnosisContext';
import { AXES } from '../../config/modules';
import styles from './DashboardPage.module.css';

const EXPANDED_COUNT = 2; // 상위 N개 펼침

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile, status } = useStoreProfile();
  const { results, priorityQueue, riskScore, riskLabel, axisSummary, loading, error, lastRunAt, runDiagnosis } =
    useDiagnosis();
  const [showAll, setShowAll] = useState(false);

  // 진단 결과 없으면 자동 실행
  useEffect(() => {
    if (status === 'complete' && !lastRunAt && !loading) {
      runDiagnosis();
    }
  }, [status, lastRunAt, loading, runDiagnosis]);

  // 온보딩 미완료 → 입력 유도
  if (status !== 'complete') {
    return (
      <AppShell header={<Brand />}>
        <EmptyState
          title="먼저 가게 정보를 입력해 주세요"
          desc="매출·비용 4값만 넣으면 8개 모듈이 한꺼번에 진단을 시작해요."
          action={
            <button className={styles.primaryBtn} onClick={() => navigate('/onboarding')}>
              가게 정보 입력하기
            </button>
          }
        />
      </AppShell>
    );
  }

  if (loading) {
    return (
      <AppShell header={<Brand />}>
        <div className={styles.skeletonWrap}>
          <LoadingState message="8개 모듈을 분석하고 있어요…" />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell header={<Brand />}>
        <ErrorState desc={error} onRetry={runDiagnosis} />
      </AppShell>
    );
  }

  const queue = priorityQueue.map((id) => results[id]).filter(Boolean);
  const expandedCards = queue.slice(0, EXPANDED_COUNT);
  const collapsedCards = queue.slice(EXPANDED_COUNT);

  return (
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
            <div key={key} className={styles.axisItem} style={{ '--axis-c': AXES[key].color }}>
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

          {/* 더보기 */}
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
  );
}

function riskBucket(score) {
  if (score >= 70) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 30) return 'medium';
  return 'low';
}

/** 브랜드 헤더 (대시보드 전용) */
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
