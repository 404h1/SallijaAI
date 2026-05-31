// # v2. 매출 업로드 — OCR 스캔 애니메이션 + 월별 데이터 블럭

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle2, ChevronRight, ScanLine, Sparkles } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import styles from './Setup.module.css';

/* ── 월별 Mock OCR 결과 ─────────────────────────── */
const MONTHLY_DATA = [
  { yyyymm: '2026년 3월', menus: 12, sales: '6,240만원', items: ['양념치킨', '후라이드', '파닭'] },
  { yyyymm: '2026년 4월', menus: 14, sales: '6,480만원', items: ['양념치킨', '후라이드', '마늘치킨', '파닭'] },
  { yyyymm: '2026년 5월', menus: 15, sales: '7,200만원', items: ['양념치킨', '반반치킨', '마늘치킨', '콤보'] },
];

/* phase: idle → scanning → analyzing → done */
export default function SalesUploadPage() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'scanning' | 'analyzing' | 'done'
  const [visibleCount, setVisibleCount] = useState(0); // monthly blocks revealed one by one

  const handleUploadClick = () => {
    if (phase !== 'idle') return;
    // 실제라면 fileRef.current.click() → 파일 선택 후 처리
    setPhase('scanning');

    // 1.8s 스캔 → analyzing
    setTimeout(() => {
      setPhase('analyzing');

      // 1.5s 분석 → done, 블럭 순차 등장
      setTimeout(() => {
        setPhase('done');
        // 월별 블럭 300ms 간격으로 하나씩
        MONTHLY_DATA.forEach((_, i) => {
          setTimeout(() => setVisibleCount(i + 1), i * 340);
        });
      }, 1500);
    }, 1800);
  };

  return (
    <div className={styles.page}>
      <PageHeader title="매출 데이터 연동" />

      <main className={styles.content}>
        <div className={styles.header}>
          <h2>찍어둔 매출, 메뉴판 등<br />사진을 한 번에 올려주세요</h2>
          <p className="text-muted">AI가 알아서 판단해서 월별 메뉴, 매출 등 폼을 채워드립니다.</p>
        </div>

        {/* ── IDLE ── */}
        {phase === 'idle' && (
          <div className={styles.uploadZone} onClick={handleUploadClick}>
            <div className={styles.uploadIcon}>
              <UploadCloud size={32} />
            </div>
            <p className={styles.uploadText}>갤러리에서 사진 선택하기</p>
            <p className={styles.uploadSub}>POS 매출 내역, 메뉴별 판매 내역 등 (여러 장 가능)</p>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} />
          </div>
        )}

        {/* ── SCANNING ── */}
        {phase === 'scanning' && (
          <div className={styles.scanWrap}>
            <div className={styles.receiptPaper}>
              <div className={styles.receiptLines}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={styles.receiptLine} style={{ width: `${60 + (i % 3) * 15}%` }} />
                ))}
              </div>
              <div className={styles.scanLine} />
            </div>
            <p className={styles.scanLabel}>
              <ScanLine size={16} /> 영수증 스캔 중…
            </p>
          </div>
        )}

        {/* ── ANALYZING ── */}
        {phase === 'analyzing' && (
          <div className={styles.analyzingWrap}>
            <div className={styles.analyzingSpinner}>
              <Sparkles size={28} color="var(--color-primary)" />
            </div>
            <p className={styles.analyzingText}>AI가 매출·메뉴를 분석하고 있어요</p>
            <p className={styles.analyzingDots}>
              <span>·</span><span>·</span><span>·</span>
            </p>
          </div>
        )}

        {/* ── DONE: 월별 블럭 ── */}
        {phase === 'done' && (
          <div className={styles.monthlyResult}>
            <div className={styles.monthlyHeader}>
              <CheckCircle2 size={20} color="var(--color-success)" />
              <span>OCR 분석 완료 — 3개월 데이터 인식</span>
            </div>

            <div className={styles.monthlyBlocks}>
              {MONTHLY_DATA.map((m, i) => (
                <div
                  key={m.yyyymm}
                  className={`${styles.monthBlock} ${i < visibleCount ? styles.monthBlockVisible : ''}`}
                >
                  <div className={styles.monthBlockLeft}>
                    <CheckCircle2 size={18} color="var(--color-success)" />
                    <div>
                      <p className={styles.monthBlockTitle}>{m.yyyymm} 데이터 완료</p>
                      <p className={styles.monthBlockMeta}>메뉴 {m.menus}종 · 매출 {m.sales}</p>
                    </div>
                  </div>
                  <div className={styles.monthBlockTags}>
                    {m.items.slice(0, 2).map((item) => (
                      <span key={item} className={styles.menuTag}>{item}</span>
                    ))}
                    {m.items.length > 2 && (
                      <span className={styles.menuTag}>+{m.items.length - 2}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.monthlySummary}>
              <div className={styles.summaryRow}>
                <span>3개월 평균 매출</span>
                <strong>6,640만원</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>인식된 총 메뉴</span>
                <strong>15종</strong>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.bottomFixed}>
        <button
          className={styles.btnPrimary}
          onClick={() => navigate('/setup/costs')}
          disabled={phase !== 'done'}
        >
          맞는지 확인하고 다음 단계로 <ChevronRight size={20} />
        </button>
      </footer>
    </div>
  );
}
