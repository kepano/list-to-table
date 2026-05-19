import { Editor, MarkdownView, Plugin } from 'obsidian';

export default class ListToTablePlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'convert-list-to-table',
			name: 'Convert to table with single column',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
				const selection = editor.getSelection();

				if (!selection) {
					return;
				}

				const table = this.convertListToTable(selection);
				editor.replaceSelection(table);
			}
		});

		this.addCommand({
			id: 'convert-nested-list-to-table-rows',
			name: 'Convert to table with nested items as rows',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
				const selection = editor.getSelection();

				if (!selection) {
					return;
				}

				const table = this.convertNestedListToColumns(selection);
				editor.replaceSelection(table);
			}
		});

		this.addCommand({
			id: 'convert-nested-list-to-table-columns',
			name: 'Convert to table with nested items as columns',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
				const selection = editor.getSelection();

				if (!selection) {
					return;
				}

				const table = this.convertNestedListToRows(selection);
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

	convertNestedListToColumns(text: string): string {
		const lines = text.split('\n');
		const listItemRegex = /^(\s*)(?:[-*+]|\d+\.)\s+(?:\[[ xX]\]\s+)?(.*)$/;

		const parsed: { indent: number; text: string }[] = [];
		for (const line of lines) {
			const match = line.match(listItemRegex);
			if (match) {
				parsed.push({ indent: match[1].length, text: match[2] });
			}
		}

		if (parsed.length === 0) {
			return text;
		}

		const topIndent = Math.min(...parsed.map(item => item.indent));
		const columns: { header: string; rows: string[] }[] = [];

		for (const item of parsed) {
			if (item.indent === topIndent) {
				columns.push({ header: item.text, rows: [] });
			} else if (columns.length > 0) {
				columns[columns.length - 1].rows.push(item.text);
			}
		}

		if (columns.length === 0) {
			return text;
		}

		const maxRows = Math.max(...columns.map(c => c.rows.length));

		let table = '| ' + columns.map(c => c.header).join(' | ') + ' |\n';
		table += '| ' + columns.map(() => '--------').join(' | ') + ' |\n';
		for (let i = 0; i < maxRows; i++) {
			table += '| ' + columns.map(c => c.rows[i] ?? '').join(' | ') + ' |\n';
		}

		return table;
	}

	convertNestedListToRows(text: string): string {
		const lines = text.split('\n');
		const listItemRegex = /^(\s*)(?:[-*+]|\d+\.)\s+(?:\[[ xX]\]\s+)?(.*)$/;

		const parsed: { indent: number; text: string }[] = [];
		for (const line of lines) {
			const match = line.match(listItemRegex);
			if (match) {
				parsed.push({ indent: match[1].length, text: match[2] });
			}
		}

		if (parsed.length === 0) {
			return text;
		}

		const topIndent = Math.min(...parsed.map(item => item.indent));
		const rows: { header: string; cells: string[] }[] = [];

		for (const item of parsed) {
			if (item.indent === topIndent) {
				rows.push({ header: item.text, cells: [] });
			} else if (rows.length > 0) {
				rows[rows.length - 1].cells.push(item.text);
			}
		}

		if (rows.length === 0) {
			return text;
		}

		const maxCells = Math.max(...rows.map(r => r.cells.length));
		const totalCols = maxCells + 1;

		let table = '| ' + new Array(totalCols).fill('        ').join(' | ') + ' |\n';
		table += '| ' + new Array(totalCols).fill('--------').join(' | ') + ' |\n';
		for (const row of rows) {
			const cells = [row.header, ...row.cells];
			while (cells.length < totalCols) cells.push('');
			table += '| ' + cells.join(' | ') + ' |\n';
		}

		return table;
	}
}
