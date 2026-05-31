import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Search, Menu, Plus, Smile, Hash, ArrowUp, RefreshCw } from 'lucide-react';
import styles from './App.module.css';

const APP = 'https://salija.vercel.app';

// ── POS 영수증 컴포넌트 ──
function PosReceipt() {
  const rows = [
    { name: '후라이드 치킨', qty: 22, total: 440000, share: '30.3%' },
    { name: '양념 치킨',    qty: 15, total: 330000, share: '22.8%' },
    { name: '간장마늘 치킨', qty: 9,  total: 234000, share: '16.1%' },
    { name: '반반 치킨',    qty: 8,  total: 176000, share: '12.1%' },
    { name: '닭다리 구이',  qty: 6,  total: 138000, share: '9.5%'  },
    { name: '치즈볼',       qty: 18, total: 90000,  share: '6.2%'  },
    { name: '콜라 1.25L',  qty: 14, total: 42000,  share: '2.9%'  },
  ];
  const won = n => n.toLocaleString('ko-KR');
  return (
    <div style={{ background: '#f0f0f0', borderRadius: 8, overflow: 'hidden', width: 290, fontSize: 11, fontFamily: 'monospace', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
      <div style={{ background: '#2a2a2a', color: '#fff', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
        <span>매장명: 바삭치킨 영등포점</span>
        <span>2026.05.28 (목)</span>
      </div>
      <div style={{ background: '#fff', borderBottom: '1px solid #ccc', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ background: '#5a7a2e', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 3 }}>상품별 매출현황</div>
        <span style={{ fontSize: 10, color: '#555' }}>영업일자 2026-05-28</span>
      </div>
      <div style={{ background: '#fff', padding: '0 0 4px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '16px 1fr 28px 62px 38px', background: '#d4d4d4', padding: '3px 6px', fontWeight: 700, fontSize: 10, gap: 2 }}>
          <span>No</span><span>분류명</span><span style={{textAlign:'right'}}>수량</span><span style={{textAlign:'right'}}>총매출</span><span style={{textAlign:'right'}}>점유율</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.name} style={{ display: 'grid', gridTemplateColumns: '16px 1fr 28px 62px 38px', padding: '2px 6px', gap: 2, background: i === 0 ? '#dce8ff' : i % 2 === 0 ? '#f9f9f9' : '#fff', fontWeight: i === 0 ? 700 : 400 }}>
            <span style={{color:'#555'}}>{i+1}</span>
            <span>{r.name}</span>
            <span style={{textAlign:'right'}}>{r.qty}</span>
            <span style={{textAlign:'right'}}>{won(r.total)}</span>
            <span style={{textAlign:'right', color: i===0?'#1a50cc':'#555'}}>{r.share}</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '16px 1fr 28px 62px 38px', padding: '3px 6px', gap: 2, borderTop: '1px solid #bbb', background: '#efefef', fontWeight: 700, color: '#1a50cc', fontSize: 10.5 }}>
          <span></span><span>합 계</span><span style={{textAlign:'right'}}>92</span><span style={{textAlign:'right'}}>1,450,000</span><span style={{textAlign:'right'}}>100%</span>
        </div>
      </div>
    </div>
  );
}

// ── 날짜 구분선 메시지 ──
const divider2 = { id: 'div2', type: 'divider', label: '2026년 5월 30일 토요일' };

// ── 씬1 메시지 ──
const scene1Intro = {
  id: 1, type: 'ai', time: '오후 10:05',
  content: (
    <div className={styles.normalBubble}>
      박준영 사장님, 오늘 하루도 고생 많으셨습니다! 🌙<br /><br />
      마감하시기 전에 <strong>오늘 포스기 일일 매출</strong>이나 <strong>메뉴별 매출 화면</strong>을
      사진 한 장만 찍어서 보내주세요 📸<br />
      제가 알아서 장부에 정리해 드릴게요.
    </div>
  ),
};

// ── 씬2 메시지 ──
const scene2Intro = {
  id: 10, type: 'ai', time: '오전 09:10',
  content: (
    <div className={styles.normalBubble}>
      박준영 사장님, 좋은 아침이에요! ☀️<br />
      오늘 영업 준비하시기 전에 딱 30초만요.
    </div>
  ),
};

const scene2Brief = {
  id: 11, type: 'ai', time: '오전 09:10',
  content: (
    <div className={styles.alimtalk}>
      <div className={styles.alimtalkHeader}>
        <span className={styles.alimtalkBadgeInfo}>📋 오늘의 AI 브리핑 · 5/30(토)</span>
      </div>
      <h3 className={styles.alimtalkTitle}>오늘은 이 3가지를 챙겨보세요</h3>
      <div className={styles.briefList}>
        <div className={styles.briefItem}>
          <span className={styles.briefNum}>1</span>
          <div className={styles.briefBody}>
            <strong>🌧️ 날씨 찬스</strong>
            <span>오후부터 비 예보. 비 오는 토요일엔 영등포 치킨 배달이 평균 <b>+41%</b> 늘어요. 미리 라이더·재료 준비!</span>
          </div>
        </div>
        <div className={styles.briefItem}>
          <span className={styles.briefNum}>2</span>
          <div className={styles.briefBody}>
            <strong>🔥 요즘 뜨는 메뉴</strong>
            <span>최근 4주 '마라 치킨' 검색량 <b>+210%</b>. 주말 한정 메뉴로 가볍게 테스트해볼까요?</span>
          </div>
        </div>
        <div className={styles.briefItem}>
          <span className={styles.briefNum}>3</span>
          <div className={styles.briefBody}>
            <strong>📑 마감 임박 공고</strong>
            <span>영등포구 <b>'소상공인 배달비 지원'</b> 신규 공고 D-7. 사장님 조건이면 신청 가능해요.</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

function App() {
  const [messages, setMessages] = useState([scene1Intro]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(1); // 1=씬1대기, 2=씬1완료+씬2진행중, 3=완료
  const [showBriefBtns, setShowBriefBtns] = useState(false);
  const chatEndRef = useRef(null);
  const scene2Triggered = useRef(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showBriefBtns]);

  const triggerScene2 = () => {
    if (scene2Triggered.current) return;
    scene2Triggered.current = true;
    setTimeout(() => setMessages(prev => [...prev, divider2]), 2500);
    setTimeout(() => setMessages(prev => [...prev, scene2Intro]), 3800);
    setTimeout(() => setMessages(prev => [...prev, scene2Brief]), 5300);
    setTimeout(() => { setShowBriefBtns(true); setStep(3); }, 6300);
  };

  const handleSend = (e, isImage = false) => {
    e?.preventDefault();
    if (!input.trim() && !isImage) return;

    const userContent = isImage
      ? <div className={styles.imageBubble}><PosReceipt /></div>
      : input;

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', time: '오후 10:12', content: userContent }]);
    setInput('');

    if (step === 1) {
      setStep(2);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1, type: 'ai', time: '오후 10:12',
          content: (
            <div className={styles.alimtalk}>
              <div className={styles.alimtalkHeader}>
                <span className={styles.alimtalkBadgeSuccess}>✅ OCR 분석 완료</span>
              </div>
              <h3 className={styles.alimtalkTitle}>5월 28일 매출 145만 원, 장부에 기록했어요</h3>
              <p className={styles.alimtalkDesc}>
                메뉴 <strong>7종</strong>까지 자동 분류 완료 📊<br />
                오늘은 <strong>후라이드 치킨</strong>이 매출 1위(30%)였어요.
                성과 캘린더 <strong>28일</strong>에 바로 들어가 있습니다.
              </p>
              <div className={styles.btnGroup}>
                <a href={`${APP}/performance/day/28`} target="_blank" rel="noreferrer" className={styles.actionBtnDark}>
                  📊 28일 메뉴별 매출 자세히 보기
                </a>
              </div>
            </div>
          ),
        }]);
        triggerScene2();
      }, 1500);
    }
  };

  const handleBrief = (kind) => {
    setShowBriefBtns(false);
    const userText = kind === 'menu' ? '마라 치킨 한정 메뉴 기획해줘' : '배달비 지원 공고 신청 도와줘';
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', time: '오전 09:11', content: userText }]);

    setTimeout(() => {
      const reply = kind === 'menu' ? {
        id: Date.now() + 1, type: 'ai', time: '오전 09:11',
        content: (
          <div className={styles.alimtalk}>
            <div className={styles.alimtalkHeader}>
              <span className={styles.alimtalkBadgeInfo}>🔥 한정 메뉴 기획안</span>
            </div>
            <h3 className={styles.alimtalkTitle}>'주말 한정 마라 치킨' 기획안 완성</h3>
            <p className={styles.alimtalkDesc}>
              · 단가 <strong>22,000원</strong> (원가율 34%)<br />
              · 기존 후라이드 양념에 마라 시즈닝만 추가 → 새 재료 부담 최소<br />
              · 비 오는 토요일 배달 수요와 겹쳐 <strong>테스트 최적 타이밍</strong>
            </p>
            <div className={styles.btnGroup}>
              <a href={`${APP}/action/content`} target="_blank" rel="noreferrer" className={styles.actionBtnDark}>
                인스타 홍보글까지 바로 만들기
              </a>
            </div>
          </div>
        ),
      } : {
        id: Date.now() + 1, type: 'ai', time: '오전 09:11',
        content: (
          <div className={styles.alimtalk}>
            <div className={styles.alimtalkHeader}>
              <span className={styles.alimtalkBadge}>📑 배달비 지원 · D-7</span>
            </div>
            <h3 className={styles.alimtalkTitle}>사장님은 신청 자격 충족이에요</h3>
            <p className={styles.alimtalkDesc}>
              · 영등포구 소상공인 · 연매출 기준 충족 ✅<br />
              · 최대 <strong>200만 원</strong> 배달비 환급<br />
              · 필요 서류 3종은 제가 초안까지 준비해 둘게요.
            </p>
            <div className={styles.btnGroup}>
              <a href={`${APP}/action/policy`} target="_blank" rel="noreferrer" className={styles.actionBtnDark}>
                지원금 서류 준비 시작
              </a>
            </div>
          </div>
        ),
      };
      setMessages(prev => [...prev, reply]);
    }, 1300);
  };

  const handleReset = () => {
    setMessages([scene1Intro]);
    setInput('');
    setStep(1);
    setShowBriefBtns(false);
    scene2Triggered.current = false;
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.iconBtn}><ChevronLeft size={28} /></button>
          <h1 className={styles.chatName}>살리자 AI 비서</h1>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconBtn}><Search size={22} /></button>
          <button className={styles.iconBtn} onClick={handleReset} title="처음부터">
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      <main className={styles.chatArea}>
        <div className={styles.dateDivider}>2026년 5월 28일 목요일</div>

        {messages.map((msg) => {
          if (msg.type === 'divider') {
            return <div key={msg.id} className={styles.dateDivider}>{msg.label}</div>;
          }
          return (
            <div key={msg.id} className={`${styles.messageRow} ${msg.type === 'user' ? styles.rowUser : styles.rowAi}`}>
              {msg.type === 'ai' && (
                <div className={styles.profilePic}>
                  <img src="/assets/logo.png" alt="살리자" />
                </div>
              )}
              <div className={styles.messageContent}>
                {msg.type === 'ai' && <div className={styles.senderName}>살리자 AI 비서</div>}
                <div className={styles.bubbleWrapper}>
                  {msg.type === 'user' && <span className={styles.time}>{msg.time}</span>}
                  <div className={`${styles.bubble} ${msg.type === 'user' ? styles.bubbleUser : styles.bubbleAi} ${typeof msg.content === 'object' && msg.content.props?.className?.includes('imageBubble') ? styles.noPadding : ''}`}>
                    {msg.content}
                  </div>
                  {msg.type === 'ai' && <span className={styles.time}>{msg.time}</span>}
                </div>
                {showBriefBtns && msg.id === 11 && (
                  <div className={styles.quickReplies}>
                    <button className={styles.quickBtn} onClick={() => handleBrief('menu')}>🔥 마라 치킨 한정 메뉴 기획</button>
                    <button className={styles.quickBtn} onClick={() => handleBrief('policy')}>📑 배달비 지원 신청 도움</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </main>

      <footer className={styles.inputArea}>
        <button type="button" className={styles.attachBtn} onClick={() => handleSend(null, true)}
          disabled={step !== 1} style={{ opacity: step !== 1 ? 0.4 : 1 }}>
          <Plus size={26} color="#777" />
        </button>
        <form className={styles.inputForm} onSubmit={handleSend}>
          <input
            type="text"
            className={styles.textField}
            placeholder={step === 1 ? '+ 버튼을 눌러 매출 사진 전송' : '메시지를 입력하세요'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={step === 2}
          />
          <div className={styles.inputActions}>
            <button type="button" className={styles.actionBtn}><Smile size={24} color="#777" /></button>
            <button type="button" className={styles.actionBtn}><Hash size={24} color="#777" /></button>
          </div>
          {input.trim() && step !== 2 && (
            <button type="submit" className={styles.sendBtn}>
              <ArrowUp size={20} color="#391b1b" strokeWidth={3} />
            </button>
          )}
        </form>
      </footer>
    </div>
  );
}

export default App;
