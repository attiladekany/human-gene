import { BioType } from '@/enums/bio-type.enum';

export interface BioTypeResponse {
  biotypes: Biotype[];
}

export interface Biotype {
  bioType: BioType;
  count: number;
  label: string;
}
