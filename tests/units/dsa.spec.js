const fs = require('fs');
const path = require('path');
const dsa = require('../../lib/cjs');


describe('Digital Signature Authentication', () => {
	beforeEach(() => {
		fs.mkdirSync(path.join(__dirname, './../tmp'), { recursive: true });
		dsa.init({
			modulusLength: 2048,
			storageLocalPath: path.join(__dirname, './../tmp'),
		});
	});

	afterEach(() => {
		fs.rmdirSync(path.join(__dirname, './../tmp'), { recursive: true });
	});

	describe('generateKeys', () => {
		it('should generate public and private keys', () => {
			const keyName = 'testKey';
			const { publicKey, privateKey } = dsa.generateKeys(keyName);

			const publicKeyBuffer = Buffer.from(publicKey, 'utf-8');
			const privateKeyBuffer = Buffer.from(privateKey, 'utf-8');

			expect(publicKeyBuffer).toBeInstanceOf(Buffer);
			expect(privateKeyBuffer).toBeInstanceOf(Buffer);
		});
	});

	describe('createSign and verifySign', () => {
		it('should create and verify a valid digital signature', () => {
			const keyName = 'testKey';
			const { publicKey, privateKey } = dsa.generateKeys(keyName);

			const dataToSign = 'Hello, world!';
			const signature = dsa.createSign(dataToSign, privateKey);

			// Verify signature
			const isVerified = dsa.verifySign({ signature, data: dataToSign }, publicKey);
			expect(isVerified).toBe(true);
		});

		it('should fail to verify an invalid digital signature', () => {
			const keyName = 'testKey';
			const { publicKey, privateKey } = dsa.generateKeys(keyName);

			const dataToSign = 'Hello, world!';
			const maliciousData = 'Hello, attacker!';

			const signature = dsa.createSign(dataToSign, privateKey);

			// Verify with malicious data
			const isVerified = dsa.verifySign({ signature, data: maliciousData }, publicKey);
			expect(isVerified).toBe(false);
		});
	});
});
