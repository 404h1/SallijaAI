// # v1. 데이터 수집 최종 확인 및 진단 시작 페이지

import { useNavigate } from 'react-router-dom';
import { Activity, AlertTriangle, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { useStoreProfile } from '../../context/StoreProfileContext';
import styles from './Setup.module.css';

export default function ConfirmPage() {
  const navigate = useNavigate();
  const { setFinancials } = useStoreProfile();

  const handleStartAnalysis = () => {
    // 분석을 위한 필수 데이터 세팅 (Mock)
    setFinancials({
      yyyymm: '2026-05',
      sales: '64800000',
      rent: '2100000',
      labor: '12000000',
      materials: '35000000', // 임의의 재료비 (매출의 약 54%)
      inputSource: 'ocr',
    });
    
    // 상태가 'complete'로 바뀌면서 홈으로 이동 (가입 완료 팝업 트리거)
    navigate('/home?popup=welcome');
  };

  return (
    <div className={styles.page}>
      <PageHeader title="최종 확인" />
      
      <main className={styles.content}>
        <div className={styles.header}>
          <h2>수집된 데이터를 바탕으로<br/>정밀 진단을 시작합니다</h2>
        </div>

        <div className={styles.resultCard} style={{ flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>월 평균 매출</span>
            <strong style={{ fontSize: '1.1rem' }}>6,480만원</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>월 평균 임대료</span>
            <strong style={{ fontSize: '1.1rem' }}>210만원</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>월 평균 인건비</span>
            <strong style={{ fontSize: '1.1rem' }}>1,200만원</strong>
          </div>
        </div>

        <div style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)', padding: '16px', borderRadius: '12px', marginTop: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
            입력된 비용 구조를 보니 프라임 코스트(식자재+인건비) 비중이 다소 높은 편입니다. 분석을 통해 개선 방안을 바로 알려드릴게요.
          </p>
        </div>
      </main>

      <footer className={styles.bottomFixed}>
        <button 
          className={styles.btnPrimary} 
          onClick={handleStartAnalysis}
        >
          <Activity size={20} />
          AI 맞춤 분석 보고서 생성하기
        </button>
      </footer>
    </div>
  );
}
