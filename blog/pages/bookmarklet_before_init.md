# Bookmarklet that runs before page loads

You can't click the bookmarklet immediately after clicking refresh. But you can open a new tab and use its handle!
Here's how you can override some global vars before your react app loads and detects if it is running in browser extension env:
```js
javascript:
if (location.origin !== 'https://wallet.dev.oasis.io') throw 'must click while on https://wallet.dev.oasis.io';
newTab = window.open('https://wallet.dev.oasis.io/', '_blank');
newTab.chrome = { runtime: { id: 'emulate-extension' } }
```

https://github.com/oasisprotocol/oasis-wallet-web/wiki/lukaw3d-bookmarklets#migrate-v0-profile-emulate-ext
