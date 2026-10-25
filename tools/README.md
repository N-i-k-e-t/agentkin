# Tools

One folder per tool: `tools/<tool-name>/` with `tool.yaml` (name, version, owner, input schema, output schema, integration used), `README.md`, code and `tests/`.

A tool does one thing, has typed inputs and outputs, and never reads keys directly: it goes through an integration.
