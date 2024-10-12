import * as vscode from 'vscode';
import { requestCodeGeneration } from '../apiClient';

export async function generateCodeCommand() {
    const prompt = await vscode.window.showInputBox({ prompt: 'Enter your coding prompt:' });
    if (!prompt) { return; }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Generating code...",
        cancellable: false
    }, async () => {
        try {
            const generated = await requestCodeGeneration(prompt);
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                editor.edit(editBuilder => {
                    editBuilder.insert(editor.selection.active, `\n${generated}\n`);
                });
                vscode.window.showInformationMessage("Code inserted successfully.");
            } else {
                const doc = await vscode.workspace.openTextDocument({ content: generated, language: 'plaintext' });
                vscode.window.showTextDocument(doc);
            }
        } catch (err: any) {
            vscode.window.showErrorMessage(`Error generating code: ${err.message}`);
        }
    });
}
