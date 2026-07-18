from pathlib import Path
import chromadb

# Always use the backend/vector_db folder
BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "vector_db"

print("Using DB Path:", DB_PATH)

client = chromadb.PersistentClient(path=str(DB_PATH))

collection = client.get_or_create_collection(
    name="knowledge_base"
)



def store_embeddings(chunks):
    ids = []
    documents = []
    embeddings = []
    metadatas = []

    for chunk in chunks:
        ids.append(chunk["id"])
        documents.append(chunk["content"])
        embeddings.append(chunk["embedding"])
        metadatas.append({
            "source": chunk["source"]
        })

    try:
        collection.delete(ids=ids)
    except Exception:
        pass

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas
    )

    print(f"✅ Stored {len(ids)} chunks")


def search(query_embedding, top_k=3):
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    print("\n===== SEARCH RESULTS =====")
    print(results)

    return results