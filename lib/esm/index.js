"use strict";
/**
 * ************************************
 *   Digital Signature Authentication
 * ************************************
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

let dsaConfig = {
	alg: 'rsa',
	modulusLength: 4096,
	storageLocalPath: null,
	saveToStorage: (keyName, key) => {
		try {
			fs.writeFileSync(path.join(dsaConfig.storageLocalPath, keyName), key);
		} catch (err) {
			console.error('Failed to save key:', err);
		}
	},
	getFromStorage: (keyName) => {
		try {
			return fs.readFileSync(path.join(dsaConfig.storageLocalPath, keyName), 'utf8');
		} catch (err) {
			console.error('Failed to read key:', err);
			return null;
		}
	}
};

const dsa = {
	/**
	 * Initialize the DSA configuration
	 * @param {Object} config - Configuration object
	 * @param {number} [config.modulusLength=4096] - Key length
	 * @param {string} [config.storageLocalPath=null] - Path to store keys
	 * @param {Function} [config.saveToStorage=dsaConfig.saveToStorage] - Function to save keys to storage
	 * @param {Function} [config.getFromStorage=dsaConfig.getFromStorage] - Function to get keys from storage
	 */
	init: (config = {
		modulusLength: dsaConfig.modulusLength,
		storageLocalPath: dsaConfig.storageLocalPath,
		saveToStorage: dsaConfig.saveToStorage,
		getFromStorage: dsaConfig.getFromStorage
	}) => {
		dsaConfig = { ...dsaConfig, ...config };
	},

	/**
	 * Generate public and private keys
	 * @param {string} keyName - Base name for the keys
	 * @param {Object} [options] - Options object
	 * @param {number} [options.modulusLength=4096] - Key length
	 * @returns {Object} - Contains publicKey and privateKey
	 */
	generateKeys: (keyName, options = {
		modulusLength: 4096
	}) => {
		try {
			const modulusLength = options.modulusLength || dsaConfig.modulusLength;
			const { publicKey, privateKey } = crypto.generateKeyPairSync(dsaConfig.alg, {
				modulusLength: modulusLength,
				publicKeyEncoding: {
					type: 'pkcs1',
					format: 'pem'
				},
				privateKeyEncoding: {
					type: 'pkcs1',
					format: 'pem'
				}
			});

			dsaConfig.saveToStorage(`${keyName}_public`, publicKey);
			dsaConfig.saveToStorage(`${keyName}_private`, privateKey);

			return { publicKey, privateKey };
		} catch (error) {
			console.error('Failed to generate keys:', error);
			throw error;
		}
	},

	/**
	 * Create a digital signature
	 * @param {string} data - Data to sign
	 * @param {string} privateKey - Private key for signing
	 * @returns {string} - Base64 encoded signature
	 */
	createSign: (data, privateKey) => {
		try {
			const sign = crypto.createSign('RSA-SHA256');
			sign.update(data);
			return sign.sign(privateKey, "base64");
		} catch (error) {
			console.error('Failed to create signature:', error);
			throw error;
		}
	},

	/**
	 * Verify a digital signature
	 * @param {Object} verifyData - Data object containing the signature and the original data
	 * @param {string} verifyData.signature - Base64 encoded signature
	 * @param {string} verifyData.data - Original data
	 * @param {string} publicKey - Public key for verification
	 * @returns {boolean} - Verification result
	 */
	verifySign: (verifyData = { signature, data }, publicKey) => {
		try {
			const verify = crypto.createVerify('RSA-SHA256');
			verify.update(verifyData.data);
			return verify.verify(publicKey, verifyData.signature, 'base64');
		} catch (error) {
			console.error('Failed to verify signature:', error);
			throw error;
		}
	},

	saveToStorage: dsaConfig.saveToStorage,
	getFromStorage: dsaConfig.getFromStorage
};

export default dsa;
