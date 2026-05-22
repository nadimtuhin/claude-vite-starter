---
name: api-docs
description: Use when integrating a new external API. Fetches full API documentation and saves it to the repo as a reference file. Triggers: "check the api", "fetch api docs", "save api docs", "check the full api and save in repo", "document this API".
---

# Fetch and Save API Docs

When integrating a new external API, capture its full documentation in the repo so future sessions have ground truth without re-fetching.

## Steps

### Step 1: Fetch the docs

Use WebFetch on the API documentation URL. Extract:
- All endpoints with HTTP methods and path patterns
- All query/path parameters with types and descriptions
- Request/response body shapes
- Authentication method
- Rate limits and error codes
- Any SDK/iframe embed patterns

Fetch multiple pages if the docs are paginated.

### Step 2: Save to repo

Save as `{service-name}-api.md` in the repo root (e.g., `stripe-api.md`, `vidapi.md`).

Format:

```markdown
# {Service} API Reference

Source: {url}
Fetched: {date}

## Endpoints
...

## Parameters
...

## Response Shape
...

## Error Codes
...
```

### Step 3: Reference in service file

Add a comment at the top of `src/services/{service}.js`:

```js
// API reference: ./{service}-api.md
```

### Step 4: Report

Tell the user:
- What was saved and where
- Key endpoints found
- Any gaps or ambiguities in the docs

## Why save docs to repo?

- Future Claude sessions don't re-fetch (saves time + tokens)
- Docs drift — saved copy is ground truth at integration time
- Team members see what API surface is actually used
