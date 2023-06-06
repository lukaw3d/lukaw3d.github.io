# Fix `array.filter(` return type

When you filter away elements of some type, it would be nice if returned type changed. But it doesn't:
```ts
const bad = ['a', 1, 'b'].filter((a) => typeof a === 'string')
// (string | number)[]
```

My current fix is:
```ts
const good = ['a', 1, 'b'].filter((a): a is string => typeof a === 'string')
// string[]

const good2 = ['a', null, 'b'].filter((a): a is NonNullable<typeof a> => !!a)
// string[]
```

https://www.typescriptlang.org/play?&q=166#code/MYewdgzgLgBARgQwCYwLwwNoHIFYDQwCMBWcWAugHQBmAlgDZQCmATgBRsICUaAfDFACeAByYhqMBGlTos0FrTABzLFwCwAKAD0WmHpgA9APybNoSLCUgQKdNlwFiMUhRoNm7TlwBckmLQgYeUUlPgERMQkpGVlg5VVNHX1DEw0zcGgYKxsAJjRMHHwYMABXenoSMio6RlYObl8pAJgAOXAWsvoEOHomAB4hUXFJflR+AEJx7kTdfWNNIA
