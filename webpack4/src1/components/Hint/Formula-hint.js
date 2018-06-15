import { debug } from "util";
import { formulaKeywords } from './Formulas';

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../../node_modules/codemirror/lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../../node_modules/codemirror/lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  var Pos = CodeMirror.Pos;
  function forEach(arr, f) {
    for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
  }
  function arrayContains(arr, item) {
    if (!Array.prototype.indexOf) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === item) {
          return true;
        }
      }
      return false;
    }
    return arr.indexOf(item) != -1;
  }

  function scriptHint(editor, keywords, getToken, options) {
    // Find the token at the cursor
    var cur = editor.getCursor(), token = getToken(editor, cur);
    return {
      list: getCompletions(token, keywords, options),
      from: Pos(cur.line, token.start),
      to: Pos(cur.line, token.end)
    };
  }
  function formulatHint(editor, options) {
    return scriptHint(editor, /*CodeMirror.*/formulaKeywords,
      function (e, cur) { return e.getTokenAt(cur); },
      options);
  };
  CodeMirror.registerHelper("hint", "formula", formulatHint);
  function getCompletions(token, keywords, options) {
    var found = [], start = token.string;
    function maybeAdd(str) {
      if (start.trim() != '' && (str.lastIndexOf(start, 0) == 0 || str.lastIndexOf(start.toUpperCase(), 0) == 0) && (start != str) && !arrayContains(found, str.toUpperCase())) {
        found.push(str);
      }
    }
    forEach(keywords, maybeAdd);
    return found;
  }
});
