function sumOfValues(val){
    let sum =0;
    for (let i=1;i<=val;i++){
        sum+=i;
        if(sum==1)
        console.log(sum);
        else
        console.log(`${i} (${sum})`);
    }
    return sum;
}

let val = 10;
sumOfValues(val);