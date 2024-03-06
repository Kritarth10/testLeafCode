function findMissingNumber(arr:(number)[]):number{
    let result:number;
    for(let i:number=0;i<arr.length-1;i++){
        if(arr[i+1]==(arr[i]+1))
        continue;
        else{
            result = (arr[i]+arr[i+1])/2;
            return result;
        }
    }
    return -1;
}

const myArray=[123,124,125,126,127,128,129,130,131,132];
console.log(findMissingNumber(myArray));

