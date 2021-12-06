const Curve = require('./app/curve');
const Coord = require('./app/coord');
const { mod, mulInverse, decimal2binary } = require('./app/utils');
const sha256 = require('crypto-js/sha256');

let p = 0;

const ec = new Curve(-2, 15, 23, 4);
// console.log(ec.generator);

const Alice = {
    secret: 3,
    public: ec.doubleAndAdd(3, ec.generator)
}

console.log('Alice pk:', Alice.public);

// const msg = 'hello'
const z = 10; // msg hash digest
// const z = parseInt(sha256(msg).toString())

// Sign
const k = ec.randK();

const R = ec.doubleAndAdd(k, ec.generator); 
console.log(++p + '.', R);
const r = R.x;

const k_mulInv = mulInverse(k, ec.order);
const s = mod(k_mulInv * (z + Alice.secret * r), ec.order);
console.log(++p + '.', 'Signature:', r, s);
console.log();

// Verify
const w = mulInverse(s, ec.order);
const u1 = mod(w * z, ec.order);
const u2 = mod(w * r, ec.order);
console.log(++p + '.', 'Helpers:', w, u1, u2);

temp1 = ec.doubleAndAdd(u1, ec.generator);
temp2 = ec.doubleAndAdd(u2, Alice.public);
console.log(++p + '.', 'temps:', temp1, temp2);

const P = ec.add(temp1, temp2);

console.log(++p + '.', P);

console.log(++p + '.', 'Signature is valid:', P.x === mod(r, ec.order));

