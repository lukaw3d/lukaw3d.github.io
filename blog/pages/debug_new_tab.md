# Debug before javascript opens a new tab

```js
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
