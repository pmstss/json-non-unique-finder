# json-non-unique-finder

Trivial nodejs utility for finding non-unique keys in array serialized to JSON file. Comparison is done over serialized element string.

## Installation
```sh
$ npm install git+https://github.com/pmstss/json-non-unique-finder.git
```

## Usage
### Command line

```sh
$ git clone https://github.com/pmstss/json-non-unique-finder
$ cd json-non-unique-finder
$ npm install
$ grunt
$ node usage.js test.json
```

Sample output:

```sh
number of non-unique elements: 3, total elements: 10
```

### API

```js
require('json-non-unique-finder').getNonUniqueElements(file)
// return value - promise with following data: 
// {
//     nonUnique: [array of non unique keys],
//     all: [original array]
// }
```

See [usage.js](usage.js)

### Version
0.1.0

License
----
MIT