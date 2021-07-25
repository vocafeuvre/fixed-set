const Benchmark = require('benchmark')
const FixedSet = require('./index')

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')

console.log('Benchmark of FixedSet vs Set vs object\n\n')

const TEST_COUNT = 100

console.log('Generating ' + TEST_COUNT + ' test values...')
const TEST_VALUES = (new Array(TEST_COUNT).fill('')).map(function () {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2
    })
})

console.log('Initializing benchmark...')
var suite = new Benchmark.Suite;

var fixedSet = new FixedSet(...TEST_VALUES)
var realSet = new Set(...TEST_VALUES)
var obj = {}

// needle, assume worst-case
var needle = TEST_VALUES[TEST_VALUES.length - 1]

TEST_VALUES.forEach(function (value) {
    obj[value] = 1
})

console.log('Running benchmark...\n\n')
// add tests
suite
.add('Set#has', function() {
    realSet.has(needle)
})
.add('object', function() {
    obj[needle]
})
.add('FixedSet#has', function() {
    fixedSet.has(needle)
})
// add listeners
.on('cycle', function(event) {
    console.log(String(event.target))
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
})
// run async
.run({ 'async': false })
    