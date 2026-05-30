// # v1. 비용(임대료/인건비) 영수증 업로드 및 카카오뱅크 연동 Mock

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle2, Loader2, ChevronRight, MessageCircle } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import styles from './Setup.module.css';

export default function CostsUploadPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [method, setMethod] = useState(null); // 'gallery' | 'bank'

  const handleBankLink = () => {
    setMethod('bank');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 2500); // 카카오뱅크 연동 Mock
  };

  const handleGalleryUpload = () => {
    setMethod('gallery');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
    }, 2000);
  };

  return (
    <div className={styles.page}>
      <PageHeader title="비용 데이터 연동" />
      
      <main className={styles.content}>
        <div className={styles.header}>
          <h2>임대료와 인건비 나간 내역도<br/>올려주세요</h2>
          <p className="text-muted">필수는 아니지만, 입력하면 훨씬 정확한 처방이 나옵니다.</p>
        </div>

        {!completed ? (
          <>
            {/* 카카오뱅크 간편 연동 */}
            <div className={styles.bankLinkBox} onClick={handleBankLink}>
              <div className={styles.bankLeft}>
                <MessageCircle size={24} color="#000" />
                <div>
                  <h4>카카오 뱅크로 더 쉽게 하기</h4>
                  <p>사업자 계좌 연동 시 1초만에 내역 불러오기</p>
                </div>
              </div>
              <ChevronRight size={20} color="rgba(0,0,0,0.4)" />
            </div>

            <div style={{ textAlign: 'center', margin: '24px 0', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              또는 영수증 직접 업로드
            </div>

            {/* 영수증 직접 업로드 */}
            <div className={styles.uploadZone} onClick={handleGalleryUpload}>
              {loading && method === 'gallery' ? (
                <>
                  <Loader2 size={48} className={styles.spin} color="var(--color-primary)" />
                  <p className={styles.uploadText}>영수증 분석 중...</p>
                </>
              ) : (
                <>
                  <div className={styles.uploadIcon}>
                    <UploadCloud size={32} />
                  </div>
                  <p className={styles.uploadText}>갤러리에서 사진 선택하기</p>
                  <p className={styles.uploadSub}>임대료 입금증, 급여 이체 내역 등</p>
                </>
              )}
            </div>

            {loading && method === 'bank' && (
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <Loader2 size={24} className={styles.spin} color="#FEE500" style={{ margin: '0 auto 8px' }} />
                <p style={{ fontSize: '0.9rem' }}>카카오 뱅크 연동 중입니다...</p>
              </div>
            )}
          </>
        ) : (
          <div className={`${styles.resultCard} ${styles.animIn}`}>
            <div className={styles.resultIcon} style={{ background: 'var(--color-success-bg)' }}>
              <CheckCircle2 size={28} color="var(--color-success)" />
            </div>
            <div className={styles.resultInfo}>
              <h3>비용 분석 완료</h3>
              <p>{method === 'bank' ? '카카오뱅크 사업자 계좌 내역 기반' : '업로드한 영수증 내역 기반'}</p>
              <p>임대료 <strong>210만원</strong>, 인건비 <strong>1,200만원</strong> 인식</p>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.bottomFixed}>
        <button 
          className={styles.btnSecondary} 
          onClick={() => navigate('/setup/confirm')}
          style={{ marginBottom: '12px' }}
          disabled={loading}
        >
          건너뛰고 나중에 할래요
        </button>
        <button 
          className={styles.btnPrimary} 
          onClick={() => navigate('/setup/confirm')}
          disabled={!completed}
        >
          확인하고 최종 처방 받기 <ChevronRight size={20} />
        </button>
      </footer>
    </div>
  );
}
