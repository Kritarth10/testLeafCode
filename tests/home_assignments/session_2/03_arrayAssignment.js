//1) Move Zeroes:
 
//Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

function moveZero(arr){                    //this function will swap the first zero it is encountering with the non-zero element
    let j=0;                               //in this function instead of moving all zeros to the end, we are moving all non-zeros in the begining by
    for(let i=0;i<=arr.length-1;i++){      //by swapping first zero element of the array with the non-zero element
        if(arr[i]!=0){
            swap(arr,i,j);
            j++;
        }
    }
    return arr;
}

function swap(arr,i,j){
    let temp = arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
}

let arr = [0,6,5,4,6,0,9,0,8];
console.log("Problem 1 :: "+moveZero(arr));

// 2) Array intersection :- Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

function intersection(arr1,arr2){
    let newarr=[];
    for(let i=0;i<arr1.length;i++){
        if(arr2.find((ele)=>ele == arr1[i])){        //checking if arr2 contains arr[i] element or not
                if(newarr.find((ele)=>ele==arr1[i]))  //if arr2 contains arr[i] then check whether the resultant array contains arr1[i] or not
                break;
                else
                newarr.push(arr1[i]);                //if resultant array doesn't contain arr1[i] then push that element to resultant array
            }       
        }
    
    return newarr;
}

let arr1 =[4,9,5];
let arr2 = [9,4,9,5,4];
console.log("Problem 2 :: "+intersection(arr1,arr2));

// 3) Find the maximum and minimum: Given an integer array, find the maximum amd minimum elements in an array and return their indices. 

function max_Min(orgarray){
    let min=orgarray[0];
    let max=orgarray[0];
    for(let i=1;i<orgarray.length;i++){
        if(min>orgarray[i]){
            min=orgarray[i];
        }
        if(max<orgarray[i]){
            max=orgarray[i];
        }
    }
    return {
        "max_value":max,
        "min_value":min
    }
}
let orgarray = [34, 7, 21, 89, 54, 10, 91, 67]
let result = max_Min(orgarray);
console.log(`Problem 3 :: Max value is ${result.max_value} and Min value is ${result.min_value}`);

//4) Remove Duplicates: Given an integer array with duplicate elements as input, return a new array with duplicates elements removed. The order of the elements in the resulting array should be same as the order
     //in the original array.

function removeDuplicates(mainArray){
    let res_arr = [];
    res_arr[0]=mainArray[0];
    for(let i=1;i<mainArray.length;i++){
        if(res_arr.find((ele)=>ele==mainArray[i]))
        continue;
        else
        res_arr.push(mainArray[i]);
    }
    return res_arr;
}

let mainArray = [1, 2, 3, 4, 2, 5, 6, 1, 6];
let resultArray = removeDuplicates(mainArray)
console.log("Problem 4 :: Array after removing duplicates "+ resultArray);

//5) Find the number of occurances.  

function occurences(occ_arr,k){
    let count=0;
    for(let i=0;i<occ_arr.length;i++){
        if(occ_arr[i]==k)
        count++;
    }
    return count;
}

const nums = [2,4,5,2,1,2];
const k=2;
console.log("Problem 5 :: Occurence of "+k+" is :- "+occurences(nums,k))

//6) Two Sum

const x_array = [14,4,7,8,2,11]; 
const target = 18;
let finalArray=[];

function calcSum(x_array,target){
    x_array.sort();
    console.log(x_array);
    for(let i=0;i<x_array.length-1;i++){
        for(let j=i+1;j<x_array.length;j++){
            if((x_array[i]+x_array[j]) == target){
                finalArray.push({
                    "first_index":i,
                    "sec_index":j
                })
            }
        }
    }
}
calcSum(x_array,target);
for(let j=0;j<finalArray.length;j++){
    console.log("first index is "+finalArray[j].first_index+" and second index is "+ finalArray[j].sec_index);
}