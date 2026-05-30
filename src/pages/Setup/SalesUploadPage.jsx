// # v1. 매출/메뉴 영수증 업로드 및 자동 분석 Mock

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle2, Loader2, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import styles from './Setup.module.css';

export default function SalesUploadPage() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleUploadClick = () => {
    // 실제라면 파일 선택 창 띄우고 이미지 선택 후 업로드
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setCompleted(true);
    }, 2000); // 2초 분석 Mock
  };

  return (
    <div className={styles.page}>
      <PageHeader title="매출 데이터 연동" />
      
      <main className={styles.content}>
        <div className={styles.header}>
          <h2>찍어둔 매출, 메뉴판 등<br/>사진을 한 번에 올려주세요</h2>
          <p className="text-muted">AI가 알아서 판단해서 월별 메뉴, 매출 등 폼을 채워드립니다.</p>
        </div>

        {!completed ? (
          <div className={styles.uploadZone} onClick={handleUploadClick}>
            {uploading ? (
              <>
                <Loader2 size={48} className={styles.spin} color="var(--color-primary)" />
                <p className={styles.uploadText}>AI가 영수증을 분석 중입니다...</p>
                <p className={styles.uploadSub}>잠시만 기다려주세요</p>
              </>
            ) : (
              <>
                <div className={styles.uploadIcon}>
                  <UploadCloud size={32} />
                </div>
                <p className={styles.uploadText}>갤러리에서 사진 선택하기</p>
                <p className={styles.uploadSub}>POS 매출 내역, 메뉴별 판매 내역 등 (여러 장 가능)</p>
              </>
            )}
          </div>
        ) : (
          <div className={`${styles.resultCard} ${styles.animIn}`}>
            <div className={styles.resultIcon} style={{ background: 'var(--color-success-bg)' }}>
              <CheckCircle2 size={28} color="var(--color-success)" />
            </div>
            <div className={styles.resultInfo}>
              <h3>매출 분석 완료</h3>
              <p>최근 3개월 평균 매출: <strong>6,480만원</strong></p>
              <p>주요 판매 메뉴 15종 인식 완료</p>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.bottomFixed}>
        <button 
          className={styles.btnPrimary} 
          onClick={() => navigate('/setup/costs')}
          disabled={!completed}
        >
          맞는지 확인하고 다음 단계로 <ChevronRight size={20} />
        </button>
      </footer>
    </div>
  );
}
