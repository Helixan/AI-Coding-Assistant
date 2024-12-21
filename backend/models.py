from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PromptRequest(BaseModel):
    prompt: str

class ExplanationRequest(BaseModel):
    code: str

class SuggestRequest(BaseModel):
    partial_code: str
    workspace_context: Optional[List[str]] = None

class HistoryItem(BaseModel):
    prompt: str
    response: str
    created_at: datetime
