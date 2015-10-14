var fs = require('fs');
var util = require('util');
var RSVP = require('rsvp');

module.exports = (function () {
    'use strict';

    function checkIsFile(file) {
        try {
            return fs.lstatSync(file).isFile();
        } catch (e) {
            return false;
        }
    }

    function deserializeJsonFile(file) {
        return new RSVP.Promise(function (resolve, reject) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    reject(util.format('Error reading file %s: %s', file, err));
                }

                var parsed;
                try {
                    parsed = JSON.parse(data);
                } catch (e) {
                    reject(util.format('Invalid json in file %s: %s', file, e));
                }

                resolve(parsed);
            });
        });
    }

    return {
        getNonUniqueElements: function (file) {
            if (!checkIsFile(file)) {
                return new RSVP.Promise(function (resolve, reject) {
                    reject(util.format('Invalid file: %s', file));
                });
            }

            return deserializeJsonFile(file).then(function (data) {
                if (!(data instanceof Array)) {
                    return new RSVP.Promise(function (resolve, reject) {
                        reject(util.format('Not an array inside JSON file: %s', file));
                    });
                }

                var unique = {};
                var nonUnique = data.filter(function (el) {
                    var serializedEl = JSON.stringify(el);
                    if (unique[serializedEl]) {
                        return true;
                    } else {
                        unique[serializedEl] = true;
                        return false;
                    }
                });

                return new RSVP.Promise(function (resolve) {
                    resolve({
                        nonUnique: nonUnique,
                        all: data
                    });
                });
            });
        }
    };
})();