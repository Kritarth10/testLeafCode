let yourName ="Kritarth Govil";
let reverseString="";
function reverse(yourName){
    let chars = yourName.split("");
    for(let i=chars.length-1;i>=0;i--){
        reverseString+=chars[i];
    }
    return reverseString;
}

console.log(reverse(yourName));