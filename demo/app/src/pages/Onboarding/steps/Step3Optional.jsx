// # v1. 온보딩 Step3 — 선택 입력 (정밀 진단용)

import { Info } from 'lucide-react';
import { MoneyInput, NumberInput, TextInput } from '../../../components/common/FormControls';

export default function Step3Optional({ form, errors, onChange }) {
  return (
    <div className="fields">
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          alignItems: 'flex-start',
          background: 'var(--color-primary-tint)',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-md)',
          fontSize: 13,
          color: 'var(--color-text-sub)',
          lineHeight: 1.5,
        }}
      >
        <Info size={16} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: 1 }} />
        <span>
          건너뛰어도 <b>기본 진단</b>은 받을 수 있어요. 더 입력할수록 손익분기·평판 진단이 정확해집니다.
        </span>
      </div>

      <NumberInput
        label="객단가 (평균 결제액)"
        optional
        suffix="원"
        value={form.avgTicket}
        onChange={(v) => onChange('avgTicket', v)}
        hint="손익분기점(BEP) 계산 정밀도가 올라가요."
      />

      <NumberInput
        label="하루 평균 손님 수"
        optional
        suffix="명"
        value={form.dailyCustomers}
        onChange={(v) => onChange('dailyCustomers', v)}
      />

      <MoneyInput
        label="총 부채"
        optional
        value={form.debt}
        onChange={(v) => onChange('debt', v)}
        hint="현금이 몇 개월 버티는지(현금 소진 시점) 계산에 쓰여요."
      />

      <MoneyInput
        label="월 부채 상환액"
        optional
        value={form.monthlyDebtPayment}
        onChange={(v) => onChange('monthlyDebtPayment', v)}
      />

      <NumberInput
        label="네이버 별점"
        optional
        suffix="점"
        value={form.rating}
        onChange={(v) => onChange('rating', v)}
        error={errors.rating}
        hint="별점은 공식 API가 없어 직접 입력해요 (1.0~5.0)."
      />

      <NumberInput
        label="리뷰 수"
        optional
        suffix="개"
        value={form.reviewCount}
        onChange={(v) => onChange('reviewCount', v)}
      />
    </div>
  );
}
