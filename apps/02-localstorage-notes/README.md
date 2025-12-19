# 02 — Notes App (localStorage)

## What is this?

A tiny notes app that persists data using `localStorage`.

## What you learn

- `localStorage` stores **strings**
- Use `JSON.stringify()` to save arrays/objects
- Use `JSON.parse()` to read back
- Safe parsing to avoid crashes
- `getItem / setItem / removeItem`

## Key idea (child-level)

`localStorage` is a notebook that only accepts **text**.
So we convert our notes to text (JSON) before saving.

## Common mistakes

- Saving objects directly (it becomes `[object Object]`)
- Forgetting to parse JSON on load
- Not handling invalid/corrupted stored data

## MDN links

- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- https://developer.mozilla.org/en-US/docs/Web/API/Storage
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
