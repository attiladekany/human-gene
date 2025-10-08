import sys
import types
import pandas as pd
from fastapi.testclient import TestClient

# create a minimal fake gene_model module so `from gene_model import Gene` succeeds
fake_mod = types.ModuleType("gene_model")
fake_mod.Gene = object
sys.modules["gene_model"] = fake_mod

import main  # now safe to import

def test_get_genes_page_1_size_2():
    # prepare test DataFrame matching expected JSON keys/types
    rows = [
        {
            "ensembl": "ENSG00000250577",
            "geneSymbol": None,
            "name": None,
            "bioType": "Linc R N A",
            "chromosome": "4",
            "seqRegionStart": 138923930,
            "seqRegionEnd": 138924232
        },
        {
            "ensembl": "ENSG00000171657",
            "geneSymbol": "GPR82",
            "name": "G protein-coupled receptor 82 [Source:HGNC Symbol;Acc:HGNC:4533]",
            "bioType": "Protein Coding",
            "chromosome": "X",
            "seqRegionStart": 41724155,
            "seqRegionEnd": 41730135
        }
    ]
    df = pd.DataFrame(rows)
    # inject into the main module so the endpoint will use our data
    main.GENES = df

    client = TestClient(main.app)
    resp = client.get("/genes", params={"page": 1, "page_size": 2})
    assert resp.status_code == 200

    expected = rows
    assert resp.json() == expected
