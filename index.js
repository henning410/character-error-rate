/**
 * Copyright (c) 2022 Henning Weise
 * Thanks to Milot Mirdita for method to calculate the levenshtein distance.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
 */

/**
 * Calculate the Character Error Rate between to strings.
 * @param {string} reference - Reference text.
 * @param {string} transcription - Text to compare with.
 * @param {boolean} withPunctuation - True when punctuation should be considered for calculation, otherwise false.
 * @param {boolean} withCapitalization - True when capitalization should be considered for calculation, otherwise false..
 * @return {number} - returns the character error rate
 */
function calcCER(reference, transcription, withPunctuation, withCapitalization) {
    const distance = levenshteinDistance(reference, transcription, withPunctuation, withCapitalization);
    return distance / reference.length;
}

 /**
 * Calculate the levenshtein distance between two strings.
 * @param {string} reference - Reference text.
 * @param {string} transcription - Text to compare with.
 * @param {boolean} withPunctuation - True when punctuation should be considered for calculation, otherwise false.
 * @param {boolean} withCapitalization - True when capitalization should be considered for calculation, otherwise false..
 */
function levenshteinDistance(reference, transcription, withPunctuation, withCapitalization) {
    reference = reference.replace(/[\/#$%\^&\*;:{}=\-_`~()"']/g, "");
    if (!reference.length) return transcription.length;
    if (!transcription.length) return reference.length;
    if (!withPunctuation) {
        // delete all punctuation symbols like ?,.-;!.
        reference = reference.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        transcription = transcription.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    }
    if (!withCapitalization) {
        reference = reference.toLowerCase();
        transcription = transcription.toLowerCase();
    }
    // swap to save some memory O(min(a,b)) instead of O(a)
    if (reference.length > transcription.length) {
        var tmp = reference;
        reference = transcription;
        transcription = tmp;
    }

    var row = [];
    // init the row
    for (var i = 0; i <= reference.length; i++) {
        row[i] = i;
    }
    // fill in the rest
    for (var i = 1; i <= transcription.length; i++) {
        var prev = i;
        for (var j = 1; j <= reference.length; j++) {
            var val;
            if (transcription.charAt(i - 1) == reference.charAt(j - 1)) {
                val = row[j - 1]; // match
            } else {
                val = Math.min(row[j - 1] + 1, // substitution
                    prev + 1,     // insertion
                    row[j] + 1);  // deletion
            }
            row[j - 1] = prev;
            prev = val;
        }
        row[reference.length] = prev;
    }

    return row[reference.length];
}

module.exports = calcCER;