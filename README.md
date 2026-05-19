A simple Obsidian plugin that converts selected lists into Markdown tables.

## Features

- Convert any type of list to a single-column table
- Convert a nested list to a table with nested items arranged as rows
- Convert a nested list to a table with nested items arranged as columns
- Supports bullet lists (`-`, `*`, `+`)
- Supports task lists (`- [ ]`, `- [x]`)
- Supports numbered lists (`1.`, `2.`, etc.)

## Usage

1. Select text containing a list
2. Open the command palette (Ctrl/Cmd + P)
3. Run one of the commands below

### Convert to table with single column

Flattens any list into a single-column table.

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

### Convert to table with nested items as rows

Top-level items become column headers; nested items fill the rows below.

**Before:**
```
- Fruit
  - apple
  - banana
- Color
  - red
  - yellow
```

**After:**
```
| Fruit | Color |
| -------- | -------- |
| apple | red |
| banana | yellow |
```

### Convert to table with nested items as columns

Top-level items become row labels; nested items fill the cells across that row.

**Before:**
```
- Fruit
  - apple
  - banana
- Color
  - red
  - yellow
```

**After:**
```
|          |          |          |
| -------- | -------- | -------- |
| Fruit | apple | banana |
| Color | red | yellow |
```
