from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def generate_code_with_o1(prompt: str) -> str:
    # Improved prompt to guide Codex
    code_prompt = (
        f"### Instruction:\n"
        f"Generate clear, well-structured code that completes the following:\n"
        f"{prompt}\n"
        f"### Code:\n"
    )

    response = client.chat.completions.create(model="o1-mini",
    messages=[{"role": "assistant", "content": "You are a helpful coding assistant. You provide code completions. You do not send back any extra text besides the code."},
              {"role": "user", "content": code_prompt}])
    return response.choices[0].message.content.strip()

async def explain_code_with_gpt4(code: str) -> str:
    # Using GPT-4 if available. If not, fallback to GPT-3.5-turbo
    # For demonstration, assume GPT-4 access is available.
    explanation_prompt = (
        f"Explain what the following code does, step by step, in a concise and clear manner:\n\n"
        f"```{code}```\n"
    )

    response = client.chat.completions.create(model="gpt-4o",
    messages=[{"role": "system", "content": "You are a helpful coding assistant."},
              {"role": "user", "content": explanation_prompt}],
    temperature=0.2)
    return response.choices[0].message.content.strip()
