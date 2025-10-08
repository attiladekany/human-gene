from pydantic import BaseModel
from typing import Optional

class Gene(BaseModel):
    ensembl: str
    geneSymbol: Optional[str]
    name: Optional[str]
    bioType: str
    chromosome: str
    seqRegionStart: int
    seqRegionEnd: int
