const codes = {
    try: () => 'try{',
    init: () => 'this[Symbol.for("line")]=1;this[Symbol.for("TANPOLATE")]=[];',
    result: () => 'return(this[Symbol.for("TANPOLATE")].join(""));',
    push: (val: string) => `this[Symbol.for("TANPOLATE")].push(${val});`,
    line: () => `this[Symbol.for("line")]++;this[Symbol.for("TANPOLATE")].push('\\n');`,
    catch: () => '}catch(e){throw`line ${this[Symbol.for("line")]}, ${e}`;}'
}

export function tanpolate(template: string, data?: Data, options?: Partial<Options>): string {
    const 
        vals = options?.varStart ?? '<{', 
        vale = options?.varEnd ?? '}>', 
        blos = options?.blockStart ?? '<@', 
        bloe = options?.blockEnd ?? '@>'
    const 
        spliter = new RegExp(`(${vals}.*?${vale}|${blos}.*?${bloe}|\\n)`, 'g'),
        valReg = new RegExp(`${vals}(.*?)${vale}`, 'g'),
        bloReg = new RegExp(`${blos}(.*?)${bloe}`, 'g')
    
    const escaped = (str: string) => 
        str.replace(/(\\*)`/g, (sub, gro: string) => gro.length % 2 == 0 ? `${gro}\\` + '`' : sub)

    const pushstr = (line: string) =>
        code.push(line === '' ? line : codes.push(`\`${escaped(line)}\``))
    const insert = (line: string) =>
        code.push(escaped(line))
    const pushval = (line: string) =>
        code.push(codes.push(escaped(line)))
    
    var code = [codes.try(), codes.init()], 
        match: ReturnType<typeof spliter.exec>

    template.split(spliter).forEach(item => {
        if (!item || item.length === 0) return
        match = valReg.exec(item)
        if (match && match.length === 2) {
            pushval(match[1])
            return
        }
        match = bloReg.exec(item)
        if (match && match.length === 2) {
            insert(match[1])
            return
        }
        if (item === '\n')
            insert(codes.line())
        else
            pushstr(item)
    })

    code.push(codes.result(), codes.catch())
    var final = code.join('\r\n')
    try {
        var func = new Function(final)
        return (func.call(data ?? {}) as string).trim()
    }
    catch (e) { 
        throw { error: e, code: final }
    }
}

type Data = any
type Options = {
    enableBlock: boolean
    varStart: string
    varEnd: string
    blockStart: string
    blockEnd: string
}
