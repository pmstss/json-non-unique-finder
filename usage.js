var nonUniqueFinder = require('./json-non-unique-finder.js');

var file = process.argv[2] || 'input.json';

(function () {
    'use strict';

    nonUniqueFinder.getNonUniqueElements(file).then(function (res) {
        console.log('number of non-unique elements: %d, total elements: %d', res.nonUnique.length, res.all.length);
    }, function printError(err) {
        console.error(err);
        console.error('\x07');
    });
})();