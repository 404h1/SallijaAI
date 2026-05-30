// # v1. 가게 프로필 전역 상태 (Context + useReducer + localStorage 영속)

import { createContext, useContext, useEffect, useReducer } from 'react';

const STORAGE_KEY = 'salija.storeProfile.v1';

/** 초기 상태 */
const initialState = {
  profile: {
    name: '',
    industry: '', // code (e.g. 'Q01')
    industryName: '',
    region: '',
    coords: null, // { lat, lng }
  },
  financials: {
    yyyymm: '',
    sales: '',
    rent: '',
    labor: '',
    materials: '',
    inputSource: 'manual', // 'manual' | 'ocr'
  },
  optionalInputs: {
    avgTicket: '',
    dailyCustomers: '',
    debt: '',
    monthlyDebtPayment: '',
  },
  manualInputs: {
    rating: '',
    reviewCount: '',
  },
  status: 'empty', // 'empty' | 'partial' | 'complete'
};

/** 필수값 충족 여부로 status 계산 */
function deriveStatus(state) {
  const { profile, financials } = state;
  const profileOk = profile.name && profile.industry && profile.region;
  const financeOk =
    financials.yyyymm &&
    financials.sales !== '' &&
    financials.rent !== '' &&
    financials.labor !== '' &&
    financials.materials !== '';
  if (profileOk && financeOk) return 'complete';
  if (profile.name || financials.sales) return 'partial';
  return 'empty';
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROFILE': {
      const next = { ...state, profile: { ...state.profile, ...action.payload } };
      return { ...next, status: deriveStatus(next) };
    }
    case 'SET_FINANCIALS': {
      const next = { ...state, financials: { ...state.financials, ...action.payload } };
      return { ...next, status: deriveStatus(next) };
    }
    case 'SET_OPTIONAL': {
      return { ...state, optionalInputs: { ...state.optionalInputs, ...action.payload } };
    }
    case 'SET_MANUAL': {
      return { ...state, manualInputs: { ...state.manualInputs, ...action.payload } };
    }
    case 'HYDRATE': {
      const next = { ...initialState, ...action.payload };
      return { ...next, status: deriveStatus(next) };
    }
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

/** localStorage에서 초기값 복원 */
function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    const merged = { ...initialState, ...parsed };
    return { ...merged, status: deriveStatus(merged) };
  } catch {
    return initialState;
  }
}

const StoreProfileContext = createContext(null);

export function StoreProfileProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  // 상태 변경 시 영속화
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* 저장 실패 무시 (시크릿 모드 등) */
    }
  }, [state]);

  const value = {
    ...state,
    setProfile: (payload) => dispatch({ type: 'SET_PROFILE', payload }),
    setFinancials: (payload) => dispatch({ type: 'SET_FINANCIALS', payload }),
    setOptional: (payload) => dispatch({ type: 'SET_OPTIONAL', payload }),
    setManual: (payload) => dispatch({ type: 'SET_MANUAL', payload }),
    hydrate: (payload) => dispatch({ type: 'HYDRATE', payload }),
    reset: () => dispatch({ type: 'RESET' }),
  };

  return <StoreProfileContext.Provider value={value}>{children}</StoreProfileContext.Provider>;
}

export function useStoreProfile() {
  const ctx = useContext(StoreProfileContext);
  if (!ctx) throw new Error('useStoreProfile must be used within StoreProfileProvider');
  return ctx;
}
