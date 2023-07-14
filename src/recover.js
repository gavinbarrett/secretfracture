const mod = require('./number').mod;
const mod_inv = require('./number').mod_inv;

const evaluate_poly = (x, xi, xs, field) => {
	/* return value of polynomial at zero */
	let numer = 1;
	let denom = 1;
	for (let i = 0; i < xs.length; i++) {
			if (xi == i)
				continue;
			numer = mod(numer * (x - xs[i]), field);
			denom = mod(denom * (xs[xi] - xs[i]), field);
	}
	return mod(numer * mod_inv(denom, field), field);
}

const interpolate = (x, xs, ys, field) => {
	/* return interpolation value for the subsecret */
		let secret = 0;
		for (let i = 0; i < xs.length; i++)
				secret += mod(field + ys[i] * evaluate_poly(x, i, xs, field), field);
		return mod(secret, field);
}

const return_decimal = (hexstring) => {
        /* return value associated with hex byte */
        if (hexstring == 'za')
                return 256;
        else if (hexstring == 'zb')
                return 257;
        else
                return parseInt(hexstring, 16);
}

const process_shares = (a) => {
	/* reorganize shares in a a format we can process */
	// this function's parameter ys is an array of hex strings
    let c = [];
    for (let i = 0; i < a.length; i++) {
        let x = a[i].match(/.{1,2}/g) || [];
        for (let j = 0; j < x.length; j++) {
            if (c[j] == undefined)
            	c[j] = [];
            if (c[j][i] == undefined)
            	c[j][i] = 0;
            c[j][i] = return_decimal(x[j]);
        }
    }
    return c;
}

const recover = (xs, ys) => {
		/* recover the secret */
		const field = 257;
		const shares = process_shares(ys);
		let secret = '';
		for (let i = 0; i < shares.length; i++) {
			let s = interpolate(0, xs, shares[i], field);
			secret += String.fromCharCode(s);
		}
		return secret;
}

exports.recover = recover;
