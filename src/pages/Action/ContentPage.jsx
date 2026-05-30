// # v1. 콘텐츠 생성 스튜디오 (F7) — 채널 선택 → 초안 생성 → 저장. 처방을 글로 변환.

import { useState } from 'react';
import { Instagram, FileText, MapPin, Sparkles, Copy, Check, Trash2 } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { EmptyState } from '../../components/common/States';
import { useStoreProfile } from '../../context/StoreProfileContext';
import { useActions } from '../../context/ActionContext';
import styles from './ContentPage.module.css';

const CHANNELS = [
  { id: 'instagram', label: '인스타그램', icon: Instagram },
  { id: 'blog', label: '블로그', icon: FileText },
  { id: 'place', label: '네이버 플레이스', icon: MapPin },
];

function buildDraft(channel, storeName) {
  const name = storeName || '우리 가게';
  switch (channel) {
    case 'instagram':
      return `🍗 ${name} 배달 전용 세트 출시!\n\n동네 치킨 검색이 한 달 새 32% 늘었어요. 바삭함은 그대로, 가성비는 UP!\n오늘 저녁, 후회 없는 한 마리 어떠세요?\n\n#${name.replace(/\s/g, '')} #영등포치킨 #치킨배달 #배달맛집 #오늘저녁`;
    case 'blog':
      return `[${name}] 배달 전용 세트, 왜 지금일까요?\n\n요즘 우리 동네에서 '치킨 배달' 검색이 부쩍 늘었습니다. 그만큼 집에서 편하게 즐기려는 분들이 많아졌다는 뜻이죠.\n\n${name}는 이 흐름에 맞춰 배달에 최적화된 세트를 준비했습니다. 식어도 바삭한 튀김 공정, 든든한 구성으로 가족 단위 주문에 딱 맞습니다.\n\n2주 한정으로 선보이니, 지금 한 번 경험해 보세요.`;
    case 'place':
      return `${name} | 영등포 치킨 맛집\n\n✅ 배달 전용 세트 신규 출시\n✅ 식어도 바삭한 이중튀김\n✅ 가족 세트 구성\n\n저녁 시간 빠른 배달로 모십니다. 사장님이 직접 튀깁니다!`;
    default:
      return '';
  }
}

export default function ContentPage() {
  const { profile } = useStoreProfile();
  const { drafts, addDraft, removeDraft } = useActions();
  const [channel, setChannel] = useState('instagram');
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setGenerating(true);
    setPreview('');
    setTimeout(() => {
      setPreview(buildDraft(channel, profile?.name));
      setGenerating(false);
    }, 700);
  };

  const save = () => {
    if (!preview) return;
    addDraft({
      id: `d_${Date.now()}`,
      channel,
      channelLabel: CHANNELS.find((c) => c.id === channel)?.label,
      text: preview,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setPreview('');
  };

  const copy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AppShell header={<PageHeader title="콘텐츠 스튜디오" subtitle="처방을 홍보글로" to="/dashboard" />}>
      <div className={styles.content}>
        <p className={styles.lead}>
          진단 처방에서 나온 <b>배달 전용 세트</b> 강점을 채널별 글로 만들어 드려요.
        </p>

        {/* 채널 선택 */}
        <div className={styles.channels}>
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            const active = channel === c.id;
            return (
              <button
                key={c.id}
                className={`${styles.channelBtn} ${active ? styles.channelActive : ''}`}
                onClick={() => setChannel(c.id)}
              >
                <Icon size={20} />
                {c.label}
              </button>
            );
          })}
        </div>

        <button className={styles.genBtn} onClick={generate} disabled={generating}>
          <Sparkles size={18} />
          {generating ? '생성 중…' : '초안 생성하기'}
        </button>

        {/* 미리보기 */}
        {generating && <div className={styles.genSkeleton} />}
        {preview && !generating && (
          <div className={styles.previewBox}>
            <pre className={styles.previewText}>{preview}</pre>
            <div className={styles.previewActions}>
              <button className={styles.ghostBtn} onClick={() => copy(preview)}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? '복사됨' : '복사'}
              </button>
              <button className={styles.saveBtn} onClick={save}>
                저장하기
              </button>
            </div>
          </div>
        )}

        {/* 저장된 초안 */}
        <section className={styles.saved}>
          <h3 className={styles.savedTitle}>저장한 초안 {drafts.length > 0 && `(${drafts.length})`}</h3>
          {drafts.length === 0 ? (
            <EmptyState title="아직 저장한 초안이 없어요" desc="초안을 만들어 저장하면 여기 모여요." />
          ) : (
            <div className={styles.draftList}>
              {drafts.map((d) => (
                <div key={d.id} className={styles.draftCard}>
                  <div className={styles.draftHead}>
                    <span className={styles.draftChannel}>{d.channelLabel}</span>
                    <span className={styles.draftDate}>{d.createdAt}</span>
                  </div>
                  <pre className={styles.draftText}>{d.text}</pre>
                  <div className={styles.draftActions}>
                    <button className={styles.miniBtn} onClick={() => copy(d.text)}>
                      <Copy size={14} /> 복사
                    </button>
                    <button className={styles.miniDanger} onClick={() => removeDraft(d.id)}>
                      <Trash2 size={14} /> 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
