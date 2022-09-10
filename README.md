# Tanpolate
A useless template engine

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

/*<@ switch (a) { @>
    <@ case 1: @>
NO WAY
        <@ break @>
    <@ case 114514 @>
Ohh right way
        <@ break @>
<@ } @>*/ Ok No switch Please
```