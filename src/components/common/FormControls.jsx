// # v1. 폼 프리미티브 (Field / TextInput / MoneyInput / NumberInput / SelectInput)

import { useId } from 'react';
import styles from './FormControls.module.css';
import { formatNumber, formatKoreanMoney, stripNumber } from '../../utils/format';

/** 라벨 + 에러 래퍼 */
export function Field({ label, required, optional, hint, error, htmlFor, children }) {
  return (
    <div className={styles.field}>
      {(label || optional) && (
        <div className={styles.labelRow}>
          {label && (
            <label className={styles.label} htmlFor={htmlFor}>
              {label}
              {required && <span className={styles.required}>*</span>}
            </label>
          )}
          {optional && <span className={styles.optional}>선택</span>}
        </div>
      )}
      {children}
      {error ? (
        <span className={styles.error} role="alert">
          {error}
        </span>
      ) : (
        hint && <span className={styles.hint}>{hint}</span>
      )}
    </div>
  );
}

/** 일반 텍스트 입력 */
export function TextInput({ label, required, hint, error, value, onChange, ...rest }) {
  const id = useId();
  return (
    <Field label={label} required={required} hint={hint} error={error} htmlFor={id}>
      <div className={styles.control}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.invalid : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          {...rest}
        />
      </div>
    </Field>
  );
}

/** 통화 입력 — 콤마 자동 포맷 + 한국식 환산 표시 */
export function MoneyInput({ label, required, optional, hint, error, value, onChange, showAssist = true, ...rest }) {
  const id = useId();
  const handleChange = (e) => {
    onChange(stripNumber(e.target.value));
  };
  const assist = showAssist && value ? formatKoreanMoney(value) : '';
  return (
    <Field label={label} required={required} optional={optional} hint={hint} error={error} htmlFor={id}>
      <div className={`${styles.control} ${styles.money}`}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.invalid : ''}`}
          inputMode="numeric"
          value={formatNumber(value)}
          onChange={handleChange}
          placeholder="0"
          aria-invalid={!!error}
          {...rest}
        />
        <span className={styles.suffix}>원</span>
      </div>
      {showAssist && <span className={styles.assist}>{assist}</span>}
    </Field>
  );
}

/** 숫자 입력 (단위 접미사 커스텀) */
export function NumberInput({ label, required, optional, hint, error, value, onChange, suffix, ...rest }) {
  const id = useId();
  const handleChange = (e) => onChange(stripNumber(e.target.value));
  return (
    <Field label={label} required={required} optional={optional} hint={hint} error={error} htmlFor={id}>
      <div className={`${styles.control} ${styles.money}`}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.invalid : ''}`}
          inputMode="numeric"
          value={formatNumber(value)}
          onChange={handleChange}
          placeholder="0"
          aria-invalid={!!error}
          {...rest}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    </Field>
  );
}

/** 셀렉트 */
export function SelectInput({ label, required, hint, error, value, onChange, placeholder, children, ...rest }) {
  const id = useId();
  return (
    <Field label={label} required={required} hint={hint} error={error} htmlFor={id}>
      <div className={styles.control}>
        <select
          id={id}
          className={`${styles.input} ${styles.select} ${error ? styles.invalid : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-invalid={!!error}
          {...rest}
        >
          <option value="" disabled hidden>
            {placeholder || '선택해 주세요'}
          </option>
          {children}
        </select>
      </div>
    </Field>
  );
}
