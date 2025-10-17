import './PieChart.scss';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Text, Loader, Alert, Group } from '@mantine/core';
import { getApiUrl } from '@/tools/api-url.helper';
import { BioTypeResponse } from '@/models/api-response.model copy';

type BiotypeItem = {
  bioType: number;
  count: number;
  label: string;
};

const PieChart = () => {
  const [items, setItems] = useState<BiotypeItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${getApiUrl()}/biotypes`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: BioTypeResponse) => setItems(data.biotypes))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Group align="center">
        <Loader size="sm" />
        <Text size="sm">Loading biotype distribution…</Text>
      </Group>
    );
  }

  if (error) {
    return (
      <Alert title="Biotype fetch error" color="red">
        {error}
      </Alert>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Text size="sm" color="dimmed">
        No biotype data available.
      </Text>
    );
  }

  const total = items.reduce((s, it) => s + (it.count || 0), 0);
  const MIN_SLICE_PERCENT = 0.02; // slices smaller than 2% will be grouped into "Other"
  const LABEL_SHOW_PERCENT = 0.03; // only show label text if slice >= 3%

  const sorted = [...items].sort((a, b) => b.count - a.count);

  const major: BiotypeItem[] = [];
  const minor: BiotypeItem[] = [];
  for (const item of sorted) {
    const percent = total > 0 ? item.count / total : 0;
    if (percent >= MIN_SLICE_PERCENT) major.push(item);
    else minor.push(item);
  }

  const aggregatedItems: BiotypeItem[] = [...major];
  if (minor.length > 0) {
    const minorSum = minor.reduce((s, it) => s + it.count, 0);
    aggregatedItems.push({
      bioType: -1,
      count: minorSum,
      label: `Other (${minor.length})`,
    });
  }

  const labels = aggregatedItems.map((i) => i.label ?? String(i.bioType));
  const values = aggregatedItems.map((i) => i.count);

  const texts = aggregatedItems.map((i) =>
    total > 0 && i.count / total >= LABEL_SHOW_PERCENT ? i.label : ''
  );

  const trace: Plotly.PlotData = {
    type: 'pie',
    labels,
    values,
    text: texts,
    textinfo: 'percent',
    hoverinfo: 'all',
  } as Plotly.PlotData;

  // <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-lg">
  return (
    <div>
      <Text size="sm" fw={600} mb="xs">
        Biotype distribution
      </Text>

      <Plot
        data={[trace]}
        layout={{
          height: 350,
          width: '460',
          margin: { l: 10, r: 10, t: 10, b: 10 },
          showlegend: true,
        }}
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default PieChart;
