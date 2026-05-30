// # v1. 랜딩 페이지

import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';
import styles from './Auth.module.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.landingContent}>
        <div className={styles.brandMark}>
          <Activity size={48} color="white" />
        </div>
        <h1 className={styles.title}>살리자 AI</h1>
        <p className={styles.subtitle}>사장님의 든든한 맞춤형 AI 비서</p>
        
        <div className={styles.valueProps}>
          <p>매출부터 비용 관리까지,</p>
          <p>매일매일 알아서 분석하고 처방해 드립니다.</p>
        </div>
      </div>
      
      <div className={styles.bottomFixed}>
        <button className={styles.btnPrimary} onClick={() => navigate('/signup')}>
          시작하기 <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
