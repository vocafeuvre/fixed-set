;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory)
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory()
    } else {
        // Browser globals
        root.loki = factory()
    }
}(this, function () {
    const MAX_SIZE = 1000 // max number of held values before performance starts to drop

    function FixedSet(...values) {
        var size = values.length
        
        if (size > MAX_SIZE) {
            throw new Error('FixedSet can only hold up to ' + MAX_SIZE + ' values.')
        }

        this.size = size

        var args = [], body = 'return function(a){switch(a){'

        for (let x = 0; x < size; x++) {
            args[x] = ('v' + x)
            body += ('case v' + x + ':')
        }

        body += 'return true;default:return false;}}'

        args.push(body)

        this._maker = new Function(...args)
        this._evaluator = this._maker(...values)
    };

    FixedSet.prototype.has = function (value) {
        return this._evaluator(value)
    }

    FixedSet.prototype.MAX_SIZE = MAX_SIZE
    FixedSet.MAX_SIZE = MAX_SIZE

    return FixedSet
}));