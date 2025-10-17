import pandas as pd
import os
import re
from typing import Optional
from enums.bio_type import LABEL_TO_ENUM

FILE_NAME = "genes_human.csv"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, FILE_NAME)

def _split_name_and_metadata(val):
    """
    If val contains trailing bracketed metadata like:
      "Some name [Source:HGNC Symbol;Acc:HGNC:4533]"
    return (clean_name_or_None, metadata_or_None)
    metadata is returned without the surrounding brackets.
    """
    if pd.isnull(val):
        return (None, None)
    s = str(val).strip()
    if s == "":
        return (None, None)
    m = re.search(r'\[(.*?)\]\s*$', s)
    if m:
        meta = m.group(1)
        name_clean = re.sub(r'\s*\[.*?\]\s*$', '', s).strip()
        if name_clean == "":
            name_clean = None
        return (name_clean, meta)
    return (s, None)

def _label_to_code(label: Optional[str]) -> Optional[int]:
    if label is None or pd.isnull(label):
        return None
    bt = LABEL_TO_ENUM.get(label)
    return bt.value if bt is not None else None

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

    # split metadata from name into a separate column; safe if name is missing/NaN
    name_meta = df["name"].apply(lambda v: pd.Series(_split_name_and_metadata(v), index=["name", "metadata"]))
    df["name"] = name_meta["name"]
    df["metadata"] = name_meta["metadata"]

    # add bioTypeCode column by exact label lookup (LABEL_TO_ENUM)
    df["bioTypeCode"] = df["bioType"].apply(_label_to_code)

    return df
