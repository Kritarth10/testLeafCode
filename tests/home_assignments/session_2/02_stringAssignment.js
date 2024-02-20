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
    const string1map = new Map();     //declaring two maps that will store the frequency of each character
    const string2map = new Map();
 
// this function is responsible for preparing the map which will store the character and it's frequency.
function prepareMap(stringMap,strings){
    for(let i=0;i<strings.length;i++){
        if(stringMap.has(strings[i])){                      //checking if map has that character
            let value = stringMap.get(strings[i])+1;        //if it does, increase the value
            stringMap.set(strings[i],value);
        }
        else{
            stringMap.set(strings[i],1);                    //else set it to 1
        }
    }
}    

function anagrams(string1,string2){
    if(string1.length!=string2.length)
    return false;
    prepareMap(string1map,string1);                          
    prepareMap(string2map,string2);

    if(string1map.size != string2map.size)                 //checking if the map size is equal or not, in case if map size is not then that would mean
    return false;                                          //same characters do not exist in both maps
    for( let [key,val] of string1map){                       //this loop is iterating over first map and fetching the key from the second map          
        let value2 = string2map.get(key);              
        if(val !== value2 || (value2 == undefined && !string2map.has(key)))      //checking whether the value for same key matches or not, also whether same value exist in map2 or not
        return false
    }
    return true;
}
console.log(anagrams('listen', 'sieent'));

