export function finish(string: string, token: string): string {
    return string.endsWith(token) ? string : string + token;
}

export function ucFirst(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
