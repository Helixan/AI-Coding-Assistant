# AI Coding Assistant

AI Coding Assistant is an advanced tool for software developers, offering features like code generation, inline suggestions, and detailed code explanations. It leverages OpenAI models, including `o1` and `GPT-4`, to streamline development workflows.

## Features

- **Code Generation**: Create well-structured code based on textual prompts.
- **Code Explanation**: Understand the functionality of complex code snippets.
- **Inline Suggestions**: Get context-aware code completions within your editor.
- **Prompt History**: View and revisit previous prompts and responses.

## Architecture Overview

The project consists of two main components:

1. **Backend** (FastAPI): A server handling requests for code generation, explanation, and history management using OpenAI APIs and MongoDB for data storage.
2. **VS Code Extension**: An extension to integrate AI-driven features directly into Visual Studio Code.

## Setup and Installation

Follow these steps to set up the project:

### Prerequisites

- Python 3.9+
- Node.js 16+
- Visual Studio Code
- MongoDB instance
- OpenAI API Key

### Backend Setup

1. Clone the repository and navigate to the `backend` directory:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the `backend` directory with the following contents:
   ```
   OPENAI_API_KEY=Your-OpenAI-Key
   MONGODB_URI=Your-Database-URI
   MONGODB_DBNAME=Your-Database-Name
   ```

4. Start the backend server:
   ```bash
   uvicorn app:app --reload
   ```
   The server will run at `http://127.0.0.1:8000`.

### VS Code Extension Setup

1. Navigate to the `vscode-extension` directory:
   ```bash
   cd vscode-extension
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run compile
   ```

4. Open the project in Visual Studio Code and press `F5` to launch a new VS Code instance with the extension loaded.

## Usage

### Backend Endpoints

The backend exposes the following endpoints:

- **POST /generate-code**: Generate code based on a prompt.
  ```json
  {
    "prompt": "Create a Python function to calculate the factorial of a number."
  }
  ```

- **POST /explain-code**: Explain a code snippet.
  ```json
  {
    "code": "def factorial(n): return 1 if n == 0 else n * factorial(n-1)"
  }
  ```

- **GET /history**: Retrieve the last 20 prompt-response pairs.

- **POST /suggest-code**: Get inline suggestions for partial code and optional workspace context.
  ```json
  {
    "partial_code": "def add_numbers(a, b): return a +",
    "workspace_context": ["other_code_snippets"]
  }
  ```

### VS Code Extension Features

- **Generate Code**: Use the `AI Assistant: Generate Code` command to create code from a prompt.
- **Explain Code**: Select a snippet and use `AI Assistant: Explain Code` for detailed explanations.
- **Show History**: View previous prompts and responses via `AI Assistant: Show Prompt History`.
- **Inline Suggestions**: Type in the editor to receive context-aware completions.

## Development

### Backend

- Run the server locally with `uvicorn` for live development.
- Modify Python files in the `backend` directory as needed.

### Extension

- Use `npm run watch` to continuously build the extension while editing TypeScript files.
- Debug directly in VS Code using the preconfigured launch settings in `.vscode/launch.json`.