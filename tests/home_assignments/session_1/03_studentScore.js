function calculateGrade(score){
  switch(true){
    case score>0 && score<30 :
    return "F";
    case score>=30 && score<50 :
    return "E";
    case  score>=50&& score<70 :
    return "D";
    case score>=70 && score<80 :
    return "C";
    case score>=80 && score <90 :
    return "B";
    case score>=90 :
    return "A";
    default :
    return "N/A";
  }
}

let score =66;
console.log(`Your grade is `+ calculateGrade(score));