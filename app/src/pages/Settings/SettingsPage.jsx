// # v1. 설정 페이지

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Bell, Link as LinkIcon, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { useStoreProfile } from '../../context/StoreProfileContext';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { profile, reset } = useStoreProfile();
  
  const [notifications, setNotifications] = useState({
    analysis: true,
    policy: true,
    marketing: false,
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    if (window.confirm('모든 데이터가 초기화됩니다. 온보딩부터 다시 시작하시겠습니까?')) {
      reset();
      navigate('/onboarding');
    }
  };

  return (
    <AppShell>
      <PageHeader title="설정" />
      
      <main className={styles.container}>
        <div className={styles.profileSection}>
          <div className={styles.profileAvatar}>
            <Store size={28} />
          </div>
          <div className={styles.profileInfo}>
            <h2>{profile?.name || '가게 이름 없음'}</h2>
            <p>{profile?.industryName || '업종 미설정'} · {profile?.region || '위치 미설정'}</p>
          </div>
          <button className={styles.editBtn} onClick={() => navigate('/onboarding')}>
            수정
          </button>
        </div>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>데이터 연동</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.itemLeft}>
                <div className={`${styles.iconBox} ${styles.bgPrimary}`}>
                  <LinkIcon size={18} className={styles.iconPrimary} />
                </div>
                <div>
                  <h4>네이버 지역검색 API</h4>
                  <p className={styles.itemDesc}>정상 연동됨 (최근 동기화: 1시간 전)</p>
                </div>
              </div>
              <span className={styles.statusOn}>ON</span>
            </li>
            <li className={styles.listItem}>
              <div className={styles.itemLeft}>
                <div className={`${styles.iconBox} ${styles.bgPrimary}`}>
                  <LinkIcon size={18} className={styles.iconPrimary} />
                </div>
                <div>
                  <h4>소진공 상권분석 데이터</h4>
                  <p className={styles.itemDesc}>2025년 1분기 기준</p>
                </div>
              </div>
              <span className={styles.statusOn}>ON</span>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>알림 설정</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.itemLeft}>
                <div className={styles.iconBox}>
                  <Bell size={18} />
                </div>
                <div>
                  <h4>월간 진단 리포트 알림</h4>
                  <p className={styles.itemDesc}>매월 1일 카카오톡으로 발송</p>
                </div>
              </div>
              <label className={styles.toggle}>
                <input 
                  type="checkbox" 
                  checked={notifications.analysis} 
                  onChange={() => handleToggle('analysis')} 
                />
                <span className={styles.slider}></span>
              </label>
            </li>
            <li className={styles.listItem}>
              <div className={styles.itemLeft}>
                <div className={styles.iconBox}>
                  <Bell size={18} />
                </div>
                <div>
                  <h4>정책자금 마감 알림</h4>
                  <p className={styles.itemDesc}>신청 마감 3일 전 안내</p>
                </div>
              </div>
              <label className={styles.toggle}>
                <input 
                  type="checkbox" 
                  checked={notifications.policy} 
                  onChange={() => handleToggle('policy')} 
                />
                <span className={styles.slider}></span>
              </label>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <ul className={styles.list}>
            <li className={styles.listItemClickable}>
              <div className={styles.itemLeft}>
                <HelpCircle size={18} className="text-muted" />
                <h4>고객센터 / 도움말</h4>
              </div>
              <ChevronRight size={18} className="text-muted" />
            </li>
            <li className={styles.listItemClickable} onClick={handleReset}>
              <div className={styles.itemLeft}>
                <LogOut size={18} className="text-danger" />
                <h4 className="text-danger">데이터 초기화 및 다시 시작</h4>
              </div>
            </li>
          </ul>
        </section>

        <p className={styles.version}>살리자 AI v1.0.0</p>
      </main>
    </AppShell>
  );
}
