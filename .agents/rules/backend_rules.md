# Backend Development Rules

- Apply modular backend architecture (Routes, Controllers, Services, Models, Middlewares).
- Validate all incoming request payloads (`body`, `params`, `query`).
- Use standardized JSON responses: `{ "success": boolean, "message": string, "data": ... }`.
- Always use centralized error handling with custom `ApiError` status codes.
- Enforce strict security: `.env` secrets management, password hashing, CORS, rate limiting, and input sanitization.
- Verify backend servers and endpoints empirically before declaring tasks complete.
