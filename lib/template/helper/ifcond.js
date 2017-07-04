var IfCond = function () {};

IfCond.prototype.name = 'ifcond';
IfCond.prototype.func = (left, operator, right, options) => {
    switch (operator) {
    case '==':
        return (left == right) ? options.fn(this) : options.inverse(this);
    case '===':
        return (left === right) ? options.fn(this) : options.inverse(this);
    case '!=':
        return (left != right) ? options.fn(this) : options.inverse(this);
    case '!==':
        return (left !== right) ? options.fn(this) : options.inverse(this);
    case '<':
        return (left < right) ? options.fn(this) : options.inverse(this);
    case '<=':
        return (left <= right) ? options.fn(this) : options.inverse(this);
    case '>':
        return (left > right) ? options.fn(this) : options.inverse(this);
    case '>=':
        return (left >= right) ? options.fn(this) : options.inverse(this);
    case '&&':
        return (left && right) ? options.fn(this) : options.inverse(this);
    case '||':
        return (left || right) ? options.fn(this) : options.inverse(this);
    default:
        return options.inverse(this);
    }
};

module.exports = new IfCond();
