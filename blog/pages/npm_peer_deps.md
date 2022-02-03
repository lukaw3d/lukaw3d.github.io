# Check which version of npm dependency to pin

To see which version of `html-loader` stopped supporting Webpack 4:

```sh
npm info 'html-loader@*' peerDependencies
```
