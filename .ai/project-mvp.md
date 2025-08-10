# MVP for 10xRules.ai

Main problem: To improve the quality of collaboration between developers and AI, it's necessary to define project rules for artificial intelligence. Unfortunately, modern editors integrated with language models use different conventions for defining these rules, and without this document, the quality of collaboration with AI is low. Additionally, precise rule definition requires experience and knowledge about AI.

## Minimal set of functionality:

- Catalog of AI rules in Markdown format at 3 levels - application layers, stack layers, and library layers (e.g., Frontend, React, Zustand)
- Providing conventions for defining AI rules in a given editor
- Downloading rules in Markdown format
- Copying rules to clipboard
- Generating rules based on "dep-files" (e.g., package.json or requirements.txt)

## What is NOT included in MVP scope:

- Advanced features for sharing rules between users
- Export to formats other than Markdown
- Editing rules in the application - users customize content at their project level

## Success criteria:

- Users can generate a set of rules for the most popular web technologies using the ready-made catalog
- Users can download a ready-made set of rules or copy them to clipboard
