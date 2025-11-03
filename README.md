A simple Obsidian plugin that converts selected lists into Markdown tables.

## Features

- Convert any type of list to a single-column table
- Supports bullet lists (`-`, `*`, `+`)
- Supports task lists (`- [ ]`, `- [x]`)
- Supports numbered lists (`1.`, `2.`, etc.)
- Flattens indented items

## Usage

1. Select text containing a list
2. Open the command palette (Ctrl/Cmd + P)
3. Run **"Convert list to table"**

### Example

**Before:**
```
- bullet 1
- bullet 2
  - nested item
- [ ] task item
1. numbered item
```

**After:**
```
|          |
| -------- |
| bullet 1 |
| bullet 2 |
| nested item |
| task item |
| numbered item |
```
