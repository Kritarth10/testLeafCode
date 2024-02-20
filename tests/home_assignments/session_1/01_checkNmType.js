function checkNumberType(input){
    if(input>0)
    return "Input is greated than 0";
    else if(input<0)
    return "Input is less than 0";
    else
    return "Bingo!Input is 0";
}

let input =0;
console.log(checkNumberType(input));