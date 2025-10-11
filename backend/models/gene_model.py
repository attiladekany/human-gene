from pydantic import BaseModel
from typing import Optional, List

class Gene(BaseModel):
    ensembl: str
    geneSymbol: Optional[str]
    name: Optional[str]
    bioType: str
    chromosome: str
    seqRegionStart: int
    seqRegionEnd: int

class GenesResponse(BaseModel):
    items: List[Gene]
    total: int
    page_index: int
    page_size: int
    pages: int