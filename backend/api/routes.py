from typing import List

from fastapi import APIRouter
from pydantic import BaseModel, Field

from services.rag_service import RAGService

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class SearchRequest(BaseModel):
    query: str
    history: List[Message] = Field(default_factory=list)


@router.post("/search")
def search(request: SearchRequest):

    return RAGService.search(
        query=request.query,
        history=request.history
    )