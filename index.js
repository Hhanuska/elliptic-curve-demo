const Curve = require('./app/curve');
const Coord = require('./app/coord');
const { mod, mulInverse, decimal2binary } = require('./app/utils');
const sha256 = require('crypto-js/sha256');

let p = 0;

const ec = new Curve(-2, 15, 23, 4);
console.log(ec.generator);

const Alice = {
    secret: 3,
    public: ec.doubleAndAdd(3, ec.generator)
}

console.log('Alice pk:', Alice.public);     // 13, 22

// const msg = 'hello'
const z = 10; // msg hash digest
// const z = parseInt(sha256(msg).toString())

// Sign
const k = 19;   // ec.randK();

const R = ec.doubleAndAdd(k, ec.generator);  // 9, 17
console.log(++p + '.', R);
const r = R.x;

const k_mulInv = mulInverse(k, ec.order);
const s = mod(k_mulInv * (z + Alice.secret * r), ec.order);  // 8
console.log(++p + '.', 'Signature:', r, s);
console.log();

// Verify
const w = mulInverse(s, ec.order);
const u1 = mod(w * z, ec.order);
const u2 = mod(w * r, ec.order);
console.log(++p + '.', 'Helpers:', w, u1, u2);  // 3, 7, 4

temp1 = ec.doubleAndAdd(u1, ec.generator);  // 17, 8
temp2 = ec.doubleAndAdd(u2, Alice.public);  // 10, 12
console.log(++p + '.', 'temps:', temp1, temp2);

const P = ec.add(temp2, temp1);             // 9, 17

console.log(++p + '.', P);

console.log(++p + '.', P.x === mod(r, ec.order));

