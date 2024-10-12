import * as vscode from 'vscode';
import { HistoryItem } from '../types';
import { fetchHistory } from '../apiClient';
import { showHistoryPanel } from '../webview/historyPanel';

export async function showHistoryCommand(context: vscode.ExtensionContext) {
    try {
        const history = await fetchHistory();
        showHistoryPanel(context, history);
    } catch (err: any) {
        vscode.window.showErrorMessage(`Error fetching history: ${err.message}`);
    }
}
