// 2.80
const isZero = (x) => applyGeneric('isZero', x);

put('isZero', 'number', (x) => numer(x) === 0);
put('isZero', 'rational', (x) => rational(x) === 0);
put('isZero', 'complex', (x) => complex(x) === 0);
// 2.87
const isZeroPoly = (poly) => {
    const areTermsZero = (termList) => {
        if (isEmptyTermList(termList)) {
            return true;
        } else {
            return isZero(coeff(firstTerm(termList))) &&
                areTermsZero(restTerms(termList));
        }
    };
    return areTermsZero(termList(poly));
};
const isZeroPoly2 = (p) => isEmptyTermList(termList(p));
put('isZero', 'polynomial', isZeroPoly);

