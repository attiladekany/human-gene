from fastapi import FastAPI, Query
import pandas as pd
from gene_model import GenesResponse
import os
import math

FILE_NAME = "genes_human.csv"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, FILE_NAME)

app = FastAPI()

def load_genes():
    df = pd.read_csv(csv_path, sep=";")

    df = df.rename(columns={
        "Ensembl": "ensembl",
        "Gene symbol": "geneSymbol",
        "Name": "name",
        "Biotype": "bioType",
        "Chromosome": "chromosome",
        "Seq region start": "seqRegionStart",
        "Seq region end": "seqRegionEnd"
    })
    return df

GENES = load_genes()

@app.get("/genes")
def get_genes(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
) -> GenesResponse:
    df = GENES

    total = int(df.shape[0])
    pages = math.ceil(total / page_size) if total > 0 else 1

    start = (page - 1) * page_size
    end = start + page_size
    paged_df = df.iloc[start:end]
    
    # Handle NaN values by converting them to None
    paged_df = paged_df.where(pd.notnull(paged_df), None)
    items = paged_df.to_dict(orient="records")
    
    return GenesResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        pages=pages,
    )