// # v1. 회원가입 페이지 (카카오 로그인 Mock)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, MessageCircle, Loader2 } from 'lucide-react';
import styles from './Auth.module.css';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = () => {
    setLoading(true);
    // 1.5초 후 로그인 성공 가정하고 가게 정보 입력 페이지로 이동
    setTimeout(() => {
      navigate('/setup/basic');
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.landingContent}>
        <div className={styles.brandMarkSmall}>
          <Activity size={32} color="var(--color-primary)" />
        </div>
        <h1 className={styles.titleDark}>시작하기</h1>
        <p className={styles.subtitleDark}>3초만에 빠른 회원가입</p>
      </div>
      
      <div className={styles.bottomFixed}>
        <button 
          className={styles.btnKakao} 
          onClick={handleKakaoLogin}
          disabled={loading}
        >
          {loading ? (
            <Loader2 size={24} className={styles.spin} />
          ) : (
            <MessageCircle size={24} fill="currentColor" />
          )}
          <span>카카오로 시작하기</span>
        </button>
        <p className={styles.termsText}>
          시작하기를 누르면 이용약관 및 개인정보처리방침에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
