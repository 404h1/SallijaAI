// # v1. 정책자금·지원사업 매칭 (F5) — 자격·마감·적합도 정렬 + 신청서 초안/서류 체크리스트.

import { useState } from 'react';
import { CalendarClock, Check, ChevronDown, ExternalLink, FileCheck2 } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { useActions } from '../../context/ActionContext';
import { MOCK_POLICIES } from '../../mock/policies';
import styles from './PolicyPage.module.css';

const TODAY = new Date('2026-05-30');

function dday(deadline) {
  if (!deadline) return null;
  const diff = Math.ceil((new Date(deadline) - TODAY) / 86400000);
  return diff;
}

export default function PolicyPage() {
  const { policyApplications, applyPolicy } = useActions();
  const [openId, setOpenId] = useState(MOCK_POLICIES[0]?.id || null);

  const sorted = [...MOCK_POLICIES].sort((a, b) => b.matchScore - a.matchScore);

  return (
    <AppShell header={<PageHeader title="정책자금 매칭" subtitle="받을 수 있는 지원" to="/dashboard" />}>
      <div className={styles.content}>
        <p className={styles.lead}>
          사장님 프로필로 자격을 대조한 결과예요. 적합도·마감일 순으로 정리했어요.
        </p>

        <div className={styles.list}>
          {sorted.map((p) => {
            const d = dday(p.deadline);
            const open = openId === p.id;
            const applied = policyApplications.includes(p.id);
            const urgent = d !== null && d <= 14;
            return (
              <div key={p.id} className={`${styles.card} ${!p.eligible ? styles.ineligible : ''}`}>
                <button
                  className={styles.cardHead}
                  onClick={() => setOpenId(open ? null : p.id)}
                >
                  <div className={styles.headMain}>
                    <div className={styles.headTop}>
                      <span className={styles.matchBadge}>적합 {p.matchScore}</span>
                      {p.eligible ? (
                        <span className={styles.eligible}>신청가능</span>
                      ) : (
                        <span className={styles.notEligible}>검토필요</span>
                      )}
                      {d !== null && (
                        <span className={`${styles.dday} ${urgent ? styles.ddayUrgent : ''}`}>
                          <CalendarClock size={12} />
                          {d > 0 ? `D-${d}` : '마감'}
                        </span>
                      )}
                    </div>
                    <p className={styles.title}>{p.title}</p>
                    <p className={styles.org}>{p.org} · {p.category} · {p.amount}</p>
                  </div>
                  <ChevronDown size={20} className={open ? styles.flip : ''} />
                </button>

                {open && (
                  <div className={styles.detail}>
                    <dl className={styles.specs}>
                      <div><dt>지원 규모</dt><dd>{p.amount}</dd></div>
                      <div><dt>금리·조건</dt><dd>{p.rate}</dd></div>
                      <div><dt>대상</dt><dd>{p.target}</dd></div>
                      <div><dt>접수 기간</dt><dd>{p.period}</dd></div>
                    </dl>

                    <div className={styles.reasons}>
                      <p className={styles.subLabel}>매칭 근거</p>
                      <ul>
                        {p.reasons.map((r, i) => (
                          <li key={i}><Check size={14} />{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.docs}>
                      <p className={styles.subLabel}><FileCheck2 size={14} /> 필요 서류</p>
                      <div className={styles.docTags}>
                        {p.docs.map((doc, i) => (
                          <span key={i} className={styles.docTag}>{doc}</span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.actions}>
                      <button
                        className={`${styles.applyBtn} ${applied ? styles.appliedBtn : ''}`}
                        onClick={() => applyPolicy(p.id)}
                        disabled={applied || !p.eligible}
                      >
                        {applied ? (<><Check size={16} /> 신청 표시됨</>) : '신청서 초안 만들기'}
                      </button>
                      <a className={styles.linkBtn} href={p.url} target="_blank" rel="noreferrer">
                        공고 <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
