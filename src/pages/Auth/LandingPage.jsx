// # v2. 랜딩 페이지 — hero.png 활용, 성공사례 수치, 카카오 CTA

import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, FileText, ShieldCheck } from 'lucide-react';
import heroImg from '../../assets/hero.png';
import styles from './LandingPage.module.css';

const STATS = [
  { value: '8가지', label: '진단 모듈' },
  { value: '3분', label: '자료 연동' },
  { value: '무료', label: '분석 보고서' },
];

const CASES = [
  {
    icon: TrendingUp,
    name: '영등포 치킨집',
    result: '흑자 전환',
    desc: '운전자금 위기를 4개월 전에 발견, 정책자금으로 버텼어요.',
  },
  {
    icon: FileText,
    name: '마포 카페',
    result: '월매출 +22%',
    desc: '점심 공백 발견하고 브런치 세트 하나 추가했더니 달라졌어요.',
  },
  {
    icon: ShieldCheck,
    name: '강남 식당',
    result: '정책자금 수령',
    desc: 'D-9 마감 지원사업 3건, AI가 알아서 찾아줬어요.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* ── 헤더 ─────────────────────────────── */}
      <header className={styles.topBar}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>살</span>
          <span className={styles.logoName}><em>살리자</em> AI</span>
        </div>
      </header>

      {/* ── 히어로 ────────────────────────────── */}
      <section className={styles.hero}>
        <img src={heroImg} alt="살리자 AI" className={styles.heroImg} />
        <h1 className={styles.heroTitle}>
          사장님 가게,<br />
          <em>AI가 먼저 봐드립니다</em>
        </h1>
        <p className={styles.heroSub}>
          매출·비용·경쟁·트렌드 8가지를 한 번에 분석해<br />
          오늘 당장 해야 할 처방을 알려드려요.
        </p>
      </section>

      {/* ── 숫자 ──────────────────────────────── */}
      <section className={styles.statsRow}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.statItem}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── 성공 사례 ─────────────────────────── */}
      <section className={styles.cases}>
        <p className={styles.casesLabel}>실제 사장님 이야기</p>
        <div className={styles.caseList}>
          {CASES.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.name} className={styles.caseCard}>
                <div className={styles.caseTop}>
                  <span className={styles.caseIcon}><Icon size={16} /></span>
                  <span className={styles.caseName}>{c.name}</span>
                  <span className={styles.caseResult}>{c.result}</span>
                </div>
                <p className={styles.caseDesc}>{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 하단 CTA ──────────────────────────── */}
      <footer className={styles.footer}>
        <button className={styles.btnKakao} onClick={() => navigate('/signup')}>
          <span className={styles.kakaoIcon}>K</span>
          카카오로 3초 시작
          <ArrowRight size={18} />
        </button>
        <p className={styles.terms}>
          가입하면 <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 동의한 것으로 간주합니다.
        </p>
      </footer>
    </div>
  );
}
