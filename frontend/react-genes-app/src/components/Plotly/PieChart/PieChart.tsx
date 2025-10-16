import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Paper, Text, Loader, Alert, Group } from '@mantine/core';
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

  const labels = items.map((i) => i.label ?? String(i.bioType));
  const values = items.map((i) => i.count);

  const trace: Plotly.PlotData = {
    type: 'pie',
    labels,
    values,
    textinfo: 'label+percent',
    hoverinfo: 'all',
  } as Plotly.PlotData;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-lg">
      <Text size="sm" fw={600} mb="xs">
        Biotype distribution
      </Text>

      <Plot
        data={[trace]}
        layout={{
          height: 260,
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
