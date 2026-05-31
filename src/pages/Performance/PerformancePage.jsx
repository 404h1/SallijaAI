// # v1. 성과 추적 (PDCA Sales Calendar)

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, BarChart2, CalendarDays } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import styles from './Performance.module.css';

export default function PerformancePage() {
  const [selectedDate, setSelectedDate] = useState(30);

  return (
    <AppShell>
      <PageHeader title="성과 추적" back={true} home={false} />
      <div className={styles.container}>
        {/* 상단 스크롤 요약 카드 */}
        <div className={styles.summaryScrollWrapper}>
          <div className={styles.summaryCards}>
            <div className={styles.card}>
              <h4>5월 누적 매출</h4>
              <div className={styles.cardValue}>5,813만 원</div>
              <div className={styles.cardSub}>POS 정산 기준</div>
            </div>
            <div className={styles.card}>
              <h4>일 평균 매출</h4>
              <div className={styles.cardValue}>264만 원</div>
              <div className={styles.cardSub}>영업일 기준</div>
            </div>
            <div className={styles.card}>
              <h4>점심 픽업 주문</h4>
              <div className={`${styles.cardValue} ${styles.positive}`}>+18%</div>
              <div className={styles.cardSub}>테스트 1주차</div>
            </div>
            <div className={styles.card}>
              <h4>위험도</h4>
              <div className={styles.cardValue}>
                <span className={styles.danger}>78</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.success}>71</span>
              </div>
              <div className={styles.cardSub}>개선 추정</div>
            </div>
          </div>
        </div>

        {/* 달력 영역 */}
        <div className={styles.calendarSection}>
          <div className={styles.calHeader}>
            <div className={styles.calTitleGroup}>
              <h3>2026년 5월 매출 캘린더</h3>
              <span className={styles.calSub}>POS 연동</span>
            </div>
            <div className={styles.calNav}>
              <button><ChevronLeft size={18} /></button>
              <button><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className={styles.calGrid}>
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className={styles.calDayHeader}>{day}</div>
            ))}
            
            {/* 빈 칸 */}
            {[...Array(5)].map((_, i) => (
              <div key={`empty-${i}`} className={styles.calCellEmpty}></div>
            ))}
            
            {/* 1일, 2일 휴무 */}
            <div className={styles.calCell}><span className={styles.dateNum}>1</span><span className={styles.holiday}>휴무</span></div>
            <div className={styles.calCell}><span className={styles.dateNum}>2</span><span className={styles.holiday}>휴무</span></div>

            {/* 매출 데이터 예시 */}
            {[...Array(29)].map((_, i) => {
              const day = i + 3;
              const sales = 200 + Math.floor(Math.random() * 100);
              const isSelected = day === selectedDate;
              const isHoliday = day % 7 === 1 || day % 7 === 2; // 임의 주말 느낌 휴무 (금/토로 쳤을 때)

              return (
                <div 
                  key={day} 
                  className={`${styles.calCell} ${isSelected ? styles.selected : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <span className={`${styles.dateNum} ${day % 7 === 3 ? styles.sunday : ''}`}>{day}</span>
                  {isHoliday ? (
                    <span className={styles.holiday}>휴무</span>
                  ) : (
                    <span className={styles.salesNum}>{day === 30 ? '286' : sales}만</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 상세 패널 */}
        <div className={styles.detailSection}>
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <BarChart2 size={18} color="var(--color-primary)" />
              <h4>선택한 날짜 상세</h4>
            </div>
            <p className={styles.detailDate}>2026년 5월 {selectedDate}일 매출 현황</p>
            
            <div className={styles.detailRows}>
              <div className={styles.detailRow}><span>총 매출</span><strong>286만 원</strong></div>
              <div className={styles.detailRow}><span>점심 픽업</span><strong>32건</strong></div>
              <div className={styles.detailRow}><span>객단가</span><strong>18,400원</strong></div>
              <div className={styles.detailRow}><span>원가율</span><strong>36%</strong></div>
            </div>

            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: '79%' }}></div>
            </div>
            <p className={styles.detailHint}>
              일 목표 대비 79%를 달성했습니다. 점심 픽업 주문이 실시간 POS 매출에 반영됩니다.
            </p>
          </div>

          <div className={styles.policyCard}>
            <div className={styles.detailHeader}>
              <CalendarIcon size={18} color="var(--color-warning)" />
              <h4>정책 일정</h4>
            </div>
            <p className={styles.policyDesc}>
              <strong>6월 8일</strong> · 소상공인 정책자금 융자 마감
            </p>
            <button className={styles.calendarBtn}>
              갤럭시 캘린더에 일정 추가
            </button>
          </div>
        </div>

      </div>
    </AppShell>
  );
}
