const FixedSet = require('./index')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')

const TEST_COUNT = FixedSet.MAX_SIZE

describe('testing FixedSet', function () {
    var testValues

    beforeEach(function () {
        testValues = (new Array(TEST_COUNT).fill('')).map(function () {
            return uniqueNamesGenerator({
                dictionaries: [adjectives, animals, colors],
                length: 2
            })
        })
    })

    test('return true for a held value', function () {
        var set = new FixedSet(...testValues)

        expect(set.has(testValues[0])).toBe(true)
        expect(set.has(testValues[testValues.length - 1])).toBe(true)
    })

    test('return false for an unheld value', function () {
        var unheldValue = testValues.pop()
        var set = new FixedSet(...testValues)

        expect(set.has(unheldValue)).toBe(false)
    })

    test('throw an error if passed values exceed MAX_SIZE', function () {
        expect(function () {
            testValues = (new Array(FixedSet.MAX_SIZE + 1).fill('')).map(function () {
                return uniqueNamesGenerator({
                    dictionaries: [adjectives, animals, colors],
                    length: 2
                })
            })

            new FixedSet(...testValues)
        }).toThrow()
    })
})