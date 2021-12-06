/**
 * Built-in modulo doesn't work on negative numbers
 * -28 % 23 = -5, it should be 18
 * @param {Number} n number
 * @param {Number} m modulo
 */
exports.mod = (n, m) => {
    return ((n % m) + m) % m;
}

exports.mulInverse = (num, order) => {
    for (let i = 1; i < order; i++) {
        if (exports.mod((num * i),  order) === 1) {
            return i;
        }
    }

    return null;
}

exports.decimal2binary = (number) => {
    return (number >>> 0).toString(2);
}

exports.sqrt = (num, order) => {
    for (let i = 0; i < order; i++) {
        if ((i ** 2) % order == num) {
            return i;
        }
    }
}
