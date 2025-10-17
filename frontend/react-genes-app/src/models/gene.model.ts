import { BioType } from '@/enums/bio-type.enum';

export type Gene = {
  ensembl: string;
  geneSymbol: string;
  name: string;
  metadata: string;
  bioType: string;
  bioTypeCode: BioType;
  chromosome: string;
  seqRegionStart: number;
  seqRegionEnd: number;
};
