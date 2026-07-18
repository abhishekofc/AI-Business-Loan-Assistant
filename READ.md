# 🤖 AI-Powered Loan Call Center Assistant

An AI-powered voice-based customer support assistant for business loan queries. The system uses **Retrieval-Augmented Generation (RAG)** with **ChromaDB**, **Sentence Transformers**, **Google Gemini**, **FastAPI**, **Faster Whisper**, and **ElevenLabs** to provide accurate, context-aware responses based on a custom knowledge base.

---

## ✨ Features

- 🎙️ Voice-to-Voice AI Assistant
- 🧠 Retrieval-Augmented Generation (RAG)
- 📄 Custom Knowledge Base
- 🔍 Semantic Search using ChromaDB
- 🤖 Google Gemini LLM Integration
- 🗣️ Speech-to-Text using Faster Whisper
- 🔊 Text-to-Speech using ElevenLabs
- 💬 Conversation History Support
- ⚡ FastAPI REST API
- 📚 Source Attribution for Answers

---

# 🏗️ Project Architecture

```
                User Speech
                     │
                     ▼
         Faster Whisper (STT)
                     │
                     ▼
              FastAPI Backend
                     │
                     ▼
        Generate Query Embedding
                     │
                     ▼
               ChromaDB Search
                     │
                     ▼
        Relevant Knowledge Chunks
                     │
                     ▼
        Gemini LLM (Answer Generation)
                     │
                     ▼
          ElevenLabs Text-to-Speech
                     │
                     ▼
               Spoken Response
```

---

# 📂 Project Structure

```
backend/
│
├── api/
│   └── routes.py
│
├── data/
│   └── docs/
│       ├── business_loan.txt
│       └── faq.txt
│
├── rag/
│   ├── loader.py
│   ├── cleaner.py
│   ├── chunker.py
│   ├── embedder.py
│   ├── retriever.py
│   └── vector_store.py
│
├── services/
│   ├── gemini_service.py
│   └── rag_service.py
│
├── voice/
│   ├── assistant.py
│   ├── stt.py
│   └── tts.py
│
├── vector_db/
│
├── app.py
├── config.py
├── requirements.txt
└── .env
```

---

# 🛠️ Tech Stack

### Backend

- Python 3.13
- FastAPI
- Uvicorn

### AI / Machine Learning

- Google Gemini
- Sentence Transformers
- all-MiniLM-L6-v2

### Vector Database

- ChromaDB

### Speech

- Faster Whisper
- ElevenLabs

### RAG

- LangChain