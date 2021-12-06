const Curve = require('./app/curve');
const Coord = require('./app/coord');

const ec = new Curve(5, 7, 23);

console.log(ec.add(new Coord(2, 5), new Coord(12, 1)));

console.log(ec.add(new Coord(2, 5)));
