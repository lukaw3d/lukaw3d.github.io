# Strictly typed VueComponent.extend

If you've mocked some vue component's method like
```ts
VueComponent.extend({
  methods: {
    a(){ return 5 }
  }
})
```
you probably noticed the complete lack of type safety. There's no autocomplete for existing methods you might want to overide. There's no type checks on parameters and return type.

I made https://github.com/lukaw3d/typed-vue-extend to mitigate it. Demo https://github.com/lukaw3d/typed-vue-extend/blob/main/test.ts
