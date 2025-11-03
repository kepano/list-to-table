import { Editor, MarkdownView, Plugin } from 'obsidian';

export default class ListToTablePlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'convert-list-to-table',
			name: 'Convert list to table',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
				const selection = editor.getSelection();
				
				if (!selection) {
					return;
				}

				const table = this.convertListToTable(selection);
				editor.replaceSelection(table);
			}
		});
	}

	convertListToTable(text: string): string {
		const lines = text.split('\n');
		const items: string[] = [];

		// Regular expression to match list items:
		// - bullet lists (-, *, +)
		// - task lists (- [ ], - [x])
		// - numbered lists (1., 2., etc.)
		// Supports any amount of leading whitespace (indentation)
		const listItemRegex = /^\s*(?:[-*+]|\d+\.)\s+(?:\[[ xX]\]\s+)?(.*)$/;

		for (const line of lines) {
			const match = line.match(listItemRegex);
			if (match && match[1] !== undefined) {
				// Extract the text content, flattening indentation
				items.push(match[1]);
			}
		}

		if (items.length === 0) {
			return text; // Return original text if no list items found
		}

		// Build the table
		let table = '|          |\n';
		table += '| -------- |\n';
		
		for (const item of items) {
			table += `| ${item} |\n`;
		}

		return table;
	}
}
