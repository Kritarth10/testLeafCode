// let browser = "Chrome";
// console.log(browser);

// let x:string="wish you";
// console.log(x);

// let y:string;
// y=123;

// let browsers1213:string[]=[123,"qwqwqw"];
// console.log(browsers1213);

type supportedBrowsers = "Chrom"|"Firexfox";

let z:supportedBrowsers = "Chrom";

console.log(typeof z)


type browser = {browserName:string,browserVersion:number};

let newBrowser:browser = {browserName:"Chrome",browserVersion:120};

console.log(newBrowser);





type Employee = {empId:number,empName:string};
type Department ="QA";
//let department:Department;
type personname = Employee & {department:Department};


let name1:personname= {empId:1212,empName:"Kritarth",department:"QA"}



type Employee1 = { id: number, empName: string };
type Department2 = "QA" | "DEV";
type depart = { dep: Department };


type Team = Employee1 & depart;


let team: Team = { id: 1003, empName: "Vidya", dep: "QA" };
console.log(team);