function handleResponse(statusCode:number,response:object){
    type returnType = object | null | "Error"
    let returnValue:returnType;
    switch(statusCode){
        case 200:
            returnValue = response;
            break;
        case 404:
            returnValue = null;
            break;
        case 500:
            returnValue="Error";
            break;
        default:
            returnValue=response;
            break;
    }
    return returnValue;
}

let responseObject={
    "result":"Operate successfully"
}

console.log(handleResponse(200,responseObject));
console.log(handleResponse(404,responseObject));
console.log(handleResponse(500,responseObject));

let numbers:Number[]=[1,2,3]

let t = (x,y)=>{return x+y}