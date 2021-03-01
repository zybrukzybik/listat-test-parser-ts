import assert from 'assert'

//  CLEANERS
function cleanSpaces(arr: Array<string>): Array<string> {
    return arr.map(str => {
        return str.replace(/ /g, '')
    })
}

//  RegEX-s
const validSymbolsRe: RegExp = /[+\-*/()]|\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000)\b/g
const leftParsRe: RegExp = /\(/g
const rightParsRe: RegExp = /\)/g
const parsReg: RegExp = /\(([0-9+\-*/]+)\)/
const invalidOpRe: RegExp = /(\*){2,}|(\/){2,}|(\+){2,}|(-){2,}/
const invalidOrderOpRe: RegExp = /\+[-*/]|-[+*/]|\*[+-/]|\/[+\-*]|\d\(|\)\d|\(\)/

//  MATCHERS
function numOpNum(operator: string): RegExp {
    return new RegExp(`(?<=\\D|)-?\\d+[${operator}]-?\\d+`)
}

function elAhead(str: string, operator: string): Array<string> {
    return str.match(new RegExp(`(?<=\\D|)-?\\d+(?=[${operator}])`))
}

function elBehind(str: string, operator: string): Array<string> {
    return str.match(new RegExp(`(?<=\\d+[${operator}])-?\\d+`))
}

//  ASSERTS
function assertValidSymbols(str: string): void {
    const filtered: Array<string> = str.match(validSymbolsRe)

    assert(filtered, 'invalid')
    assert(str === filtered.join(''), 'invalid')
}

function assertInvalidParentheses(str: string): void {
    const leftPars = str.match(leftParsRe)
    const rightPars = str.match(rightParsRe)

    if (leftPars && rightPars) {
        assert(leftPars.length === rightPars.length, 'invalid')
    }
}

function assertInvalidOp(str: string): void {
    assert(!str.match(invalidOpRe), 'invalid')
}

function assertInvalidOrdersOp(str: string): void {
    assert(!str.match(invalidOrderOpRe), 'invalid')
}

function assertions(arr: Array<string>, ...assertions: Array<Function>): void {
    arr.forEach((str: string) => {
        assertions.forEach((fn: Function) => {
            fn(str)
        })
    })
}

//  CALCULATIONS
const OPERATORS: Array<string> = ['*', '/', '+', '-']

interface OPS {
    '*': Function,
    '/': Function,
    '+': Function,
    '-': Function
}

const ops: OPS = {
    '*': (a: string, b: string): number => Number(a) * Number(b),
    '/': (a: string, b: string): number => Number(a) / Number(b),
    '+': (a: string, b: string): number => Number(a) + Number(b),
    '-': (a: string, b: string): number => Number(a) - Number(b)
}

function operation(a: string, b: string, ops: Object, op: string): number {
    return ops[op](a, b)
}

function calculator(str: string): string {
    function index(str: string, operator: string, i: number = 1): number {
        return str.indexOf(operator, i)
    }

    function calc(str: string, operator: string): string {
        const idx: number = index(str, operator)

        if (idx === -1) return str

        const ahead: string = elAhead(str, operator)[0]
        const behind: string = elBehind(str, operator)[0]

        str = str.replace(numOpNum(operator), operation(ahead, behind, ops, operator).toString())
        return calc(str, operator)
    }

    OPERATORS.forEach((operator: string): void => {
        str = calc(str, operator)
    })

    return str
}

function calcParentheses(arr: Array<string>): Array<string> {
    function data(match: string, p1: string): string {
        return calculator(p1)
    }

    function replacer(str: string): string {
        if (str.match(parsReg)) {
            str = str.replace(parsReg, data)
            return replacer(str)
        } else {
            return str
        }
    }

    return arr.map(replacer)
}

function calcNumbers(arr: Array<string>): Array<number> {
    return arr.map((str: string): number => Number(calculator(str)))
}

function parser(arr: Array<string>): Array<number> {
    arr = cleanSpaces(arr)

    assertions(arr, assertValidSymbols, assertInvalidParentheses, assertInvalidOp, assertInvalidOrdersOp)

    arr = calcParentheses(arr)

    return calcNumbers(arr)
}

export default parser


