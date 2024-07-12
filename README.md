
<p align="center">
  <br>
	<a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fknfs-jsc%2Fdsa?ref=badge_shield&issueType=license" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fknfs-jsc%2Fdsa.svg?type=shield&issueType=license"/></a>
	<a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fknfs-jsc%2Fdsa?ref=badge_shield&issueType=security" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fknfs-jsc%2Fdsa.svg?type=shield&issueType=security"/></a>
	<a href="https://scrutinizer-ci.com/g/knfs-library/dsa/build-status/master"alt="scrutinizer">
	<img src="https://scrutinizer-ci.com/g/knfs-library/dsa/badges/build.png?b=master" alt="Build Status" /></a>
	<a href="https://scrutinizer-ci.com/g/knfs-library/dsa/?branch=master"alt="scrutinizer">
	<img src="https://scrutinizer-ci.com/g/knfs-library/dsa/badges/quality-score.png?b=master" alt="Scrutinizer Code Quality" /></a>
	<a href="https://github.com/knfs-library/dsa/actions"alt="scrutinizer">
	<a href="https://github.com/knfs-library/dsa/actions/workflows/unit-test.yml" alt="github">
		<img src="https://github.com/knfs-library/dsa/actions/workflows/unit-test.yml/badge.svg" alt="Github " />
	</a>
</p>


<h1> <span style="color:#013C4D;">About</span> <span style="color:#2B7F84;">Digital Signature Authentication</span></h1>

This npm package provides **Digital Signature Authentication** module for various security measures.

## Install

Install the package via npm:

```bash
npm install @knfs-tech/dsa
```

Or via yarn:

```bash
yarn add @knfs-tech/dsa
```

## Usage


```javascript
const { init, generateKeys, createSign, verifySign } = require('@knfs-tech/dsa').dsa;

// Initialize DSA configuration
init({ modulusLength: 4096, storageLocalPath: '/path/to/keys' });

// Generate public and private keys
const { publicKey, privateKey } = generateKeys('example');

// Create a digital signature
const dataToSign = 'Hello, world!';
const signature = createSign(dataToSign, privateKey);

// Verify a digital signature
const verifyData = { data: dataToSign, signature };
const isVerified = verifySign(verifyData, publicKey);

console.log('Signature verified:', isVerified);
```

## License

DSA is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Author
* [Kent Phung](https://github.com/khapu2906)
  
## Owner
* [Knfs.,jsc](https://github.com/knfs-library)



