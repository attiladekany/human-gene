import math
from fastapi.testclient import TestClient

import main  # app under test

def test_get_genes_page_0_size_2():
    # expected first two records
    rows = [
        {
            "ensembl": "ENSG00000250577",
            "geneSymbol": None,
            "name": None,
            "metadata": None,
            "bioType": "Linc R N A",
            "bioTypeCode": 11,
            "chromosome": "0",
            "seqRegionStart": 138923930,
            "seqRegionEnd": 138924232
        },
        {
            "ensembl": "ENSG00000171657",
            "geneSymbol": "GPR82",
            "name": "G protein-coupled receptor 82",
            "metadata": "Source:HGNC Symbol;Acc:HGNC:4533",
            "bioType": "Protein Coding",
            "bioTypeCode": 22,
            "chromosome": "X",
            "seqRegionStart": 41724155,
            "seqRegionEnd": 41730135
        }
    ]

    client = TestClient(main.app)
    resp = client.get("/genes", params={"page_index": 0, "page_size": 2})
    assert resp.status_code == 200

    data = resp.json()
    # expected top-level keys from GenesResponse
    assert set(data.keys()) == {"items", "total", "page_index", "page_size", "pages"}

    assert isinstance(data["items"], list)
    assert len(data["items"]) == 2

    # assert the first two returned records match expected rows
    assert data["items"][0] == rows[0]
    assert data["items"][1] == rows[1]

    assert data["page_index"] == 0
    assert data["page_size"] == 2

    total = data["total"]
    assert isinstance(total, int) and total >= 0

    expected_pages = math.ceil(total / 2) if total > 0 else 1
    assert data["pages"] == expected_pages

def test_get_gene_by_ensembl_ENSG00000233276():
    expected = {
        "ensembl": "ENSG00000233276",
        "geneSymbol": "GPX1",
        "name": "glutathione peroxidase 1",
        "metadata": "Source:HGNC Symbol;Acc:HGNC:4553",
        "bioType": "Protein Coding",
        "bioTypeCode": 22,
        "chromosome": "3",
        "seqRegionStart": 49357176,
        "seqRegionEnd": 49358600
    }

    client = TestClient(main.app)
    resp = client.get("/genes/ENSG00000233276")
    assert resp.status_code == 200

    data = resp.json()
    assert data == expected
