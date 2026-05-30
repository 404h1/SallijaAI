// # v1. 추적(PDCA) 이력 및 성과 리뷰 페이지

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Activity, Star, AlertCircle, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { MOCK_HISTORY, MOCK_RATING_TREND, MOCK_SALES_TREND, MOCK_RECOVERY_CASES } from '../../mock/history';
import styles from './HistoryPage.module.css';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'trends' | 'cases'

  return (
    <AppShell>
      <PageHeader title="진단 이력 및 추적" onBack={() => navigate(-1)} />
      
      <main className={styles.container}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'timeline' ? styles.active : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            타임라인
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'trends' ? styles.active : ''}`}
            onClick={() => setActiveTab('trends')}
          >
            추세 현황
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'cases' ? styles.active : ''}`}
            onClick={() => setActiveTab('cases')}
          >
            회생 사례
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'timeline' && (
            <div className={styles.timeline}>
              {MOCK_HISTORY.map(item => (
                <div key={item.id} className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>
                    {item.type === 'diagnosis' ? <Activity size={18} /> : <HistoryIcon size={18} />}
                  </div>
                  <div className={styles.timelineCard}>
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineDate}>{item.date}</span>
                      {item.riskLevel === 'critical' && (
                        <span className={styles.badgeCritical}>위험</span>
                      )}
                    </div>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineSummary}>{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trends' && (
            <div className={styles.trends}>
              <section className={styles.chartSection}>
                <div className={styles.chartHeader}>
                  <h3>월별 평점 추세</h3>
                  <div className={styles.chartValue}><Star size={16} fill="currentColor" /> 3.9</div>
                </div>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={MOCK_RATING_TREND}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                      <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                      <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                      <Line type="monotone" dataKey="rating" stroke="var(--color-warning)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className={styles.chartInsight}>
                  <AlertCircle size={16} /> 5월 들어 평점이 지속 하락 중입니다. 리뷰 관리가 시급합니다.
                </div>
              </section>

              <section className={styles.chartSection}>
                <div className={styles.chartHeader}>
                  <h3>월별 매출 추세 (단위: 만원)</h3>
                  <div className={styles.chartValue}>-11% (3개월)</div>
                </div>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={MOCK_SALES_TREND}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                      <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                      <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                      <Line type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'cases' && (
            <div className={styles.cases}>
              <p className={styles.casesIntro}>우리 가게와 비슷한 위기를 겪고 극복한 사장님들의 사례입니다.</p>
              
              {MOCK_RECOVERY_CASES.map((c, idx) => (
                <div key={idx} className={styles.caseCard}>
                  <div className={styles.caseHeader}>
                    <span className={styles.caseSource}>{c.source}</span>
                    <span className={styles.caseIndustry}>{c.industry}</span>
                  </div>
                  
                  <div className={styles.caseBody}>
                    <div className={styles.caseRow}>
                      <span className={styles.caseLabel}>위기 신호</span>
                      <strong className={styles.caseDanger}>{c.crisisSignal}</strong>
                    </div>
                    <div className={styles.caseRow}>
                      <span className={styles.caseLabel}>극복 행동</span>
                      <span className={styles.caseActions}>{c.recoveryAction.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className={styles.caseFooter}>
                    <span className={styles.caseOutcome}>{c.outcome}</span>
                    <button className={styles.caseBtn}>자세히 보기 <ChevronRight size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </AppShell>
  );
}
