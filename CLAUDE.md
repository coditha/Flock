# Ethics Game — Claude Instructions

## Auto Sync Workflow

At the start of every session, pull the latest changes:
```
git pull origin main
```

## After Implementing and Verifying a Change

1. Show a summary of all modified files (`git diff --stat`).
2. Generate a concise, descriptive commit message based on the feature or fix.
3. Stage the modified files (`git add <files>`).
4. Run the build to confirm no errors before committing:
   - `cd "ethics game/reclaim-the-block" && npx tsc --noEmit`
5. If the build passes, create the commit with the descriptive message.
6. Push the commit to the current branch: `git push origin <branch>`.

## Before Every Push — Checklist

- No TypeScript / build errors (`tsc --noEmit` passes).
- No merge conflicts (`git status` is clean).
- Working tree is clean after staging.

## If Something Goes Wrong

- **Build error** → stop, show the error, do not push. Fix first.
- **Merge conflict** → stop, explain the conflict, do not push. Resolve first.
- **Test failure** → stop, explain, do not push.

## Commit Message Style

Use descriptive messages that explain *what changed and why*, e.g.:
- `Add dice animation with roll result display`
- `Fix card interaction bug causing duplicate draws`
- `Refactor privacy meter to full-height layout`

Never use vague messages like `fix stuff` or `update`.
