import * as vscode from 'vscode';
import { requestInlineSuggestion } from '../apiClient';

export class InlineCompletionProvider implements vscode.CompletionItemProvider {

    public async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): Promise<vscode.CompletionItem[] | undefined> {

        const range = new vscode.Range(new vscode.Position(0, 0), position);
        const partialCode = document.getText(range);

        const workspaceContext = await gatherWorkspaceContext(document);

        let suggestionText: string;
        try {
            suggestionText = await requestInlineSuggestion(partialCode, workspaceContext);
        } catch (err: any) {
            console.error(err);
            return [];
        }

        if (!suggestionText) {
            return [];
        }
        const completionItem = new vscode.CompletionItem(suggestionText, vscode.CompletionItemKind.Snippet);
        completionItem.insertText = suggestionText;
        
        completionItem.detail = "AI Suggested Completion";

        return [completionItem];
    }
}

async function gatherWorkspaceContext(currentDoc: vscode.TextDocument): Promise<string[]> {
    const context: string[] = [];
    const openDocs = vscode.workspace.textDocuments.filter(doc => doc !== currentDoc);

    for (const doc of openDocs) {
        const text = doc.getText();
        context.push(text.slice(0, 1000));
    }

    return context;
}
