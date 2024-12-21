import * as vscode from 'vscode';
import { generateCodeCommand } from './commands/generateCode';
import { explainCodeCommand } from './commands/explainCode';
import { showHistoryCommand } from './commands/showHistory';
import { InlineCompletionProvider } from './providers/autoCompleteProvider';

export function activate(context: vscode.ExtensionContext) {
    const generateCodeDisposable = vscode.commands.registerCommand('extension.generateCode', () => generateCodeCommand());
    const explainCodeDisposable = vscode.commands.registerCommand('extension.explainCode', () => explainCodeCommand());
    const showHistoryDisposable = vscode.commands.registerCommand('extension.showHistory', () => showHistoryCommand(context));

    context.subscriptions.push(generateCodeDisposable, explainCodeDisposable, showHistoryDisposable);

    const selector: vscode.DocumentSelector = { scheme: 'file' };
    const provider = new InlineCompletionProvider();
    const providerDisposable = vscode.languages.registerCompletionItemProvider(
        selector,
        provider,
        '.', '(', ' '
    );

    context.subscriptions.push(providerDisposable);
}

export function deactivate() {}
