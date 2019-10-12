// 判断url里是否包含语言前缀
function urlHasLocale(url) {
    return url.startsWith('/en')
}

// 去除url里包含的语言前缀
function urlWithoutLocale(url) {
    let result = url
    if (urlHasLocale(url)) {
        result = url.substring(3, url.length)
    }
    return result
}

module.exports = { urlWithoutLocale }
