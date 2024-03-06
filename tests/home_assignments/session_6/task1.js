function handleResponse(statusCode, response) {
    var returnValue;
    switch (statusCode) {
        case 200:
            returnValue = response;
            break;
        case 404:
            returnValue = null;
            break;
        case 500:
            returnValue = "Error";
            break;
        default:
            returnValue = response;
            break;
    }
    return returnValue;
}
var responseObject = {
    "result": "Operate successfully"
};
console.log(handleResponse(200, responseObject));
console.log(handleResponse(404, responseObject));
console.log(handleResponse(500, responseObject));
