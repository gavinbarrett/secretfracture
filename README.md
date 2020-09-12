# Description
SecretFracture is a threshold secret sharing scheme. This is a cryptographic protocol that will split an ASCII plaintext message into a set of *n* shares that can be recovered by providing an arbitrary set of *k* shares. This technique was invented by Israeli cryptographer Adi Shamir; you may read more about this simple and elegant system in his seminal paper [How to Share a Secret](https://cs.jhu.edu/~sdoshi/crypto/papers/shamirturing.pdf).

![](https://github.com/gavinbarrett/secretfracture/workflows/Recovery%20Test/badge.svg)

# WARNING: This project should not be used in production.
## I have only minimal experience in writing cryptographic code and this package is yet to be reviewed by cryptanalysts and security researchers.

# Installing and Importing
## Install
Install the package in your dependencies by running:
```bash
npm i secretfracture --save
```
## Import
Import the core functions into your file by typing:
```javascript
const {share, recover} = require('secretfracture');
```

# Usage:
Again, __DON'T__.
At least not for anything that could potentially be compromised.

## Example of a 3/5 sharing scheme
```javascript
const {share, recover} = require('secretfracture');

// split the secret into 5 shares, requiring any 3 to recover
const [indices, shares] = share(5, 3, "th15_15_@_53cr37");

console.log(indices, shares);

// recover the secret from the shares
const secret = recover(indices, shares);

console.log(secret);
```

The output will be something similar to:
```bash
[ 1, 2, 3, 4, 5 ] [
  '61872a3bd9080624c46c4f78a7bbcbza',
  '7b0868bd1712af33dda401bdcc263d94',
  'c2edebba1b4f2e8c8b064c01d2b58bf5',
  '3533b232e5bf852ecf942f46b966b421',
  'd6ddbe267361b31aa84cab8b813ab81a'
]
th15_15_@_53cr37
```

## Encoding system
Secret Fracture works by splitting every byte of the ascii plaintext into its own set of shares. The hexadecimal you see output as shares is slightly different from regular hexadecimal. Normally, we can only store bytes with values ranging from 0-255. Since each byte in our secret sharing scheme occurs within a finite field of size 257, we have two values that cannot be represented in hexadecimal. Subsequently, I devised a small convention in which the values 256 and 257 are represented by the pseudo-hex bytes za and zb, respectively. Aside from these two values, the rest of the output shares are interpretable as standard hexadecimal.
