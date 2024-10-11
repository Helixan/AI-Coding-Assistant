from fastapi import FastAPI, HTTPException
from .models import PromptRequest, ExplanationRequest, HistoryItem
from .database import prompts_collection
from .handlers import generate_code_with_o1, explain_code_with_gpt4
from datetime import datetime
from typing import List

app = FastAPI()

@app.post("/generate-code")
async def generate_code(request: PromptRequest):
    try:
        code = await generate_code_with_o1(request.prompt)

        await prompts_collection.insert_one({
            "prompt": request.prompt,
            "response": code,
            "created_at": datetime.utcnow()
        })
        return {"generated_code": code}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/explain-code")
async def explain_code(request: ExplanationRequest):
    try:
        explanation = await explain_code_with_gpt4(request.code)
        return {"explanation": explanation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history", response_model=List[HistoryItem])
async def get_history():
    cursor = prompts_collection.find().sort("created_at", -1).limit(20)
    items = []
    async for doc in cursor:
        items.append(HistoryItem(prompt=doc["prompt"], response=doc["response"], created_at=doc["created_at"]))
    return items
