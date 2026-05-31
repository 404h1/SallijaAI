// # v2. 온보딩 Step2 — 영수증 업로드 특화 (스캔 애니메이션 + 폼 노출)

import { useRef, useState, useEffect } from 'react';
import { Camera, CheckCircle2, FileEdit } from 'lucide-react';
import { MoneyInput } from '../../../components/common/FormControls';
import styles from './Step2Financials.module.css';

function currentYearMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const OCR_MOCK_RESULT = {
  sales: '72000000',
  rent: '2800000',
  labor: '', // 인건비는 수동 입력 유도
  materials: '28000000',
};

export default function Step2Financials({ form, errors, onChange, ocrState, setOcrState, onOcrFill }) {
  const fileRef = useRef(null);
  
  // 'initial' | 'scanning' | 'done'
  const [scanStage, setScanStage] = useState('initial');
  const [showBoxes, setShowBoxes] = useState(false);

  useEffect(() => {
    // 폼에 이미 값이 채워져 있다면 (뒤로가기 등) 바로 done 처리
    if (form.sales || form.rent) {
      setScanStage('done');
    }
  }, [form]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; 
    if (!file) return;

    setScanStage('scanning');
    setShowBoxes(false);
    
    // 1.5초 후 바운딩 박스 표시
    setTimeout(() => {
      setShowBoxes(true);
    }, 1500);

    // 3초 후 폼으로 데이터 전달 및 완료
    setTimeout(() => {
      onOcrFill(OCR_MOCK_RESULT);
      setScanStage('done');
    }, 3000);
  };

  const handleManualEntry = () => {
    setScanStage('done');
  };

  return (
    <div className={styles.container}>
      {/* 1. 업로드 대기 상태 */}
      {scanStage === 'initial' && (
        <div className={styles.initialState}>
          <div className={styles.monthRow}>
            <label className={styles.monthLabel}>기준 월</label>
            <input
              type="month"
              className={styles.monthInput}
              value={form.yyyymm}
              max={currentYearMonth()}
              onChange={(e) => onChange('yyyymm', e.target.value)}
            />
          </div>

          <div className={styles.uploadZone} onClick={() => fileRef.current?.click()}>
            <div className={styles.uploadIconWrap}>
              <Camera size={36} color="var(--color-primary)" />
            </div>
            <h3>POS 정산표·영수증 사진 올리기</h3>
            <p>사진 한 장이면 매출·비용을 자동으로 채워드려요.</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleFile}
            />
          </div>

          <button className={styles.manualBtn} onClick={handleManualEntry}>
            <FileEdit size={16} />
            또는 직접 입력할래요
          </button>
        </div>
      )}

      {/* 2. 스캔 애니메이션 상태 */}
      {scanStage === 'scanning' && (
        <div className={styles.scanContainer}>
          <div className={styles.receiptMock}>
            <div className={styles.receiptHeader}>영수증</div>
            <div className={styles.receiptLines}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
            
            {showBoxes && (
              <>
                <div className={`${styles.boundingBox} ${styles.box1}`}>매출 7,200만원</div>
                <div className={`${styles.boundingBox} ${styles.box2}`}>임대료 280만원</div>
                <div className={`${styles.boundingBox} ${styles.box3}`}>재료비 2,800만원</div>
              </>
            )}

            <div className={styles.scanLine}></div>
          </div>
          <p className={styles.scanText}>
            {showBoxes ? '데이터를 추출하고 있습니다...' : '영수증을 스캔하고 있습니다...'}
          </p>
        </div>
      )}

      {/* 3. 스캔 완료 및 폼 노출 상태 */}
      {scanStage === 'done' && (
        <div className={`${styles.formState} ${styles.animFadeIn}`}>
          <div className={styles.doneBanner}>
            <CheckCircle2 size={18} />
            인식된 항목은 밝게 표시됩니다. 빈칸을 마저 채워주세요!
          </div>

          <div className={styles.monthRow} style={{ marginBottom: '24px' }}>
            <label className={styles.monthLabel}>기준 월 <span style={{ color: 'var(--color-danger)' }}>*</span></label>
            <input
              type="month"
              className={styles.monthInput}
              value={form.yyyymm}
              max={currentYearMonth()}
              onChange={(e) => onChange('yyyymm', e.target.value)}
            />
          </div>

          <div className={form.sales ? styles.highlightWrap : ''}>
            <MoneyInput
              label="한 달 매출"
              required
              value={form.sales}
              onChange={(v) => onChange('sales', v)}
              error={errors.sales}
            />
          </div>

          <div className={form.rent ? styles.highlightWrap : ''}>
            <MoneyInput
              label="임대료 (월)"
              required
              value={form.rent}
              onChange={(v) => onChange('rent', v)}
              error={errors.rent}
            />
          </div>

          <div className={form.labor ? styles.highlightWrap : ''}>
            <MoneyInput
              label="인건비 (월)"
              required
              value={form.labor}
              onChange={(v) => onChange('labor', v)}
              error={errors.labor}
              hint="사장님 본인 인건비도 포함하면 더 정확해요."
            />
          </div>

          <div className={form.materials ? styles.highlightWrap : ''}>
            <MoneyInput
              label="재료비 (월)"
              required
              value={form.materials}
              onChange={(v) => onChange('materials', v)}
              error={errors.materials}
            />
          </div>
        </div>
      )}
    </div>
  );
}
