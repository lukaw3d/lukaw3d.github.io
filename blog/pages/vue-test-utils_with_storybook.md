# You can use @vue/test-utils with Storybook to mock deep components

It's not the prettiest, but it enables more mocking than `AComponent.extend()`:

```ts
import Vue from 'vue';
import { mount } from '@vue/test-utils';

export default {
  title: 'vueTestUtils in storybook',
};

export const A = () => {
  return Vue.extend({
    render: () => {
      return mount(AComponent, {
        propsData: { name: 'Hello' },
        listeners: { click: console.log },
        stubs: {
          DeepComponent: Vue.extend({
            template: '<div>Mocked deep component</div>',
          }),
        },
      }).vm.$vnode;
    },
  });
};
```
