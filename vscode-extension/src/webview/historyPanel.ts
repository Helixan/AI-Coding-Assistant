import * as vscode from 'vscode';
import { HistoryItem } from '../types';

export function showHistoryPanel(context: vscode.ExtensionContext, history: HistoryItem[]) {
    const panel = vscode.window.createWebviewPanel(
        'aiAssistantHistory',
        'AI Assistant History',
        vscode.ViewColumn.One,
        { enableScripts: true }
    );

    panel.webview.html = getWebviewContent(history);
}

function getWebviewContent(history: HistoryItem[]): string {
    const rows = history.map(item => `
        <div class="history-item">
            <h3>Prompt:</h3>
            <pre>${escapeHtml(item.prompt)}</pre>
            <h3>Response:</h3>
            <pre>${escapeHtml(item.response)}</pre>
            <p><em>Created at: ${new Date(item.created_at).toLocaleString()}</em></p>
        </div>
    `).join('');

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <style>
            body {
                font-family: sans-serif;
                margin: 10px;
            }
            .history-item {
                border: 1px solid #ccc;
                padding: 10px;
                margin-bottom: 10px;
            }
            pre {
                background: #f4f4f4;
                padding: 5px;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
        </style>
    </head>
    <body>
        <h1>AI Assistant Prompt History</h1>
        ${rows || "<p>No history found.</p>"}
    </body>
    </html>
    `;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
