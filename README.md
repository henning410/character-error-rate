# Character-Error-Rate
npm package for calculating the character-error-rate between two strings to evaluate speech recognition quality. 
Complexity of levenshtein distance is being improved from O(m*n) to O(min(m,n)).

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Install the npm-package

```sh
$ npm i character-error-rate
```

## Usage

You can decide if punctuation and capitalization should be considered in the calculation.
```ts
 calcCER(reference: string, transcription: string, withPunctuation: boolean, withCapitalization: boolean));
```

```js
import calcCER from 'character-error-rate';

console.log('CER: ', calcCER('reference text', 'transcription text', true, true));
```

## Authors

* **Henning Weise** - *Initial work* - [GitHub](https://github.com/henning410)
* **Milot Mirdita** - *Levenshtein distance algorithm* - [GitHub](https://github.com/milot-mirdita)

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Henning Weise