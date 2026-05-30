// # v1. 온보딩 Step2 — 이번 달 핵심 4값 (+ POS OCR mock)

import { useRef } from 'react';
import { Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { MoneyInput } from '../../../components/common/FormControls';
import styles from './Step2Financials.module.css';

/** 현재 월(YYYY-MM) — input[type=month] max 용 */
function currentYearMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

/** OCR mock 결과 (영등포 치킨집 골든패스 샘플) */
const OCR_MOCK_RESULT = {
  sales: '72000000',
  rent: '2800000',
  labor: '35000000',
  materials: '28000000',
};

export default function Step2Financials({ form, errors, onChange, ocrState, setOcrState, onOcrFill }) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // 같은 파일 재선택 허용
    if (!file) return;

    setOcrState('loading');
    // mock: 2초 후 인식 완료 (5% 확률로 실패 시뮬레이션은 생략, 항상 성공)
    setTimeout(() => {
      onOcrFill(OCR_MOCK_RESULT);
      setOcrState('done');
    }, 2000);
  };

  const isLoading = ocrState === 'loading';

  return (
    <div className="fields">
      {/* 기준 월 */}
      <div className={styles.monthRow}>
        <label className={styles.monthLabel} htmlFor="ob-month">
          기준 월 <span style={{ color: 'var(--color-danger)' }}>*</span>
        </label>
        <input
          id="ob-month"
          type="month"
          className={styles.monthInput}
          value={form.yyyymm}
          max={currentYearMonth()}
          onChange={(e) => onChange('yyyymm', e.target.value)}
        />
        {errors.yyyymm && (
          <span style={{ fontSize: 12, color: 'var(--color-danger)', fontWeight: 500 }}>{errors.yyyymm}</span>
        )}
      </div>

      {/* POS / 영수증 업로드 */}
      <div
        className={styles.uploader}
        role="button"
        tabIndex={0}
        onClick={() => !isLoading && fileRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !isLoading && fileRef.current?.click()}
      >
        <div className={styles.uploaderIcon}>
          <Camera size={22} />
        </div>
        <div className={styles.uploaderTitle}>POS 정산표·영수증 사진 올리기</div>
        <div className={styles.uploaderDesc}>
          사진 한 장이면 매출·비용을 자동으로 채워드려요.
          <br />
          (직접 입력도 가능합니다)
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className={styles.hiddenInput}
          onChange={handleFile}
        />
      </div>

      {/* OCR 상태 배너 */}
      {ocrState === 'loading' && (
        <div className={`${styles.banner} ${styles.bannerLoading}`}>
          <span className={styles.spinner} />
          사진을 분석하고 있어요… 잠시만요
        </div>
      )}
      {ocrState === 'done' && (
        <div className={`${styles.banner} ${styles.bannerDone}`}>
          <CheckCircle2 size={18} />
          자동 인식 완료! 값이 맞는지 확인하고 수정하세요.
        </div>
      )}
      {ocrState === 'error' && (
        <div className={`${styles.banner} ${styles.bannerError}`}>
          <AlertCircle size={18} />
          자동 인식에 실패했어요. 직접 입력해 주세요.
        </div>
      )}

      <div className={styles.divider}>또는 직접 입력</div>

      {/* 4값 입력 (로딩 중엔 스켈레톤) */}
      {isLoading ? (
        <div className={styles.skeletonGroup}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div className={styles.skeletonLabel} />
              <div className={styles.skeleton} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <MoneyInput
            label="한 달 매출"
            required
            value={form.sales}
            onChange={(v) => onChange('sales', v)}
            error={errors.sales}
          />
          <MoneyInput
            label="임대료 (월)"
            required
            value={form.rent}
            onChange={(v) => onChange('rent', v)}
            error={errors.rent}
          />
          <MoneyInput
            label="인건비 (월)"
            required
            value={form.labor}
            onChange={(v) => onChange('labor', v)}
            error={errors.labor}
            hint="사장님 본인 인건비도 포함하면 더 정확해요."
          />
          <MoneyInput
            label="재료비 (월)"
            required
            value={form.materials}
            onChange={(v) => onChange('materials', v)}
            error={errors.materials}
          />
        </>
      )}
    </div>
  );
}
