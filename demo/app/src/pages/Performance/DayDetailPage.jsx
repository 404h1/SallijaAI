// # v1. 일자별 매출 상세 — 카톡으로 연동된 28일 메뉴별 매출
// 카카오 채널로 보낸 일일 정산표 → OCR → 이 페이지에 자동 기록되는 데모

import { useParams } from 'react-router-dom';
import { MessageCircle, TrendingUp, Clock, Trophy } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import styles from './DayDetail.module.css';

// 영등포 동네 치킨집 · 박준영 사장님 · 5월 28일 (총 1,450,000원 / 58건)
const MENU_SALES = [
  { name: '후라이드 치킨', qty: 22, amount: 440000 },
  { name: '양념 치킨', qty: 15, amount: 330000 },
  { name: '간장마늘 치킨', qty: 9, amount: 234000 },
  { name: '반반 치킨', qty: 8, amount: 176000 },
  { name: '닭다리 구이', qty: 6, amount: 138000 },
  { name: '치즈볼', qty: 18, amount: 90000 },
  { name: '콜라 1.25L', qty: 14, amount: 42000 },
];

const TOTAL = MENU_SALES.reduce((s, m) => s + m.amount, 0); // 1,450,000
const ORDERS = 58;
const AVG = Math.round(TOTAL / ORDERS); // 25,000

// 시간대별 매출 분포 (피크)
const HOURLY = [
  { label: '11–14시', ratio: 0.22, tag: '점심 픽업' },
  { label: '14–17시', ratio: 0.12, tag: '' },
  { label: '17–20시', ratio: 0.38, tag: '저녁 피크' },
  { label: '20–23시', ratio: 0.28, tag: '배달' },
];

const won = (n) => n.toLocaleString('ko-KR');

export default function DayDetailPage() {
  const { date = '28' } = useParams();

  return (
    <AppShell>
      <PageHeader title={`5월 ${date}일 매출`} back={true} home={false} />
      <div className={styles.container}>
        {/* 카톡 연동 배너 */}
        <div className={styles.syncBanner}>
          <span className={styles.syncIcon}><MessageCircle size={16} /></span>
          <div className={styles.syncText}>
            <strong>카카오 채널로 자동 기록됨</strong>
            <span>오후 10:12 · 일일 정산표 사진 1장 → OCR 연동</span>
          </div>
        </div>

        {/* 핵심 요약 */}
        <div className={styles.summaryGrid}>
          <div className={styles.sumCard}>
            <span className={styles.sumLabel}>총 매출</span>
            <span className={styles.sumValue}>{won(TOTAL)}<em>원</em></span>
          </div>
          <div className={styles.sumCard}>
            <span className={styles.sumLabel}>주문 건수</span>
            <span className={styles.sumValue}>{ORDERS}<em>건</em></span>
          </div>
          <div className={styles.sumCard}>
            <span className={styles.sumLabel}>객단가</span>
            <span className={styles.sumValue}>{won(AVG)}<em>원</em></span>
          </div>
          <div className={styles.sumCard}>
            <span className={styles.sumLabel}>원가율</span>
            <span className={`${styles.sumValue} ${styles.warn}`}>36<em>%</em></span>
          </div>
        </div>

        {/* 메뉴별 매출 */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <Trophy size={18} color="var(--color-primary)" />
            <h3>메뉴별 매출</h3>
            <span className={styles.panelSub}>7종 · 매출순</span>
          </div>

          <div className={styles.menuList}>
            {MENU_SALES.map((m, i) => {
              const share = (m.amount / TOTAL) * 100;
              return (
                <div key={m.name} className={styles.menuRow}>
                  <span className={`${styles.rank} ${i === 0 ? styles.rankTop : ''}`}>{i + 1}</span>
                  <div className={styles.menuMain}>
                    <div className={styles.menuTop}>
                      <span className={styles.menuName}>{m.name}</span>
                      <span className={styles.menuAmount}>{won(m.amount)}원</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${i === 0 ? styles.barTop : ''}`}
                        style={{ width: `${share}%` }}
                      />
                    </div>
                    <div className={styles.menuMeta}>
                      <span>{m.qty}개 판매</span>
                      <span className={styles.share}>{share.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AI 한 줄 인사이트 */}
        <div className={styles.insight}>
          <span className={styles.insightIcon}><TrendingUp size={16} /></span>
          <p>
            <strong>후라이드 치킨</strong>이 매출의 <strong>30.3%</strong>로 1위예요.
            반면 사이드(치즈볼·콜라)는 14건뿐 — <strong>세트 묶음</strong>으로 객단가를 올릴 여지가 큽니다.
          </p>
        </div>

        {/* 시간대별 매출 */}
        <section className={styles.panel}>
          <div className={styles.panelHead}>
            <Clock size={18} color="var(--color-primary)" />
            <h3>시간대별 매출</h3>
          </div>
          <div className={styles.hourList}>
            {HOURLY.map((h) => (
              <div key={h.label} className={styles.hourRow}>
                <span className={styles.hourLabel}>{h.label}</span>
                <div className={styles.hourTrack}>
                  <div
                    className={`${styles.hourFill} ${h.ratio >= 0.35 ? styles.hourPeak : ''}`}
                    style={{ width: `${h.ratio * 100}%` }}
                  />
                </div>
                <span className={styles.hourPct}>{Math.round(h.ratio * 100)}%</span>
                {h.tag && <span className={styles.hourTag}>{h.tag}</span>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
