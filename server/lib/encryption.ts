const crypto = require('crypto')
const secretKey = Buffer.from('qwert12345qwert1', 'utf8')
const iv = Buffer.from('qwert12345qwert1', 'utf8')
// const iv2 = Buffer.from("abcdeabcdeabcdea", "utf8");
const algorithm: string = 'aes-128-cbc'

function encode(id: string): string {
    const encoder = crypto.createCipheriv(algorithm, secretKey, iv)
    const str = [id, Date.now(), 'qwert'].join('|')
    let encryptedStr = encoder.update(str, 'utf8', 'hex')
    encryptedStr = encryptedStr + encoder.final('hex')
    return encryptedStr
}

function encodeWithoutDate(str: string): string {
    const encoder = crypto.createCipheriv(algorithm, secretKey, iv)
    let encryptedStr = encoder.update(str, 'utf8', 'hex')
    encryptedStr = encryptedStr + encoder.final('hex')
    return encryptedStr
}

function decodeWithoutDate(encryptedStr: string): string {
    const decoder = crypto.createDecipheriv(algorithm, secretKey, iv)
    let decodedStr = decoder.update(encryptedStr, 'hex', 'utf8')
    decodedStr = decodedStr + decoder.final('utf8')
    return decodedStr
}

function decode(encryptedStr: string): any {
    const decoder = crypto.createDecipheriv(algorithm, secretKey, iv)
    let decodedStr = decoder.update(encryptedStr, 'hex', 'utf8')
    decodedStr = decodedStr + decoder.final('utf8')
    const decodedArr = decodedStr.split('|')
    return {
        id: decodedArr[0],
        timespan: parseInt(decodedArr[1])
    }
}

export {
    encode,
    encodeWithoutDate,
    decode,
    decodeWithoutDate
}
