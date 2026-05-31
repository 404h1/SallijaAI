// # v2. 데이터 등록 페이지 (Data Registration) - Toss 스타일 모바일 네이티브 레이아웃

import { useNavigate } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { Camera, FileSpreadsheet, Send, ChevronRight } from 'lucide-react';
import styles from './DataRegistrationPage.module.css';

export default function DataRegistrationPage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <PageHeader title="데이터 등록" back={true} home={false} />
      
      <main className={styles.container}>
        <header className={styles.header}>
          <h1>어떤 데이터를<br/>추가할까요?</h1>
          <p>매출, 지출 내역이나 영수증을 꾸준히 등록하면 AI 진단이 더 정확해집니다.</p>
        </header>

        <div className={styles.grid}>
          <button className={styles.actionCard}>
            <div className={`${styles.iconWrapper} ${styles.blueIcon}`}>
              <Camera size={28} />
            </div>
            <div className={styles.cardText}>영수증 스캔</div>
          </button>

          <button className={styles.actionCard}>
            <div className={`${styles.iconWrapper} ${styles.greenIcon}`}>
              <FileSpreadsheet size={28} />
            </div>
            <div className={styles.cardText}>엑셀 업로드</div>
          </button>
        </div>

        <section className={styles.listSection}>
          <h3 className={styles.listTitle}>자동 연동 관리</h3>
          
          <div className={styles.listItem}>
            <div className={styles.itemLeft}>
              <div className={`${styles.iconBox} ${styles.yellowBg}`}>
                <span className={styles.emojiIcon}>🏦</span>
              </div>
              <div className={styles.itemInfo}>
                <h4>카카오뱅크 사업자 계좌</h4>
                <p>매일 새벽에 내역을 불러옵니다.</p>
              </div>
            </div>
            <button className={styles.connectBtn}>
              <Send size={14} /> 연동하기
            </button>
          </div>

          <div className={styles.listItem}>
            <div className={styles.itemLeft}>
              <div className={`${styles.iconBox} ${styles.grayBg}`}>
                <span className={styles.emojiIcon}>💳</span>
              </div>
              <div className={styles.itemInfo}>
                <h4>여신금융협회 가맹점</h4>
                <p>카드사 매출 내역을 불러옵니다.</p>
              </div>
            </div>
            <ChevronRight size={20} color="#adb5bd" />
          </div>
        </section>
      </main>
    </AppShell>
  );
}
