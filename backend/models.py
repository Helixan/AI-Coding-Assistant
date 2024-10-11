from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PromptRequest(BaseModel):
    prompt: str

class ExplanationRequest(BaseModel):
    code: str

class HistoryItem(BaseModel):
    prompt: str
    response: str
    created_at: datetime
