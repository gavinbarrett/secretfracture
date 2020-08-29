const mod = (num, prime) => {
	/* computes the modulus of a number */
	let n = num % prime;
	if (n < 0)
		n = prime + n;
	return n;
}

const egcd = (a,b,x,y) => {
	/* find the greatest common denominator */
	if (a == 0) {
		x = 0;
		y = 1;
		return [b,x,y];
	}
	// returns array of three values
	let [g, x1, y1] = egcd(mod(b,a), a, x, y);
	x = y1 - (Math.floor(b/a)) * x1;
	y = x1;
	return [g,x,y];
}

const mod_inv = (k, prime) => {
	/* return the mod inverse */
	let [g, x, y] = egcd(k, prime, 0, 0);
	if (g != 1) {
		console.log('Cannot compute an inverse!', g);
		return;
	} else
		return mod((mod(x, 257) + prime), 257);
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

const return_hex = (number) => {
	if (number == 257)
		return 'zb';
	else if (number == 256)
		return 'za';
	else {
		let hex = number.toString(16);
		if (hex.length == 1)
			return '0' + hex;
		return hex;
	}
}

exports.mod = mod;
exports.mod_inv = mod_inv;
exports.return_hex = return_hex;
