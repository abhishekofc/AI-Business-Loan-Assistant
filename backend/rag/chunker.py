from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_documents(documents):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=50
    )

    chunks = []

    for doc in documents:
        split_text = splitter.split_text(doc["content"])

        for i, chunk in enumerate(split_text):
            chunks.append({
                "id": f"{doc['source']}_{i}",
                "source": doc["source"],
                "content": chunk
            })

    return chunks