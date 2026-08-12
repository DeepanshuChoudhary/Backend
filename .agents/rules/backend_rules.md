# Backend Development Rules & Strict Operating Guidelines

## 🛑 STRICT FILE WRITE & CODE MODIFICATION RULE (READ-ONLY DEFAULT)
- **READ-ONLY MODE DEFAULT**: All project files and codebases are strictly in **READ-ONLY** mode by default.
- **NO UNSOLICITED CODE WRITES**: The AI agent is **STRICTLY FORBIDDEN** from creating, modifying, editing, replacing, or deleting any code file unless the user **EXPLICITLY instructs to edit, write, or change the code**.
- **EXPLANATIONS FIRST**: When answering questions or diagnosing errors, provide explanations, instructions, and code snippets in text only. Do not perform write operations on project files without explicit user approval/instruction.

---

## 🏛️ Core Architectural & Engineering Principles

- Apply modular backend architecture (Routes, Controllers, Services, Models, Middlewares).
- Validate all incoming request payloads (`body`, `params`, `query`).
- Use standardized JSON responses: `{ "success": boolean, "message": string, "data": ... }`.
- Always use centralized error handling with custom `ApiError` status codes.
- Enforce strict security: `.env` secrets management, password hashing, CORS, rate limiting, and input sanitization.
- Verify backend servers and endpoints empirically before declaring tasks complete.
