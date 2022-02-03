# Bookmarklet to debug before javascript navigates using pushState

```js
javascript:
delete window.history;
window.history = { pushState(){debugger;} };
```
