//Given a string s consisting of words and spaces, return the length of the last word in the string.

function lastWordLength(sentence){
    let words = sentence.trim().split(" "); //trimming the sentence and splitting it on the basis of whitespaces
    let len = words[words.length-1].length;
    return {
        lastWord: words[words.length-1],
        wordLength: len                   //returning the object that consists of last word and it's length
    };
}
let sentence="   fly me   to   the moon  ";
let result = lastWordLength(sentence);
console.log(`The last word is "${result.lastWord}" with length ${result.wordLength}`);

//If the given string and reverse string is same --> palindrome

function palindrome(originalString){
    let splitString = originalString.split("");  //splitting the string w
    let reverseString="";
    for(let i=splitString.length-1;i>=0;i--){
        reverseString+=splitString[i];           //making the reverse string
    }
    if(reverseString==originalString)
    return "Given string is palindrome"
    else
    return "Given string is not palindrome";
}

let originalString="rotator";
console.log(palindrome(originalString));


//Write a function to check if two strings are anagrams.