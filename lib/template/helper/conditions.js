

let ConditionsHelper = {
    eq: function (left, right) {
        return left === right;
    },
    ne: function (left, right) {
        return left !== right;
    },
    lt: function (left, right) {
        return left < right;
    },
    gt: function (left, right) {
        return left > right;
    },
    lte: function (left, right) {
        return left <= right;
    },
    gte: function (left, right) {
        return left >= right;
    },
    and: function (left, right) {
        return left && right;
    },
    or: function (left, right) {
        return left || right;
    }
};

module.exports = ConditionsHelper;
