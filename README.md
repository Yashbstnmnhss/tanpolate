# Tanpolate
A useless template engine, it can do nothing

- `<{` and `}>` to insert values or expressions
- `<@` and `@>` to insert javascript codes

```js
Hello, <{this.name}>!

<@ if (this.show) { @>
Show Is True!
<@ } @>

<@ for (var [item, index] in Object.entries(this.array)) { @>
No.<{index}> = <{item}>
<@ } @>

<@ var a = 0 @>
<{a}> Im zero
<@ a = 114514 @>
<{a}> Im eheheh aahhhhhhh now
```

The `tanpolate` function supports custom options, you can use custom tags instead of `<@ <{ @> }>`
