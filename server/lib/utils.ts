// 判断url里是否包含语言前缀
function urlHasLocale(url: string): boolean {
    return url.startsWith('/en');
}

// 去除url里包含的语言前缀
function urlWithoutLocale(url: string): string {
    let result: string = url;
    if (urlHasLocale(url)) {
        result = url.substring(3, url.length);
    }
    return result;
}

export default urlWithoutLocale;
