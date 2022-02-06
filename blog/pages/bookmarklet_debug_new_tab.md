# Bookmarklet to debug before javascript opens a new tab

```js
javascript:
document.body.addEventListener('click', (e) => {
  if (e.target.target === '_blank') {
    console.log(e.target.href);
    debugger;
  }
});
window.open = (url, ...rest) => {
  console.log(url);
  debugger;
};
```
