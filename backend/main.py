from fastapi import FastAPI
from cors import configure_cors
from load_genes import load_genes
from routes.gene_router  import router 

app = FastAPI(root_path="/api")

configure_cors(app)

GENES = load_genes()

app.include_router(router)