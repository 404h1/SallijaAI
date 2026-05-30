// # v1. 실행 플랜 및 체크리스트 (F2, F3, F8)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, ArrowRight, AlertTriangle, Calendar, TrendingDown } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { useAction } from '../../context/ActionContext';
import styles from './PlanPage.module.css';

const MOCK_PLANS = [
  {
    id: 'p1',
    title: '주말 우천 대비 발주 조정표',
    module: 'F2',
    icon: Calendar,
    type: 'B', // 비용
    items: [
      { text: '평소 주말 대비 닭 발주량 20% 증가', done: false },
      { text: '배달 인력 1명 추가 배치', done: false },
      { text: '포장 용기 재고 확인 (최소 100세트)', done: true },
    ]
  },
  {
    id: 'p2',
    title: '비용 절감 액션 플랜',
    module: 'F8',
    icon: TrendingDown,
    type: 'C', // 위험
    items: [
      { text: '이번 달 인건비 5% 절감 시프트 조정', done: false },
      { text: '불필요한 구독/고정비 항목 정리', done: false },
      { text: '식자재 공급업체 단가 재협상 문의', done: false },
    ]
  }
];

export default function PlanPage() {
  const navigate = useNavigate();
  const { savedPlans } = useAction();
  const [plans, setPlans] = useState(MOCK_PLANS);

  const toggleItem = (planId, itemIndex) => {
    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      const newItems = [...p.items];
      newItems[itemIndex].done = !newItems[itemIndex].done;
      return { ...p, items: newItems };
    }));
  };

  return (
    <AppShell>
      <PageHeader title="실행 플랜 & 체크리스트" onBack={() => navigate(-1)} />
      
      <main className={styles.container}>
        <header className={styles.header}>
          <h2>액션 플랜을 실행해보세요</h2>
          <p className="text-muted">진단 결과를 바탕으로 사장님이 당장 해야 할 구체적 실행 목록입니다.</p>
        </header>

        <div className={styles.planList}>
          {plans.map(plan => {
            const completedCount = plan.items.filter(i => i.done).length;
            const progress = (completedCount / plan.items.length) * 100;

            return (
              <section key={plan.id} className={styles.planCard}>
                <div className={styles.planHeader}>
                  <div className={styles.planTitleRow}>
                    <div className={styles.iconBox}>
                      <plan.icon size={20} className={styles.icon} />
                    </div>
                    <h3 className={styles.planTitle}>{plan.title}</h3>
                  </div>
                  <span className={styles.progressText}>{completedCount}/{plan.items.length} 완료</span>
                </div>
                
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>

                <ul className={styles.itemList}>
                  {plan.items.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`${styles.item} ${item.done ? styles.itemDone : ''}`}
                      onClick={() => toggleItem(plan.id, idx)}
                    >
                      <button className={styles.checkbox}>
                        {item.done && <CheckSquare size={18} />}
                        {!item.done && <div className={styles.checkEmpty} />}
                      </button>
                      <span className={styles.itemText}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className={styles.noticeCard}>
          <AlertTriangle size={20} className={styles.noticeIcon} />
          <div className={styles.noticeContent}>
            <h4>플랜은 지속적으로 업데이트됩니다</h4>
            <p>데이터가 누적될수록 가게 상황에 딱 맞는 맞춤형 플랜이 제안됩니다. 실행 내역은 이력 페이지에 저장됩니다.</p>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
