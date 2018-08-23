// tslint:disable-next-line:no-var-requires
const pluralize = require('pluralize'); // import do not work

export const camelize = (str: string) => {
    if (!str) {
        return str;
    }
    let a = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number) => {
        if (+match === 0) {
            return ''; // or if (/\s+/.test(match)) for white spaces
        }
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
    a = a.replace(/_\w/g, (m: string) => {
        return m[1].toUpperCase();
    });
    return a;
};

export const capitalize = (s: string) => {
    s = camelize(s);
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const toUnderscore = (input: string) => {
    return input.replace(/([A-Z])/g, $1 => '_' + $1.toLowerCase());
};

export const plural = (s: string) => {
    return pluralize.plural(s);
};