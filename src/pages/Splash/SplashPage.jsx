// # v1. 스플래시 / 대기화면 — 소상공인 응원 카피 + 사장님 에셋 5장 슬라이딩

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SplashPage.module.css';

// 살리자/asset 폴더의 사장님 에셋 5장
import imgCafe from '../../../asset/카페사장님.png';
import imgFlower from '../../../asset/꽃집사장님.png';
import imgVeg from '../../../asset/채소가게사장님.png';
import imgSalon from '../../../asset/미용실원장님.png';
import imgWood from '../../../asset/목공사아저씨.png';

const OWNERS = [
  { img: imgCafe, name: '카페 사장님' },
  { img: imgVeg, name: '채소가게 사장님' },
  { img: imgSalon, name: '미용실 원장님' },
  { img: imgFlower, name: '꽃집 사장님' },
  { img: imgWood, name: '목공소 사장님' },
];

// 통계청 2022 소상공인실태조사 — 소상공인 사업체 약 412만 개
const OWNER_COUNT = 412;
const SLIDE_MS = 760; // 한 장당 노출 시간
const HOLD_MS = 500; // 마지막 장 후 잠깐 멈춤

export default function SplashPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  // 카운트업 (0 → 412)
  useEffect(() => {
    const total = 900;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / total, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * OWNER_COUNT));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 슬라이드 + 마지막 장 후 랜딩 이동
  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => {
        if (i >= OWNERS.length - 1) {
          clearInterval(id);
          if (!doneRef.current) {
            doneRef.current = true;
            setTimeout(() => navigate('/landing', { replace: true }), HOLD_MS);
          }
          return i;
        }
        return i + 1;
      });
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [navigate]);

  const skip = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    navigate('/landing', { replace: true });
  };

  return (
    <div className={styles.page} onClick={skip}>
      <div className={styles.inner}>
        {/* 카피 */}
        <p className={styles.cheer}>
          <strong className={styles.count}>{count}만</strong> 사장님을<br />
          응원합니다
        </p>

        {/* 에셋 슬라이드 */}
        <div className={styles.stage}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {OWNERS.map((o) => (
              <div key={o.name} className={styles.slide}>
                <div className={styles.imgWrap}>
                  <img src={o.img} alt={o.name} className={styles.img} />
                </div>
                <span className={styles.name}>{o.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 진행 점 */}
        <div className={styles.dots}>
          {OWNERS.map((o, i) => (
            <span
              key={o.name}
              className={`${styles.dot} ${i === active ? styles.dotOn : ''}`}
            />
          ))}
        </div>

        {/* 브랜드 */}
        <div className={styles.brand}>
          <span className={styles.logoMark}>살</span>
          <span className={styles.logoName}>살리자 AI</span>
        </div>
      </div>
    </div>
  );
}
