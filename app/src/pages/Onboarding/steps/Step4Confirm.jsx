// # v1. 온보딩 Step4 — 입력 요약 + 충실도 + 분석 시작

import { AlertTriangle } from 'lucide-react';
import { formatNumber, toNumber } from '../../../utils/format';
import { findIndustryName } from '../../../utils/industries';
import styles from './Step4Confirm.module.css';

/** 입력 충실도 점수 (0~100): 필수 60 + 선택 40 */
function calcQuality(form) {
  const required = ['storeName', 'industry', 'region', 'yyyymm', 'sales', 'rent', 'labor', 'materials'];
  const optional = ['avgTicket', 'dailyCustomers', 'debt', 'monthlyDebtPayment', 'rating', 'reviewCount'];
  const reqFilled = required.filter((k) => form[k] !== '' && form[k] != null).length;
  const optFilled = optional.filter((k) => form[k] !== '' && form[k] != null).length;
  const reqScore = (reqFilled / required.length) * 60;
  const optScore = (optFilled / optional.length) * 40;
  return Math.round(reqScore + optScore);
}

export default function Step4Confirm({ form }) {
  const totalCost = toNumber(form.rent) + toNumber(form.labor) + toNumber(form.materials);
  const sales = toNumber(form.sales);
  const isDeficit = sales > 0 && sales < totalCost;
  const quality = calcQuality(form);

  const hasOptional =
    form.avgTicket || form.dailyCustomers || form.debt || form.monthlyDebtPayment || form.rating;

  return (
    <div className="fields">
      <div className={styles.summaryCard}>
        <div className={styles.summaryHead}>
          <div className={styles.storeName}>{form.storeName || '우리 가게'}</div>
          <div className={styles.storeMeta}>
            {findIndustryName(form.industry) || '업종 미입력'} · {form.region || '위치 미입력'}
          </div>
        </div>
        <div className={styles.rows}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>기준 월</span>
            <span className={styles.rowValue}>{form.yyyymm || '–'}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>한 달 매출</span>
            <span className={styles.rowValue}>{formatNumber(form.sales) || 0}원</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>총비용 (임대+인건+재료)</span>
            <span className={styles.rowValue}>{formatNumber(String(totalCost))}원</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>객단가</span>
            <span className={`${styles.rowValue} ${!form.avgTicket ? styles.muted : ''}`}>
              {form.avgTicket ? `${formatNumber(form.avgTicket)}원` : '미입력'}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>총 부채</span>
            <span className={`${styles.rowValue} ${!form.debt ? styles.muted : ''}`}>
              {form.debt ? `${formatNumber(form.debt)}원` : '미입력'}
            </span>
          </div>
        </div>
      </div>

      {isDeficit && (
        <div className={styles.warnChip}>
          <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          현재 적자 상태로 보여요. 그래서 더더욱 진단이 중요합니다 — 바로 처방을 찾아드릴게요.
        </div>
      )}

      <div className={styles.quality}>
        <div className={styles.qualityHead}>
          <span className={styles.qualityTitle}>입력 충실도</span>
          <span className={styles.qualityPct}>{quality}%</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${quality}%` }} />
        </div>
        <p className={styles.qualityNote}>
          {hasOptional ? (
            <>
              지금 입력으로 <b>대부분의 모듈</b>을 진단할 수 있어요. 동네·상권 데이터는 분석 단계에서 자동으로
              불러옵니다.
            </>
          ) : (
            <>
              지금도 <b>기본 진단(손익분기·정책자금·콘텐츠)</b>은 충분해요. 선택 항목을 채우면 평판·현금흐름까지
              정밀해집니다.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
