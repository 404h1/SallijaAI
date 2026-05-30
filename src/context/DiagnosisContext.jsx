// # v1. 진단 전역 상태 — 오케스트레이터 결과 보관 (loading/error 포함)

import { createContext, useContext, useReducer, useCallback } from 'react';
import { runOrchestration } from '../utils/orchestrator';

const initialState = {
  results: {}, // { [moduleId]: ModuleResult }
  priorityQueue: [], // moduleId[]
  riskScore: 0,
  riskLabel: '',
  axisSummary: { A: 0, B: 0, C: 0 },
  loading: false,
  error: null,
  lastRunAt: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'RUN_START':
      return { ...state, loading: true, error: null };
    case 'RUN_SUCCESS':
      return { ...state, loading: false, error: null, ...action.payload };
    case 'RUN_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const DiagnosisContext = createContext(null);

export function DiagnosisProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // mock 분석 실행 (실제 백엔드 붙이면 fetch로 교체)
  const runDiagnosis = useCallback(async () => {
    dispatch({ type: 'RUN_START' });
    try {
      await new Promise((r) => setTimeout(r, 600)); // mock 지연
      const payload = runOrchestration();
      dispatch({ type: 'RUN_SUCCESS', payload });
      return payload;
    } catch (e) {
      dispatch({ type: 'RUN_ERROR', payload: e.message || '분석에 실패했어요' });
      return null;
    }
  }, []);

  const value = {
    ...state,
    runDiagnosis,
    reset: () => dispatch({ type: 'RESET' }),
  };

  return <DiagnosisContext.Provider value={value}>{children}</DiagnosisContext.Provider>;
}

export function useDiagnosis() {
  const ctx = useContext(DiagnosisContext);
  if (!ctx) throw new Error('useDiagnosis must be used within DiagnosisProvider');
  return ctx;
}
