# Bookmarklet to debug before javascript navigates using pushState

```js
javascript:
delete window.history;
window.history = { pushState(...args) { debugger; } };
```

## Update:

easier with Navigation API now:

```js
javascript:
navigation.addEventListener('navigate', (...args) => { debugger; });
```
