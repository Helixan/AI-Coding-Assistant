import * as vscode from 'vscode';
import { requestCodeExplanation } from '../apiClient';

export async function explainCodeCommand() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("No active editor.");
        return;
    }

    const selection = editor.selection;
    const code = editor.document.getText(selection);
    if (!code) {
        vscode.window.showInformationMessage("Select some code to explain.");
        return;
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Explaining code...",
        cancellable: false
    }, async () => {
        try {
            const explanation = await requestCodeExplanation(code);
            const doc = await vscode.workspace.openTextDocument({ content: explanation, language: 'markdown' });
            vscode.window.showTextDocument(doc);
        } catch (err: any) {
            vscode.window.showErrorMessage(`Error explaining code: ${err.message}`);
        }
    });
}
