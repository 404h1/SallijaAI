// # v1. 초기 가게 정보 입력 (카카오맵 연동 Mock)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, ChevronRight, Loader2 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { useStoreProfile } from '../../context/StoreProfileContext';
import styles from './Setup.module.css';

export default function BasicInfoPage() {
  const navigate = useNavigate();
  const { setProfile } = useStoreProfile();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    // 카카오맵 MCP 연동 Mock
    setTimeout(() => {
      setSearchResult({
        name: searchQuery,
        industry: '치킨,닭강정',
        industryName: '치킨/닭강정',
        region: '서울 영등포구 영등포동',
        address: '서울 영등포구 영등포로 123',
        coords: { lat: 37.5201, lng: 126.9012 }
      });
      setSearching(false);
    }, 1200);
  };

  const handleConfirm = () => {
    if (!searchResult) return;
    
    setProfile({
      name: searchResult.name,
      industry: searchResult.industry,
      industryName: searchResult.industryName,
      region: searchResult.region,
      coords: searchResult.coords,
    });
    
    // 기본 정보만 입력하고 일단 대시보드로 넘어가서 팝업을 띄움
    navigate('/dashboard?showPopup=true');
  };

  return (
    <div className={styles.page}>
      <PageHeader title="가게 찾기" />
      
      <main className={styles.content}>
        <div className={styles.header}>
          <h2>사장님의 가게 이름을<br/>입력해주세요</h2>
          <p className="text-muted">나머지 정보는 카카오맵에서 자동으로 찾아드릴게요.</p>
        </div>

        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="예: 살리자 치킨 영등포점" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={!searchQuery.trim() || searching}>
            {searching ? <Loader2 size={20} className={styles.spin} /> : <Search size={20} />}
          </button>
        </div>

        {searchResult && (
          <div className={`${styles.resultCard} ${styles.animIn}`}>
            <div className={styles.resultIcon}>
              <MapPin size={24} color="var(--color-primary)" />
            </div>
            <div className={styles.resultInfo}>
              <h3>{searchResult.name}</h3>
              <p>{searchResult.industryName} · {searchResult.region}</p>
              <p className={styles.addressText}>{searchResult.address}</p>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.bottomFixed}>
        <button 
          className={styles.btnPrimary} 
          onClick={handleConfirm}
          disabled={!searchResult}
        >
          이 가게가 맞아요 <ChevronRight size={20} />
        </button>
      </footer>
    </div>
  );
}
