import { useEffect, useState } from 'react';
import { useStore } from './query-params.store';
import { getApiUrl } from '@/tools/api-url.helper';
import { Gene } from '@/models/gene.model';

export function useGeneData() {
  const ensembl = useStore((state) => state.ensembl);
  const [data, setGeneData] = useState<Gene | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ensembl) {
      setGeneData(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${getApiUrl()}/${ensembl}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setGeneData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [ensembl]);

  return { ensembl, data, loading, error };
}
