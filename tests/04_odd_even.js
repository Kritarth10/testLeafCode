function odd(num)
{
    for(let i=0;i<=num;i++)
    {
        if(i%2!=0 && i!=0){
            console.log(i + " is odd number");
        }
    }
}

odd(15);