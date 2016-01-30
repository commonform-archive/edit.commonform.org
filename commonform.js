module.exports = function(CodeMirror) {
  CodeMirror.defineMode('commonform', function(cmCfg, modeCfg) {

    var tokenTypes = {
      heading: 'header',
      comment: 'comment',
      definition: 'keyword',
      blank: 'tag',
      reference: 'link',
      term: 'string' }

    CodeMirror.defineMIME('text/x-commonform', 'commonform') }) }
