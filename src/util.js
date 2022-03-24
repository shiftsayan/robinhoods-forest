const range = (n, f = (i) => i) => {
    return Array.from({length: n}, (_, i) => f(i));
}

function get(object, key, default_value={}) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}

function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100
}

export { range, get, roundToTwoDecimals }