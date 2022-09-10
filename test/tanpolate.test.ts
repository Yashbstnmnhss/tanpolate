import { tanpolate } from '../lib/index'

test('Hello World', () => {
    expect(tanpolate(`
<@ if (this.a == 1) { @>
NO WAY
<@ } else if (this.a == 114514) { @>
Ohh right way
<@ } @>`, { a: 114514 }))
        .toMatch('Hello World')
})