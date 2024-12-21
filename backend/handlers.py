from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def generate_code_with_o1(prompt: str) -> str:
    code_prompt = (
        f"Generate clear, well-structured code that completes the following:\n"
        f"{prompt}\n"
    )

    response = client.chat.completions.create(
        model="o1-mini",
        messages=[
            {
                "role": "assistant",
                "content": "You are a helpful coding assistant. "
                           "You provide code completions and only return the code. "
                           "Do not include a code box. "
                           "Do not repeat already typed code. Only finish from the current point."
            },
            {"role": "user", "content": code_prompt}
        ]
    )
    return response.choices[0].message.content.strip()

async def explain_code_with_gpt4(code: str) -> str:
    explanation_prompt = (
        f"Explain what the following code does, step by step, in a concise and clear manner:\n\n"
        f"```{code}```\n"
    )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful coding assistant."},
            {"role": "user", "content": explanation_prompt}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content.strip()

async def suggest_inline_code(partial_code: str, workspace_context: list[str] | None) -> str:
    context_text = ""
    if workspace_context:
        truncated_snippets = []
        for snippet in workspace_context:
            truncated_snippets.append(snippet[:500])
        context_text = "\n\n".join(truncated_snippets)
    
    inline_prompt = (
        "You are an inline code autocomplete engine. "
        "Given some partial code and optional context, predict the next few tokens or lines. "
        "Keep it short, just complete the line or next statement. "
        "Do not include extra commentary. Do not include a code box. "
        "Do not repeat already typed code. Only finish from the current point.\n\n"
        f"Context:\n{context_text}\n\n"
        f"Partial Code:\n{partial_code}\n\n"
        "Completion:"
    )

    response = client.chat.completions.create(
        model="o1-mini",
        messages=[
            {
                "role": "assistant",
                "content": "You are a code assistant providing inline suggestions only."
            },
            {"role": "user", "content": inline_prompt}
        ]
    )
    return response.choices[0].message.content.strip()
