const crypto = require('crypto');
const mod = require('./number').mod;
const return_hex = require('./number').return_hex;

const pad = (str) => {
	/* pad a binary string to a multiple of eight */
    let n = str.length % 8;
    if (n == 0)
        return str;
    let z = "0";
    let newStr = z.repeat((8 - n)) + str;
    return newStr;
}

const encode_secret = (secret) => {
	/* encode secret into an integer */
    let s = "";
    for (let i = 0; i < secret.length; i++) {
        let x = secret[i].charCodeAt(0).toString(2);
		let y = parseInt(x, 2);
        y = String.fromCharCode(y);
		s += pad(secret[i].charCodeAt(0).toString(2));
	}
    return parseInt(s, 2);
}

const split_secret = (n, k, field, coeffs, secret) => {
	/* generate shares from all of the coefficients  */
	let shares = [];
	let s = 0;
	for (let i = 0; i < n; i++) {
		s = horners(i+1, k, field, coeffs, secret);
		shares.push(s);
	}
	return shares;
}

const horners = (x, k, field, poly, secret) => {
	/* evaluate polynomial with horner's method */
	let result = poly[0];
	for (let i = 1; i < k; i++)
		result = mod(mod(result * x, field) + poly[i], field);
	return result;
}

const mod_field = (number) => {
	/* keep the number within our field */
	return number % 257;
}

const gen_coeff = (k, field) => {
	/* generate cryptographically secure coefficients */
	return [...crypto.randomBytes(k-1)];
}

const share = (n, k, plaintext) => {
	/* return shares for the plaintext */
	if (k > n) {
		console.error('Your threshold is too large.');
		return;
	}
	let s = [""];
	let field = 257;
	for (let i = 0; i < plaintext.length; i++) {
		let x = encode_secret(plaintext[i]);
		let coeffs = gen_coeff(k, field);
		coeffs.unshift(x);
		let shares = split_secret(n,k,field,coeffs.reverse(),x);
		for (let j = 0; j < shares.length; j++) {
			if (s[j] == undefined)
				s[j] = "";
			let share = parseInt(shares[j], 10);
			s[j] += return_hex(share);
		}
	}
	const num_shares = [...Array(n), (_, index) => index + 1]; 
	return [num_shares, s];
}

exports.share = share;
