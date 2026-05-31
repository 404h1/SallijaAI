// # v2. AI 자동화 액션 트래커 (가계부 스타일 월별 넘김 + 자동화 진행 현황)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, TrendingDown, CheckCircle2, Loader2, Sparkles, FileText } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import styles from './PlanPage.module.css';

const MONTHS = [1, 2, 3, 4, 5, 6];

const MOCK_AUTOMATED_PLANS = [
  {
    id: 'p1',
    title: '주말 우천 대비 자동 발주 조율',
    subtitle: '살리자 AI가 발주 시스템에 자동 연동합니다.',
    icon: Calendar,
    items: [
      { 
        title: '포장 용기 재고 파악 및 추가 발주', 
        desc: '최소 재고 100세트 도달로 거래처 자동 발주 완료', 
        status: 'done' 
      },
      { 
        title: '주말 닭 발주량 20% 상향 적용', 
        desc: '시스템 승인 대기 중 (사장님 알림 발송됨)', 
        status: 'done' 
      },
      { 
        title: '배달 대행사 기사 추가 호출 예약', 
        desc: '비 소식에 맞춰 AI가 토요일 18시 기사 1명 우선 배차 진행 중', 
        status: 'doing' 
      },
    ]
  },
  {
    id: 'p2',
    title: '고정비 절감 및 시프트 최적화',
    subtitle: '이번 달 비용 5% 절감을 위한 AI 자동 설정 내역입니다.',
    icon: TrendingDown,
    items: [
      { 
        title: '불필요한 식자재 구독 취소', 
        desc: '최근 2달 미사용 식자재 거래처에 보류 이메일 발송 완료', 
        status: 'done' 
      },
      { 
        title: '인건비 절감 시프트 자동 생성', 
        desc: '유휴 시간대 파트타임 스케줄 15% 감축안 직원 앱에 공지 중', 
        status: 'doing' 
      },
    ]
  }
];

export default function PlanPage() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(5); // 기본 5월

  return (
    <AppShell>
      <PageHeader title="자동화 액션 트래커" onBack={() => navigate(-1)} />
      
      <main className={styles.container}>
        {/* 월 선택 (가계부 느낌) */}
        <div className={styles.monthSelectorWrapper}>
          <div className={styles.monthScroll}>
            {MONTHS.map(m => (
              <div 
                key={m} 
                className={`${styles.monthTab} ${selectedMonth === m ? styles.active : ''}`}
                onClick={() => setSelectedMonth(m)}
              >
                {m}월
              </div>
            ))}
          </div>
        </div>

        {/* 보고서 보기 버튼 및 타이틀 */}
        <div className={styles.reportHeader}>
          <h2>{selectedMonth}월 자동화 내역</h2>
          <button className={styles.reportBtn} onClick={() => navigate('/dashboard')}>
            <FileText size={16} />
            {selectedMonth}월 보고서 보기
          </button>
        </div>

        {/* 자동화 플랜 리스트 */}
        <div className={styles.planList}>
          {MOCK_AUTOMATED_PLANS.map(plan => (
            <section key={plan.id} className={styles.planCard}>
              <div className={styles.planHeader}>
                <div className={styles.iconBox}>
                  <plan.icon size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className={styles.planTitle}>{plan.title}</h3>
                  <p className={styles.planSub}>{plan.subtitle}</p>
                </div>
              </div>

              {/* 타임라인 스타일 아이템 */}
              <div className={styles.itemList}>
                {plan.items.map((item, idx) => (
                  <div key={idx} className={styles.item}>
                    <div className={`${styles.itemStatusIcon} ${item.status === 'done' ? styles.statusDone : styles.statusDoing}`}>
                      {item.status === 'done' ? <CheckCircle2 size={16} /> : <Loader2 size={16} className={styles.spinIcon} />}
                    </div>
                    <div className={`${styles.itemContent} ${item.status === 'done' ? styles.done : ''}`}>
                      <div className={styles.itemTitle}>{item.title}</div>
                      <div className={styles.itemDesc}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.noticeCard}>
          <Sparkles size={24} className={styles.noticeIcon} />
          <div className={styles.noticeContent}>
            <h4>살리자 AI가 매장을 알아서 관리합니다</h4>
            <p>사장님이 직접 신경 쓰지 않아도, 진단 결과를 바탕으로 시스템이 자동으로 발주하고 시프트를 조정합니다.</p>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
