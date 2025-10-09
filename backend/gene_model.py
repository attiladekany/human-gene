from pydantic import BaseModel
from typing import Optional
from typing import List
from pydantic import BaseModel

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
    page: int
    page_size: int
    pages: int