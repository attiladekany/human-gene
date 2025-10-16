from fastapi import Query, APIRouter, HTTPException, status
import pandas as pd
from typing import Optional
from load_genes import load_genes
from models.gene_model import GenesResponse, Gene
from enums.bio_type import BioType, BIO_TYPE_TEXT, LABEL_TO_ENUM
import math

# load GENES here to avoid circular import with main
GENES = load_genes()

router = APIRouter(prefix="/genes", tags=["genes"])

def get_gene_by_ensembl(ensembl: str) -> Optional[dict]:
    # Assume GENES is a pandas DataFrame with an 'ensembl' column
    matches = GENES.loc[GENES["ensembl"] == ensembl]
    if matches.empty:
        return None
    row = matches.iloc[0].where(pd.notnull(matches.iloc[0]), None)
    return row.to_dict()

# moved: biotypes endpoint must be registered before the dynamic "/{ensembl}" route
@router.get("/biotypes", status_code=status.HTTP_200_OK)
def get_biotype_counts():
    """
    Returns:
    {
      "biotypes": [
        {"bioType": 2, "count": 5200, "label": "Bidirectional Promoter Lnc R N A"},
        ...
      ]
    }
    Uses exact label matching against LABEL_TO_ENUM.
    """
    if "bioType" not in GENES.columns:
        return {"biotypes": []}

    counts = {}
    for raw in GENES["bioType"].tolist():
        if pd.isnull(raw):
            continue
        # exact-match the label from the dataframe to the enum
        bt = LABEL_TO_ENUM.get(raw)
        if bt is None:
            continue
        counts[bt.value] = counts.get(bt.value, 0) + 1

    items = [
        {
            "bioType": k,
            "count": v,
            "label": BIO_TYPE_TEXT.get(BioType(k), BioType(k).label())
        }
        for k, v in sorted(counts.items(), key=lambda x: -x[1])
    ]
    return {"biotypes": items}

@router.get("/{ensembl}", response_model=Gene, status_code=status.HTTP_200_OK)
def get_gene(ensembl: str):
    gene = get_gene_by_ensembl(ensembl)
    if not gene:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gene not found")
    return gene

@router.get("/", response_model=GenesResponse, status_code=status.HTTP_200_OK)
def get_genes(
    page_index: int = Query(0, ge=0),
    page_size: int = Query(10, ge=1, le=100),
) -> GenesResponse:
    df = GENES

    total = int(df.shape[0])
    pages = math.ceil(total / page_size) if total > 0 else 1

    start = page_index * page_size
    end = start + page_size
    paged_df = df.iloc[start:end]
    
    # Handle NaN values by converting them to None
    paged_df = paged_df.where(pd.notnull(paged_df), None)
    items = paged_df.to_dict(orient="records")
    
    return GenesResponse(
        items=items,
        total=total,
        page_index=page_index,
        page_size=page_size,
        pages=pages,
    )
