from pathlib import Path

from rag.cleaner import clean_text
from rag.chunker import chunk_documents
from rag.embedder import generate_embeddings, embed_query
from rag.vector_store import store_embeddings, search

DOCS_DIR = Path("data/docs")


def load_documents():
    docs = []

    for file in DOCS_DIR.glob("*"):
        if file.is_file():
            with open(file, "r", encoding="utf-8") as f:
                docs.append(
                    {
                        "source": file.name,
                        "content": clean_text(f.read()),
                    }
                )

    return docs


if __name__ == "__main__":
    # Step 1: Load documents
    documents = load_documents()

    # Step 2: Chunk documents
    chunks = chunk_documents(documents)

    # Step 3: Generate embeddings
    embedded_chunks = generate_embeddings(chunks)

    # Step 4: Store in ChromaDB
    store_embeddings(embedded_chunks)

    print("\n✅ Knowledge Base Created Successfully!\n")

    # Step 5: Test Semantic Search
    query = "What is the minimum age required for a business loan?"

    query_embedding = embed_query(query)

    results = search(query_embedding)

    print("=" * 70)
    print("Search Results")
    print("=" * 70)

    for i, document in enumerate(results["documents"][0], start=1):
        print(f"\nResult {i}")
        print("-" * 50)
        print(document)