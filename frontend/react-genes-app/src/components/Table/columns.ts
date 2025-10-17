import { Gene } from '@/models/gene.model';
import { MRT_ColumnDef } from 'mantine-react-table';

export const COLUMNS: MRT_ColumnDef<Gene>[] = [
  {
    accessorKey: 'ensembl',
    header: 'Ensembl',
  },
  {
    accessorKey: 'geneSymbol',
    header: 'Symbol',
    size: 50,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    size: 250,
  },
  {
    accessorKey: 'bioTypeCode',
    header: 'Bio type',
    size: 250,
  },
  {
    accessorKey: 'chromosome',
    header: 'Chromosome',
    size: 50,
  },
  {
    accessorKey: 'seqRegionStart',
    header: 'Seq. Region start',
  },
  {
    accessorKey: 'seqRegionEnd',
    header: 'Seq. Region end',
  },
  {
    accessorKey: 'metadata',
    header: 'Metadata',
  },
];
