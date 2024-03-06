var missingNumber = function (arr) {
    var result;
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] == (arr[i] + 1))
            continue;
        else {
            result = (arr[i] + arr[i + 1]) / 2;
            return result;
        }
    }
    return -1;
};
var newarray = [123, 124, 126, 127, 128, 129, 130, 131, 132];
console.log(missingNumber(newarray));
