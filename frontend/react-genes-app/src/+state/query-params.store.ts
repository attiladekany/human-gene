import { create } from 'zustand';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ENSEMBL } from '@/tools/constants';

interface EnsemblState {
  ensembl: string | null;
  setEnsembl: (value: string | null) => void;
}

// Zustand store
export const useStore = create<EnsemblState>((set) => ({
  ensembl: null,
  setEnsembl: (value) => set({ ensembl: value }),
}));

// Hook to sync the URL param with the store
export function initStore() {
  const [searchParams] = useSearchParams();
  const setEnsembl = useStore((state) => state.setEnsembl);

  useEffect(() => {
    const ensemblParam = searchParams.get(ENSEMBL);
    setEnsembl(ensemblParam);
  }, [searchParams, setEnsembl]);
}
