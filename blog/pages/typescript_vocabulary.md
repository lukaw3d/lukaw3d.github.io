# What's that thing in Typescript called?

_or: Typescript vocabulary that is impossible to google_

- "**triple-slash directives**" = the thing you put at the top of a js file to load types

- "**type narrowing**" = Why putting something into a function parameter behaves differently than if you put it into a variable, and then into a function parameter
  - `as const` can usually fix it

  ```ts
  function fn(a: { b: 'c' }) {}
  fn({b: 'c'}) // uses type narrowing

  const var1 = {b: 'c'} // doesn't
  fn(var1) // err

  const var2 = {b: 'c'} as const
  fn(var2)
  ```
  https://www.typescriptlang.org/play?&q=166#code/GYVwdgxgLglg9mABMMAKAhgLkQb0QI2wHIIjEBfASl3IFgAoBlVHQxEoqxAem8RADOAUwGIoATwAOQxGHQAneXADuMMAHMGDCAgFREANwUBGRAF5cbDuQDcTNEfnHqvREMU8+AEzgiwRKC16HTA9QwUAJnNLYlJyRHRREL07emZHCMogA

- Function that affects parameter's type
  - "**type predicates**" (used to be called "**type guards**"): returns boolean
  - "**assertion functions**": throws

- "**tsm**": That thing that is better than ts-node
