from enum import IntEnum
import re
from typing import Optional

class BioType(IntEnum):
    ANTISENSE = 1
    BIDIRECTIONAL_PROMOTER_LNC_RNA = 2
    IGC_GENE = 3
    IG_C_PSEUDOGENE = 4
    IGD_GENE = 5
    IGJ_GENE = 6
    IGJ_PSEUDOGENE = 7
    IG_PSEUDOGENE = 8
    IGV_GENE = 9
    IGV_PSEUDOGENE = 10
    LINC_RNA = 11
    MACRO_LNC_RNA = 12
    MIRNA = 13
    MISC_RNA = 14
    MT_RRNA = 15
    MT_TRNA = 16
    NON_CODING = 17
    POLYMORPHIC_PSEUDOGENE = 18
    PRIME_OVERLAPPING_NCRNA = 19
    PROCESSED_PSEUDOGENE = 20
    PROCESSED_TRANSCRIPT = 21
    PROTEIN_CODING = 22
    PSEUDOGENE = 23
    RRNA = 24
    RIBOZYME = 25
    SRNA = 26
    SCRNA = 27
    SCARNA = 28
    SENSE_INTRONIC = 29
    SENSE_OVERLAPPING = 30
    SNRNA = 31
    SNORNA = 32
    TEC = 33
    TRC_GENE = 34
    TRD_GENE = 35
    TRJ_GENE = 36
    TRJ_PSEUDOGENE = 37
    TRV_GENE = 38
    TRV_PSEUDOGENE = 39
    TRANSCRIBED_PROCESSED_PSEUDOGENE = 40
    TRANSCRIBED_UNITARY_PSEUDOGENE = 41
    TRANSCRIBED_UNPROCESSED_PSEUDOGENE = 42
    UNITARY_PSEUDOGENE = 43
    UNPROCESSED_PSEUDOGENE = 44
    VAULT_RNA = 45

# human-readable labels mapping (based on provided mapping)
BIO_TYPE_TEXT = {
    BioType.ANTISENSE: "Antisense",
    BioType.BIDIRECTIONAL_PROMOTER_LNC_RNA: "Bidirectional Promoter Lnc R N A",
    BioType.IGC_GENE: "I G C Gene",
    BioType.IG_C_PSEUDOGENE: "I G C Pseudogene",
    BioType.IGD_GENE: "I G D Gene",
    BioType.IGJ_GENE: "I G J Gene",
    BioType.IGJ_PSEUDOGENE: "I G J Pseudogene",
    BioType.IG_PSEUDOGENE: "I G Pseudogene",
    BioType.IGV_GENE: "I G V Gene",
    BioType.IGV_PSEUDOGENE: "I G V Pseudogene",
    BioType.LINC_RNA: "Linc R N A",
    BioType.MACRO_LNC_RNA: "Macro Lnc R N A",
    BioType.MIRNA: "Mi R N A",
    BioType.MISC_RNA: "Misc R N A",
    BioType.MT_RRNA: "Mt R R N A",
    BioType.MT_TRNA: "Mt T R N A",
    BioType.NON_CODING: "Non Coding",
    BioType.POLYMORPHIC_PSEUDOGENE: "Polymorphic Pseudogene",
    BioType.PRIME_OVERLAPPING_NCRNA: "Prime Overlapping Nc R N A",
    BioType.PROCESSED_PSEUDOGENE: "Processed Pseudogene",
    BioType.PROCESSED_TRANSCRIPT: "Processed Transcript",
    BioType.PROTEIN_CODING: "Protein Coding",
    BioType.PSEUDOGENE: "Pseudogene",
    BioType.RRNA: "R R N A",
    BioType.RIBOZYME: "Ribozyme",
    BioType.SRNA: "S R N A",
    BioType.SCRNA: "Sc R N A",
    BioType.SCARNA: "Sca R N A",
    BioType.SENSE_INTRONIC: "Sense Intronic",
    BioType.SENSE_OVERLAPPING: "Sense Overlapping",
    BioType.SNRNA: "Sn R N A",
    BioType.SNORNA: "Sno R N A",
    BioType.TEC: "T E C",
    BioType.TRC_GENE: "T R C Gene",
    BioType.TRD_GENE: "T R D Gene",
    BioType.TRJ_GENE: "T R J Gene",
    BioType.TRJ_PSEUDOGENE: "T R J Pseudogene",
    BioType.TRV_GENE: "T R V Gene",
    BioType.TRV_PSEUDOGENE: "T R V Pseudogene",
    BioType.TRANSCRIBED_PROCESSED_PSEUDOGENE: "Transcribed Processed Pseudogene",
    BioType.TRANSCRIBED_UNITARY_PSEUDOGENE: "Transcribed Unitary Pseudogene",
    BioType.TRANSCRIBED_UNPROCESSED_PSEUDOGENE: "Transcribed Unprocessed Pseudogene",
    BioType.UNITARY_PSEUDOGENE: "Unitary Pseudogene",
    BioType.UNPROCESSED_PSEUDOGENE: "Unprocessed Pseudogene",
    BioType.VAULT_RNA: "Vault R N A",
}

# reverse mapping: exact label -> enum member (uses exact strings from BIO_TYPE_TEXT)
LABEL_TO_ENUM = { label: bt for bt, label in BIO_TYPE_TEXT.items() }

# helper instance method to get label
def _bio_label(self) -> str:
    return BIO_TYPE_TEXT.get(self, self.name.replace('_', ' ').title())

# attach as method on BioType
BioType.label = _bio_label