# Contributing to List to Table

List to Table is a simple, single-purpose plugin and is considered feature complete. The most useful contributions are bug fixes and compatibility patches for new Obsidian releases.

## Reporting issues

Before opening an issue, please search [existing issues](https://github.com/kepano/list-to-table/issues) to avoid duplicates. When reporting a bug, include:

- Obsidian version and operating system
- List to Table version
- The list you tried to convert and the output you got
- Steps to reproduce
- Whether the issue occurs with other plugins disabled and the default theme

## Submitting pull requests

1. Fork the repo and create a branch from `master`.
2. Make your changes in `main.ts`. Never edit `main.js` directly, as it is generated.
3. Build locally with `npm run build` and test the plugin in Obsidian.
4. Open a pull request with a short description of what changed and why.

Keep PRs focused. One fix or feature per PR makes review easier.

## Questions

Join the [Obsidian Discord](https://discord.gg/veuWUTm) for general questions about plugin development.
