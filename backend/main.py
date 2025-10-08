from fastapi import FastAPI, Query
from typing import List
import pandas as pd
from gene_model import Gene
import os

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
) -> List[Gene]:
    df = GENES

    start = (page - 1) * page_size
    end = start + page_size
    paged_df = df.iloc[start:end]
    
    # Handle NaN values by converting them to None
    paged_df = paged_df.where(pd.notnull(paged_df), None)
    
    return paged_df.to_dict(orient="records")