(function () {
  "use strict";

  // msg is a message of any size
  // len is between 160 - 5 `(x/y)` and 160 - 9 `(xx/yy): `
  function splitOnWordBoundary(msg, len) {
    var chars = msg.split('')
      , i
        // "(x/y)".length // 5 should be enough, normally
        // "(xx/yy)".length // 7 is extremely safe
      , bodies = []
      , subchars
      , MAX_WORD_LEN = 28
      , minLen = len - MAX_WORD_LEN
      ;

    function push(len) {
      subchars = chars.splice(0, len).join('');
      if (subchars) {
        bodies.push(subchars);
      }
    }

    // TODO try to split on a word boundary
    while (chars.length) {
      // remove leading space
      // (trailing space is okay though)
      while (' ' === chars[0]) {
        chars.splice(0, 1);
      }

      // the character after the last is a non-word character (or null)
      if (chars.length <= len || /\W/.test(chars[len])) {
        push(len);
        continue;
      }

      // there are legitimate english words up to 28 characters long
      // http://www.morewords.com/wordsbylength/
      // #AndPerhapsMoreCommonlyThisKindOfCrap
      for (i = len; i > minLen; i -= 1) {
        if (/\W/.test(chars[i])) {
          break;
        }
      }

      push(i);
    }

    return bodies;
  }

  module.exports.splitOnWordBoundary = splitOnWordBoundary;
}());
