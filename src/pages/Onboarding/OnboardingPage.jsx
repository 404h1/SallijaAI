// # v1. 온보딩 페이지 — Step1~4 조립, 검증, Context 저장, 대시보드 이동

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import StepIndicator from '../../components/common/StepIndicator';
import Step1Profile from './steps/Step1Profile';
import Step2Financials from './steps/Step2Financials';
import Step3Optional from './steps/Step3Optional';
import Step4Confirm from './steps/Step4Confirm';
import { useStoreProfile } from '../../context/StoreProfileContext';
import { findIndustryName } from '../../utils/industries';
import styles from './OnboardingPage.module.css';

const STEP_LABELS = ['기본 정보', '매출·비용', '정밀 입력', '확인'];

const STEP_META = [
  {
    title: '가게 정보를 알려주세요',
    desc: '업종과 위치에 맞는 동네 데이터를 자동으로 찾아드려요.',
  },
  {
    title: '이번 달 매출과 비용은요?',
    desc: 'POS 영수증 사진을 올리면 자동으로 채워드려요.',
  },
  {
    title: '더 알면 진단이 정밀해져요',
    desc: '건너뛰어도 기본 진단(손익분기·정책자금·콘텐츠)은 받을 수 있어요.',
  },
  {
    title: '입력 내용을 확인해 주세요',
    desc: '분석을 시작하면 8개 모듈이 한꺼번에 돌아요.',
  },
];

const INITIAL_FORM = {
  // Step 1
  storeName: '',
  industry: '',
  region: '',
  coords: null,
  // Step 2
  yyyymm: '',
  sales: '',
  rent: '',
  labor: '',
  materials: '',
  inputSource: 'manual',
  // Step 3 (optional)
  avgTicket: '',
  dailyCustomers: '',
  debt: '',
  monthlyDebtPayment: '',
  rating: '',
  reviewCount: '',
};

/** 스텝별 검증 — 에러 객체 반환 (빈 객체 = 통과) */
function validate(step, form) {
  const errors = {};
  if (step === 0) {
    if (!form.storeName.trim()) errors.storeName = '가게 이름을 입력해 주세요';
    if (!form.industry) errors.industry = '업종을 선택해 주세요';
    if (!form.region.trim()) errors.region = '위치를 입력해 주세요';
  }
  if (step === 1) {
    if (!form.yyyymm) errors.yyyymm = '기준 월을 선택해 주세요';
    if (form.sales === '') errors.sales = '매출을 입력해 주세요';
    if (form.rent === '') errors.rent = '임대료를 입력해 주세요';
    if (form.labor === '') errors.labor = '인건비를 입력해 주세요';
    if (form.materials === '') errors.materials = '재료비를 입력해 주세요';
  }
  if (step === 2) {
    if (form.rating !== '' && (Number(form.rating) < 1 || Number(form.rating) > 5)) {
      errors.rating = '1.0~5.0 사이로 입력해 주세요';
    }
  }
  return errors;
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { profile, financials, setProfile, setFinancials, setOptional, setManual } = useStoreProfile();

  // context에 기존 데이터 있으면 pre-fill
  const [form, setForm] = useState(() => ({
    ...INITIAL_FORM,
    storeName: profile.name || '',
    industry: profile.industry || '',
    region: profile.region || '',
    coords: profile.coords || null,
    yyyymm: financials.yyyymm || '',
    sales: financials.sales || '',
    rent: financials.rent || '',
    labor: financials.labor || '',
    materials: financials.materials || '',
  }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [ocrState, setOcrState] = useState('idle');
  const [analyzing, setAnalyzing] = useState(false);

  const handleChange = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleOcrFill = useCallback((data) => {
    setForm((prev) => ({ ...prev, ...data, inputSource: 'ocr' }));
  }, []);

  const goNext = () => {
    const errs = validate(step, form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const goPrev = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const skipStep3 = () => {
    setErrors({});
    setStep(3);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setProfile({
      name: form.storeName,
      industry: form.industry,
      industryName: findIndustryName(form.industry),
      region: form.region,
      coords: form.coords,
    });
    setFinancials({
      yyyymm: form.yyyymm,
      sales: form.sales,
      rent: form.rent,
      labor: form.labor,
      materials: form.materials,
      inputSource: form.inputSource,
    });
    setOptional({
      avgTicket: form.avgTicket,
      dailyCustomers: form.dailyCustomers,
      debt: form.debt,
      monthlyDebtPayment: form.monthlyDebtPayment,
    });
    setManual({
      rating: form.rating,
      reviewCount: form.reviewCount,
    });
    // mock 분석 딜레이
    await new Promise((r) => setTimeout(r, 1500));
    navigate('/dashboard');
  };

  const isLastStep = step === STEP_LABELS.length - 1;
  const isFirstStep = step === 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* 헤더 */}
        <header className={styles.header}>
          <div className={styles.brandRow}>
            <div className={styles.brandMark}>살</div>
            <span className={styles.brandName}>
              <em>살리자</em> AI
            </span>
          </div>
          <div className={styles.indicator}>
            <StepIndicator steps={STEP_LABELS} current={step} />
          </div>
        </header>

        {/* 본문 */}
        <main className={styles.body}>
          <div className={styles.stepHead}>
            <h1 className={styles.stepTitle}>{STEP_META[step].title}</h1>
            <p className={styles.stepDesc}>{STEP_META[step].desc}</p>
          </div>

          <div key={step} className={styles.animIn}>
            {step === 0 && (
              <Step1Profile form={form} errors={errors} onChange={handleChange} />
            )}
            {step === 1 && (
              <Step2Financials
                form={form}
                errors={errors}
                onChange={handleChange}
                ocrState={ocrState}
                setOcrState={setOcrState}
                onOcrFill={handleOcrFill}
              />
            )}
            {step === 2 && (
              <Step3Optional form={form} errors={errors} onChange={handleChange} />
            )}
            {step === 3 && <Step4Confirm form={form} />}
          </div>

          {step === 2 && (
            <button className={styles.btnText} onClick={skipStep3}>
              건너뛰고 기본 진단만 받기
            </button>
          )}
        </main>

        {/* 하단 네비 */}
        <footer className={styles.footer}>
          {!isFirstStep && (
            <button
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={goPrev}
              disabled={analyzing}
              aria-label="이전 단계"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {isLastStep ? (
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <Loader2 size={20} className={styles.spin} />
                  분석 중…
                </>
              ) : (
                <>
                  지금 진단받기
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          ) : (
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={goNext}>
              다음
              <ChevronRight size={20} />
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
