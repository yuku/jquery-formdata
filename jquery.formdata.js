/*
 * jQuery.formData
 *
 * This program is licensed under the same terms as jQuery project itself.
 *
 * https://github.com/yuku-t/jquery-formdata
 */
$.fn.formData = function () {

    'use strict';

    function find(array, iter) {
        for (var i = 0; i < array.length; i++) if (iter(array[i])) {
            return array[i];
        }
    }

    // Recursive name attribute parser.
    function parse(parts, currRef, value) {
        var nextRef, currPart, nextPart, first;
        currPart = parts.shift();
        nextPart = parts[0];

        if (currPart === '') {
            // currRef is an array.
            if (nextPart == null) {
                return currRef.push(value);
            } else if (nextPart === '') {
                throw "name contains '[][]'";
            } else {
                nextRef = find(currRef, function (ref) {
                    return !ref.hasOwnProperty(nextPart);
                });
                if (nextRef == null) {
                    nextRef = {};
                    currRef.push(nextRef);
                }
            }
        } else {
            // currRef is an object.
            if (nextPart == null) {
                return currRef[currPart] = value;
            } else if (nextPart === '') {
                currRef[currPart] || (currRef[currPart] = []);
            } else {
                currRef[currPart] || (currRef[currPart] = {});
            }
            nextRef = currRef[currPart];
        }
        parse(parts, nextRef, value);
    }

    var i, arr, name, value, parts,
        data = this.serializeArray(),
        name_reg = /(\w+)|\[(\w*)\]/g,
        params = {};

    // Parse each input elements
    for (i = 0; i < data.length; i++) {
        name = data[i].name;
        value = data[i].value;
        parts = [];

        while (true) {
            arr = name_reg.exec(name);
            if (!arr) break;
            parts.push(arr[1] || arr[2]);
        }

        parse(parts, params, value);
    }
    return params;
};
