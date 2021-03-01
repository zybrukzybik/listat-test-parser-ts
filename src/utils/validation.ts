function isArr(arr: Array<any>): Boolean {
    return (Array.isArray(arr))
}

function isEmptyArr(arr: Array<any>): Boolean {
    return (arr.length === 0)
}

function isObj(obj: Object): Boolean {
    return ((obj === null) || (Array.isArray(obj)) || typeof obj == 'function') ? false : (typeof obj == 'object')
}

function isEmptyObj(obj: Object): Boolean {
    return (Object.keys(obj).length === 0)
}

function isArrWithOneEmptyEl(arr: Array<any>): Boolean {
    const elem: string = arr[0].replace(/ /g, '')
    return (arr.length === 1 && elem === '')
}

export {
    isArr,
    isEmptyArr,
    isObj,
    isEmptyObj,
    isArrWithOneEmptyEl
}