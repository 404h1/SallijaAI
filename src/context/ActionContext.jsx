// # v1. 액션 산출물 전역 상태 — 생성된 콘텐츠·정책신청·플랜 보관 (localStorage 영속)

import { createContext, useContext, useEffect, useReducer, useCallback } from 'react';

const STORAGE_KEY = 'salija.actions.v1';

const initialState = {
  drafts: [], // 생성된 콘텐츠 초안 (F7)
  savedPlans: [], // 저장한 실행 플랜
  policyApplications: [], // 신청한 정책자금 (F5)
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_DRAFT':
      return { ...state, drafts: [action.payload, ...state.drafts] };
    case 'REMOVE_DRAFT':
      return { ...state, drafts: state.drafts.filter((d) => d.id !== action.payload) };
    case 'TOGGLE_PLAN': {
      const exists = state.savedPlans.includes(action.payload);
      return {
        ...state,
        savedPlans: exists
          ? state.savedPlans.filter((p) => p !== action.payload)
          : [...state.savedPlans, action.payload],
      };
    }
    case 'APPLY_POLICY': {
      if (state.policyApplications.includes(action.payload)) return state;
      return { ...state, policyApplications: [...state.policyApplications, action.payload] };
    }
    case 'HYDRATE':
      return { ...initialState, ...action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialState, ...JSON.parse(raw) } : initialState;
  } catch {
    return initialState;
  }
}

const ActionContext = createContext(null);

export function ActionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* 무시 */
    }
  }, [state]);

  const addDraft = useCallback((draft) => dispatch({ type: 'ADD_DRAFT', payload: draft }), []);
  const removeDraft = useCallback((id) => dispatch({ type: 'REMOVE_DRAFT', payload: id }), []);
  const togglePlan = useCallback((id) => dispatch({ type: 'TOGGLE_PLAN', payload: id }), []);
  const applyPolicy = useCallback((id) => dispatch({ type: 'APPLY_POLICY', payload: id }), []);

  const value = {
    ...state,
    addDraft,
    removeDraft,
    togglePlan,
    applyPolicy,
    reset: () => dispatch({ type: 'RESET' }),
  };

  return <ActionContext.Provider value={value}>{children}</ActionContext.Provider>;
}

export function useActions() {
  const ctx = useContext(ActionContext);
  if (!ctx) throw new Error('useActions must be used within ActionProvider');
  return ctx;
}
