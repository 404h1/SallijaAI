// # v1. 온보딩 Step1 — 가게 기본 정보

import { TextInput, SelectInput } from '../../../components/common/FormControls';
import { INDUSTRY_GROUPS } from '../../../utils/industries';

export default function Step1Profile({ form, errors, onChange }) {
  return (
    <div className="fields">
      <TextInput
        label="가게 이름"
        required
        placeholder="예) 영등포 황금올리브 치킨"
        value={form.storeName}
        onChange={(v) => onChange('storeName', v)}
        error={errors.storeName}
        maxLength={40}
        autoFocus
      />

      <SelectInput
        label="업종"
        required
        placeholder="업종을 선택해 주세요"
        value={form.industry}
        onChange={(v) => onChange('industry', v)}
        error={errors.industry}
      >
        {INDUSTRY_GROUPS.map((g) => (
          <optgroup label={g.group} key={g.group}>
            {g.items.map((it) => (
              <option value={it.code} key={it.code}>
                {it.name}
              </option>
            ))}
          </optgroup>
        ))}
      </SelectInput>

      <TextInput
        label="가게 위치"
        required
        placeholder="예) 서울 영등포구 영등포동"
        value={form.region}
        onChange={(v) => onChange('region', v)}
        error={errors.region}
        hint="동(행정동)까지 입력하면 동네 단위 진단이 정확해져요."
      />
    </div>
  );
}
