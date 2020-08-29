const recover = require('../src/recover').recover;

// test 1 inputs
const nums1 = [1,2,3,4,5];
const hf_shares = [
	'86e51413f992062819570dc7f678',
	'7ca9ce1981da81fc15a1aa5e65dc',
	'2ab2987e080390e066463a34b359',
	'91za73418f0f33d50b47bf49dff1',
	'b0925f6314fe6bdb05a4379de9a2'
];

// test 2 inputs
const nums2 = [1,2,3,4,5,6,7,8];
const aad_shares = [
	'd4250501523e2404bd9d8d318aae5b',
	'5e176269715ee63971a72da929681d',
	'ac7664b747e27bf88cc6fd88bbbfb1',
	'886de6095ce0fc370881b28fa4d45e',
	'be28c180376f7ef1e260047e4ac96e',
	'18d4d03960a7191b12ebac1513c029',
	'639bed545e9ee5b096a85f1565dbd9',
	'69aaf2f0b96bf7a6671fd63ea53bc5'
];

const nums3 = [1,2,3,4];
const toof_shares = [
	'6b382a382ea1d0b235ed9a59251b18a2983254',
	'82ffe604f1dd2614ff6dbb63d3d2c3febeza43',
	'99c5a1d1b3187d77c8eedc6d80886d59e4cd32',
	'b08b5c9d7554d4da916efd772d3e17b5099a21'
]

/* Jest tests below */

// test class 1 --> `Hello there` - 3/5 threshold scheme
test('Recovering `Hello, friend.` with 5 shares.', () => {
	expect("Hello, friend.").toBe(recover(nums1, hf_shares));
});
test('Recovering `Hello, friend.` with 4 shares.', () => {
	expect("Hello, friend.").toBe(recover(nums1.slice(1), hf_shares.slice(1)));
});
test('Recovering `Hello, friend.` with 3 shares.', () => {
	expect("Hello, friend.").toBe(recover(nums1.slice(2), hf_shares.slice(2)));
});


// test class 2 --> `Attack at dawn` - 4/8 threshold scheme
test('Recovering `Attack at dawn!` with 8 shares.', () => {
	expect("Attack at dawn!").toBe(recover(nums2, aad_shares));
});
test('Recovering `Attack at dawn!` with 7 shares.', () => {
	expect("Attack at dawn!").toBe(recover(nums2.slice(1), aad_shares.slice(1)));
});
test('Recovering `Attack at dawn!` with 6 shares.', () => {
	expect("Attack at dawn!").toBe(recover(nums2.slice(2), aad_shares.slice(2)));
});
test('Recovering `Attack at dawn!` with 5 shares', () => {
	expect("Attack at dawn!").toBe(recover(nums2.slice(3), aad_shares.slice(3)));
});
test('Recovering `Attack at dawn!` with 4 shares', () => {
	expect("Attack at dawn!").toBe(recover(nums2.slice(4), aad_shares.slice(4)));
});


// test class 3 --> "TrolleyOllyOxenFree" - 2/4 threshold scheme
test('Recovering `TrolleyOllyOxenFree` with 4 shares.', () => {
	expect("TrolleyOllyOxenFree").toBe(recover(nums3, toof_shares));
});
test('Recovering `TrolleyOllyOxenFree` with 3 shares.', () => {
	expect("TrolleyOllyOxenFree").toBe(recover(nums3.slice(1), toof_shares.slice(1)));
});
test('Recovering `TrolleyOllyOxenFree` with 2 shares.', () => {
	expect("TrolleyOllyOxenFree").toBe(recover(nums3.slice(2), toof_shares.slice(2)));
});
