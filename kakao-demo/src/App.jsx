import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Search, Menu, Plus, Smile, Hash, ArrowUp } from 'lucide-react';
import styles from './App.module.css';

const APP = 'http://localhost:5177'; // 살리자 본 앱

// ?scene=2 면 '오늘의 브리핑(능동 추천)' 시나리오, 기본은 '매출 입력' 시나리오
const SCENE = new URLSearchParams(window.location.search).get('scene') === '2' ? 2 : 1;

// ── 시나리오 1: 마감 후 매출 사진 입력 ──
const scene1Intro = {
  id: 1,
  type: 'ai',
  time: '오후 10:05',
  content: (
    <div className={styles.normalBubble}>
      박준영 사장님, 오늘 하루도 고생 많으셨습니다! 🌙<br /><br />
      마감하시기 전에 <strong>오늘 포스기 일일 매출</strong>이나 <strong>메뉴별 매출 화면</strong>을
      사진 한 장만 찍어서 보내주세요 📸<br />
      제가 알아서 장부에 정리해 드릴게요.
    </div>
  ),
};

// ── 시나리오 2: 아침 능동 브리핑 ──
const scene2Intro = {
  id: 1,
  type: 'ai',
  time: '오전 09:10',
  content: (
    <div className={styles.normalBubble}>
      박준영 사장님, 좋은 아침이에요! ☀️<br />
      오늘 영업 준비하시기 전에 딱 30초만요.
    </div>
  ),
};

const scene2Brief = {
  id: 2,
  type: 'ai',
  time: '오전 09:10',
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
  const [messages, setMessages] = useState(SCENE === 1 ? [scene1Intro] : []);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(1);
  const [showBriefBtns, setShowBriefBtns] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showBriefBtns]);

  // 시나리오 2: 챗봇이 먼저 말 거는 연출 (순차 등장)
  useEffect(() => {
    if (SCENE !== 2) return;
    const t1 = setTimeout(() => setMessages([scene2Intro]), 500);
    const t2 = setTimeout(() => setMessages([scene2Intro, scene2Brief]), 1600);
    const t3 = setTimeout(() => setShowBriefBtns(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // ── 시나리오 1: 사진 전송 → OCR → 28일 연동 ──
  const handleSend = (e, isImage = false) => {
    e?.preventDefault();
    if (!input.trim() && !isImage) return;

    let userContent = input;
    if (isImage) {
      userContent = (
        <div className={styles.imageBubble}>
          <div className={styles.mockReceipt}>
            <div className={styles.receiptHeader}>일일 정산표 · 5/28</div>
            <div className={styles.receiptBody}>총 매출: 1,450,000원<br />주문: 58건<br />메뉴: 7종</div>
          </div>
        </div>
      );
    }

    setMessages((prev) => [...prev, { id: Date.now(), type: 'user', time: '오후 10:12', content: userContent }]);
    setInput('');

    if (step === 1) {
      setStep(2);
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          id: Date.now() + 1,
          type: 'ai',
          time: '오후 10:12',
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
      }, 1500);
    }
  };

  // ── 시나리오 2: 추천 버튼 탭 → 후속 응답 ──
  const handleBrief = (kind) => {
    setShowBriefBtns(false);
    const userText = kind === 'menu' ? '마라 치킨 한정 메뉴 기획해줘' : '배달비 지원 공고 신청 도와줘';
    setMessages((prev) => [...prev, { id: Date.now(), type: 'user', time: '오전 09:11', content: userText }]);

    setTimeout(() => {
      const reply = kind === 'menu' ? {
        id: Date.now() + 1,
        type: 'ai',
        time: '오전 09:11',
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
        id: Date.now() + 1,
        type: 'ai',
        time: '오전 09:11',
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
      setMessages((prev) => [...prev, reply]);
    }, 1300);
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
          <button className={styles.iconBtn}><Menu size={22} /></button>
        </div>
      </header>

      <main className={styles.chatArea}>
        <div className={styles.dateDivider}>
          {SCENE === 1 ? '2026년 5월 28일 목요일' : '2026년 5월 30일 토요일'}
        </div>

        {messages.map((msg) => (
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

              {/* 시나리오 2 추천 버튼 (브리핑 카드 아래 노출) */}
              {SCENE === 2 && showBriefBtns && msg.id === 2 && (
                <div className={styles.quickReplies}>
                  <button className={styles.quickBtn} onClick={() => handleBrief('menu')}>🔥 마라 치킨 한정 메뉴 기획</button>
                  <button className={styles.quickBtn} onClick={() => handleBrief('policy')}>📑 배달비 지원 신청 도움</button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      <footer className={styles.inputArea}>
        <button type="button" className={styles.attachBtn} onClick={() => handleSend(null, true)}>
          <Plus size={26} color="#777" />
        </button>

        <form className={styles.inputForm} onSubmit={handleSend}>
          <input
            type="text"
            className={styles.textField}
            placeholder={SCENE === 1 && step === 1 ? '+ 버튼을 눌러 매출 사진 전송' : '메시지를 입력하세요'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className={styles.inputActions}>
            <button type="button" className={styles.actionBtn}><Smile size={24} color="#777" /></button>
            <button type="button" className={styles.actionBtn}><Hash size={24} color="#777" /></button>
          </div>
          {input.trim() && (
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
