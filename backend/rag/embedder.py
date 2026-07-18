from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks):

    embedded = []

    for chunk in chunks:

        embedded.append({
            "id": chunk["id"],
            "source": chunk["source"],
            "content": chunk["content"],
            "embedding": model.encode(chunk["content"]).tolist()
        })

    return embedded


def embed_query(query):

    return model.encode(query).tolist()