import pandas as pd
import os

FILE_NAME = "genes_human.csv"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, FILE_NAME)

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
