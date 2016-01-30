var CodeMirror = require('codemirror/lib/codemirror')
require('codemirror/mode/markdown/markdown')
require('codemirror/keymap/sublime')

var fs = require('fs')
var merkle = require('commonform-merkleize')
var parse = require('commonform-markup-parse')
var xhr = require('xhr')

var cm

document.addEventListener('DOMContentLoaded', function() {

  cm = CodeMirror.fromTextArea(
    document.getElementById('editor'),
    { autofocus: true,
      lineWrapping: true,
      lineNumbers: true,
      indentUnit: 4,
      smartIndent: true,
      tabSize: 4,
      indentWithTabs: false,
      undoDepth: 500,
      keyMap: 'sublime',
      theme: 'default' })

  cm
    .getDoc()
    .setValue(
      fs.readFileSync(__dirname + '/start.cform', 'utf8'))

  displayHash()

  cm.on('change', displayHash)

  document
    .getElementById('save')
    .addEventListener('click', save) })

function save() {
  var request = {
    useXDR: true,
    uri: 'https://api.commonform.org/forms',
    method: 'POST',
    body: JSON.stringify(getForm()) }
  xhr(request, function(error, response) {
    if (error) {
      alert(error) }
    else {
      var status = response.statusCode
      if (status === 201 || status === 200) {
        window.open('https://commonform.org/forms/' + computeHash()) }
      else {
        alert(response.statusCode) } } }) }

function displayHash() {
  document.getElementById('hash').innerText = computeHash() }

function computeHash() {
  var form = getForm()
  return ( form ? merkle(form).digest : 'Invalid' ) }

function getForm() {
  var form
  try {
    form = parse(tabsToSpaces(cm.getValue())).form }
  catch (error) {
    return null }
  return form }

function tabsToSpaces(string) {
  return string.replace(/\t/g, '    ') }
