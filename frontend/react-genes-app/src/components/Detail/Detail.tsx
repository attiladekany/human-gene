import { useGeneData } from '@/+state/gen-data';
import {
  Card,
  Grid,
  Text,
  Title,
  Divider,
  Group,
  Badge,
  Loader,
  Alert,
} from '@mantine/core';
import LinearChart from '../Plotly/LinearChart/LinearChart';

type Props = {};

function Detail({}: Props) {
  const cellStyle: React.CSSProperties = {
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    padding: '0.5rem',
  };

  const { ensembl, data, loading, error } = useGeneData();

  if (loading) {
    return (
      <Group py="xl">
        <Loader />
        <Text>Loading gene data…</Text>
      </Group>
    );
  }

  if (error) {
    return (
      <Alert title="Error" color="red" mb="md">
        {String(error)}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Text fw={700}>No gene data available for {ensembl ?? 'this gene'}.</Text>
    );
  }

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {/* <Group position="apart" mb="md"> */}
        <Group mb="md">
          <Title order={3}>{data.geneSymbol}</Title>
          <Badge color="blue" variant="light">
            {data.bioType}
          </Badge>
        </Group>

        <Divider mb="sm" />

        <Grid gutter="xs">
          <Grid.Col span={6} style={cellStyle}>
            <Text fw={700}>Ensembl ID:</Text>
            <Text>{data.ensembl}</Text>
          </Grid.Col>

          <Grid.Col span={6} style={cellStyle}>
            <Text fw={700}>Name:</Text>
            <Text>{data.name}</Text>
          </Grid.Col>

          <Grid.Col span={6} style={cellStyle}>
            <Text fw={700}>Chromosome:</Text>
            <Text>{data.chromosome}</Text>
          </Grid.Col>

          <Grid.Col span={6} style={cellStyle}>
            <Text fw={700}>Region Start:</Text>
            <Text>{data.seqRegionStart.toLocaleString()}</Text>
          </Grid.Col>

          <Grid.Col span={6} style={cellStyle}>
            <Text fw={700}>Region End:</Text>
            <Text>{data.seqRegionEnd.toLocaleString()}</Text>
          </Grid.Col>
        </Grid>
      </Card>
      <Card>
        <LinearChart gene={data} />
      </Card>
    </>
  );
}

export default Detail;
