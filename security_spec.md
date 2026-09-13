# Security Spec

## Data Invariants
1. A user document can only be accessed or modified by its owner.
2. `level`, `coins`, `gems`, `xp`, `energy`, `streak` must be numeric and not strings.
3. System fields like `createdAt` cannot be modified after document creation.
4. Updates strictly require type matches, no injecting ghost fields.

## The Dirty Dozen Payloads
- Try writing a shadow field.
- Try modifying `createdAt` after creation.
- Change owner to someone else.
- Send non-numeric for `coins`.
- Send string for `energy`.
- Inject massive string sizes in the object.

## Test Runner
\`\`\`typescript
// Included in firestore.rules.test.ts
\`\`\`
