import { Gene } from '@/models/gene.model';
import Plot from 'react-plotly.js';

type GeneCardProps = {
  gene: Gene;
  chromosomeLength?: number; // optional, if you want scaling
};

/*
  Linear Genomic Position Plot
  Show a horizontal bar representing the chromosome, with a highlighted region where the gene sits.
*/
const LinearChart = ({ gene, chromosomeLength = 156040895 }: GeneCardProps) => {
  const geneLength = gene.seqRegionEnd - gene.seqRegionStart;

  const trace: Plotly.PlotData = {
    type: 'scatter',
    mode: 'lines+markers',
    x: [gene.seqRegionStart, gene.seqRegionEnd],
    y: [0, 0],
    line: { width: 100, color: 'red' },
    marker: { size: 8, color: '#1B4F72' },
    name: gene.geneSymbol,
    hovertemplate: `
      ${gene.geneSymbol ? '<b>' + gene.geneSymbol + '</b><br>' : ''}
      Start: ${gene.seqRegionStart}<br>
      End: ${gene.seqRegionEnd}<br>
      Length: ${geneLength.toLocaleString()} bp
    `,
  } as Plotly.PlotData;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-lg">
      <Plot
        data={[trace]}
        layout={{
          title: {
            text: `Chromosome ${gene.chromosome}`,
            // font: { size: 16, color: 'red' },
          },
          xaxis: {
            range: [0, chromosomeLength],
            title: { text: 'Position (bp)' },
          },
          yaxis: { visible: false },
          margin: { l: 40, r: 10, t: 30, b: 30 },
          height: 120,
          showlegend: false,
        }}
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default LinearChart;
