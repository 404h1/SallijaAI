// # v1. 포맷 유틸 (통화·숫자)

/** 숫자 문자열에서 콤마/비숫자 제거 → 순수 정수 문자열 */
export function stripNumber(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[^\d]/g, '');
}

/** "72000000" → "72,000,000" */
export function formatNumber(value) {
  const raw = stripNumber(value);
  if (raw === '') return '';
  return Number(raw).toLocaleString('ko-KR');
}

/** 원 단위 → "7,200만원" 같은 한국식 축약 (대략 표시용) */
export function formatKoreanMoney(value) {
  const num = Number(stripNumber(value));
  if (!num) return '0원';
  const eok = Math.floor(num / 100000000);
  const man = Math.floor((num % 100000000) / 10000);
  const parts = [];
  if (eok > 0) parts.push(`${eok.toLocaleString('ko-KR')}억`);
  if (man > 0) parts.push(`${man.toLocaleString('ko-KR')}만`);
  if (parts.length === 0) return `${num.toLocaleString('ko-KR')}원`;
  return parts.join(' ') + '원';
}

/** 안전한 숫자 변환 (빈 값 → 0) */
export function toNumber(value) {
  const raw = stripNumber(value);
  return raw === '' ? 0 : Number(raw);
}

/** 퍼센트 표기 */
export function formatPercent(value, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return '–';
  return `${Number(value).toFixed(digits)}%`;
}
