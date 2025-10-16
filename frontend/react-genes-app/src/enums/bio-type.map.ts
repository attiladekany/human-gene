import { BioType } from './bio-type.enum';

// Map numeric bioType -> human readable label
export const BioTypeText: Record<number, string> = {
  [BioType.ANTISENSE]: 'Antisense',
  [BioType.BIDIRECTIONAL_PROMOTER_LNC_RNA]: 'Bidirectional Promoter Lnc R N A',
  [BioType.IGC_GENE]: 'I G C Gene',
  [BioType.IGC_PSEUDOGENE]: 'I G C Pseudogene',
  [BioType.IGD_GENE]: 'I G D Gene',
  [BioType.IGJ_GENE]: 'I G J Gene',
  [BioType.IGJ_PSEUDOGENE]: 'I G J Pseudogene',
  [BioType.IG_PSEUDOGENE]: 'I G Pseudogene',
  [BioType.IGV_GENE]: 'I G V Gene',
  [BioType.IGV_PSEUDOGENE]: 'I G V Pseudogene',
  [BioType.LINC_RNA]: 'Linc R N A',
  [BioType.MACRO_LNC_RNA]: 'Macro Lnc R N A',
  [BioType.MI_RNA]: 'Mi R N A',
  [BioType.MISC_RNA]: 'Misc R N A',
  [BioType.MT_RRNA]: 'Mt R R N A',
  [BioType.MT_TRNA]: 'Mt T R N A',
  [BioType.NON_CODING]: 'Non Coding',
  [BioType.POLYMORPHIC_PSEUDOGENE]: 'Polymorphic Pseudogene',
  [BioType.PRIME_OVERLAPPING_NC_RNA]: 'Prime Overlapping Nc R N A',
  [BioType.PROCESSED_PSEUDOGENE]: 'Processed Pseudogene',
  [BioType.PROCESSED_TRANSCRIPT]: 'Processed Transcript',
  [BioType.PROTEIN_CODING]: 'Protein Coding',
  [BioType.PSEUDOGENE]: 'Pseudogene',
  [BioType.RRNA]: 'R R N A',
  [BioType.RIBOZYME]: 'Ribozyme',
  [BioType.SRNA]: 'S R N A',
  [BioType.SCRNA]: 'Sc R N A',
  [BioType.SCARNA]: 'Sca R N A',
  [BioType.SENSE_INTRONIC]: 'Sense Intronic',
  [BioType.SENSE_OVERLAPPING]: 'Sense Overlapping',
  [BioType.SNRNA]: 'Sn R N A',
  [BioType.SNORNA]: 'Sno R N A',
  [BioType.TEC]: 'T E C',
  [BioType.TRC_GENE]: 'T R C Gene',
  [BioType.TRD_GENE]: 'T R D Gene',
  [BioType.TRJ_GENE]: 'T R J Gene',
  [BioType.TRJ_PSEUDOGENE]: 'T R J Pseudogene',
  [BioType.TRV_GENE]: 'T R V Gene',
  [BioType.TRV_PSEUDOGENE]: 'T R V Pseudogene',
  [BioType.TRANSCRIBED_PROCESSED_PSEUDOGENE]:
    'Transcribed Processed Pseudogene',
  [BioType.TRANSCRIBED_UNITARY_PSEUDOGENE]: 'Transcribed Unitary Pseudogene',
  [BioType.TRANSCRIBED_UNPROCESSED_PSEUDOGENE]:
    'Transcribed Unprocessed Pseudogene',
  [BioType.UNITARY_PSEUDOGENE]: 'Unitary Pseudogene',
  [BioType.UNPROCESSED_PSEUDOGENE]: 'Unprocessed Pseudogene',
  [BioType.VAULT_RNA]: 'Vault R N A',
};

// optional helper to resolve labels from numeric or string values
export function getBioTypeLabel(
  value?: number | string | null
): string | undefined {
  if (value == null) return undefined;
  const num = typeof value === 'number' ? value : Number(value);
  return BioTypeText[num];
}
