function checkOddOrEven(input){
    if(input%2==0)
    return `${input} : Given input is Even`;
    else
    return `${input} : Given input is Odd`;
}

let input=989780;
console.log(checkOddOrEven(input));