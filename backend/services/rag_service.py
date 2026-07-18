from typing import List
import base64

from rag.embedder import embed_query
from rag.vector_store import search

from services.gemini_service import GeminiService
from services.workflow import LoanWorkflow
from voice.tts import speak

# Global workflow instance
workflow = LoanWorkflow()


class RAGService:

    @staticmethod
    def search(query: str, history: List = None):

        if history is None:
            history = []

        # -----------------------------------------
        # Loan Eligibility Workflow
        # -----------------------------------------

        query_lower = query.lower()

        loan_keywords = [
            "loan",
            "business loan",
            "apply loan",
            "loan eligibility",
            "need loan",
            "i need a loan",
            "i want a loan",
            "i want a business loan",
        ]

        # Start workflow
        if not workflow.active:
            if any(keyword in query_lower for keyword in loan_keywords):

                answer = workflow.start()

                try:
                    audio_bytes = speak(answer)
                    audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")
                except Exception as e:
                    print("TTS failed:", e)
                    audio_base64 = None

                return {
                    "answer": answer,
                    "sources": [],
                    "audio": audio_base64,
                }

        # Continue workflow
        if workflow.active:

            answer = workflow.process_answer(query)

            try:
                audio_bytes = speak(answer)
                audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")
            except Exception as e:
                print("TTS failed:", e)
                audio_base64 = None

            return {
                "answer": answer,
                "sources": [],
                "audio": audio_base64,
            }

        # -----------------------------------------
        # Existing RAG Pipeline
        # -----------------------------------------

        # Generate embedding
        embedding = embed_query(query)

        # Retrieve relevant documents
        results = search(embedding)

        documents = results["documents"][0]
        metadatas = results["metadatas"][0]

        # Combine retrieved documents into context
        context = "\n\n".join(documents)

        # Build conversation history
        history_text = ""

        for message in history:
            history_text += (
                f"{message.role.capitalize()}: "
                f"{message.content}\n"
            )

        # Gemini Prompt
        prompt = f"""
You are an AI-powered Loan Assistant.

Your job is to answer user questions using the provided Knowledge Base.

Rules:
1. Use the Conversation History to understand follow-up questions.
2. Answer ONLY using the Knowledge Base.
3. If the answer is not available, reply:
   "I couldn't find this information in the knowledge base."
4. Be concise, professional, and conversational.

Conversation History:
{history_text}

Knowledge Base:
{context}

Current User Question:
{query}
"""

        try:
            answer = GeminiService.generate_answer(prompt)

        except Exception as e:
            print("Gemini failed:", e)

            answer = (
                documents[0]
                if documents
                else "I couldn't find this information in the knowledge base."
            )

        # Generate speech
        try:
            audio_bytes = speak(answer)
            audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")

        except Exception as e:
            print("TTS failed:", e)
            audio_base64 = None

        # Remove duplicate sources
        sources = []
        seen = set()

        for metadata in metadatas:
            source = metadata.get("source", "Unknown")

            if source not in seen:
                seen.add(source)
                sources.append(source)

        return {
            "answer": answer,
            "sources": sources,
            "audio": audio_base64,
        }