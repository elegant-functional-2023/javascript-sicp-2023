// 2.80
const isZero = (x) => applyGeneric('isZero', x);

put('isZero', 'number', (x) => numer(x) === 0);
put('isZero', 'rational', (x) => rational(x) === 0);
put('isZero', 'complex', (x) => complex(x) === 0);


