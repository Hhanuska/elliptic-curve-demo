const Coord = require('./coord');
const { mod, mulInverse, decimal2binary, sqrt } = require('./utils');

class EC {
    constructor(a, b, order, generatorX) {
        this.a = a;
        this.b = b;
        this.order = order;
        this.generator = new Coord(generatorX, this.getY(generatorX));
    }

    getY(x) {
        return sqrt((Math.pow(x, 3) + this.a*x + this.b) % this.order, this.order);
    }

    isOnCurve(P) {
        const leftSide = (P.y ** 2) % this.order;
        const rightSide = (P.x ** 3 + this.a * P.x + this.b) % this.order;
        return rightSide === leftSide;
    }

    randK() {
        return Math.ceil(Math.random() * (this.order - 1));
    }

    add(P, Q = null) {
        // console.log(`Adding: (${P?.x}, ${P?.y}) + (${Q?.x}, ${Q?.y})`)
        if (P === null) {
            return Q;
        }
        if (Q === null || (P.x == Q.x && P.y == Q.y)) {
            return this._double(P);
        } else {
            return this._add(P, Q);
        }
    }

    _double(P) {
        const R = new Coord();

        const s = mod((3 * (P.x ** 2) + this.a) * (mulInverse(2 * P.y, this.order)), this.order);

        R.x = mod(s ** 2 - 2 * P.x, this.order);
        R.y = mod(s * (P.x - R.x) - P.y, this.order);

        return R;
    }

    _add(P, Q) {
        const R = new Coord();

        const s = mod((Q.y - P.y) * (mulInverse(Q.x - P.x, this.order)), this.order);
    
        R.x = mod(s ** 2 - P.x - Q.x, this.order);
        R.y = mod(s * (P.x - R.x) - P.y, this.order);

        return R;
    }

    multiply(k, P) {
        let result = null;

        for (let i = 0; i < k; i++) {
            result = this.add(result, P);
            console.log('Res:', result)
        }

        return result;
    }

    doubleAndAdd(k, P) {
        const bin = decimal2binary(k).split("").reverse().join("");
        // console.log(bin);
        // console.log('--- Running double-and-add ---')
        // console.log('Params:');
        // console.log(bin, `${k} * (${P.x}, ${P.y})`);

        let result = null;
        let Q = P;

        for (let i = 0; i < bin.length; i++) {
            if (bin[i] == 1) {
                result = this.add(result, Q);
            }
            // console.log('R:', result, result ? this.isOnCurve(result) : '');
            Q = this.add(Q);
            // console.log('Q:', Q, this.isOnCurve(Q));
        }

        return result;
    }
}

module.exports = EC;
