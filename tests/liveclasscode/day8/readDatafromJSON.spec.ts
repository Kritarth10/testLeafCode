import {test} from "@playwright/test"
import path from 'path'
import fs from 'fs'

const testData = JSON.parse(fs.readFileSync(path.join(__dirname,'dataJSON.json'),'utf-8'));
console.log(testData)

for(const data of testData){
    test(`Verifying the test case id ${data.test_case}`,async({page})=>{
        await page.goto("https://login.salesforce.com");
        await page.fill("#username",data.username);
        await page.fill("#password",data.password);
        await page.click("#Login"); 
        await page.waitForTimeout(10000);
    })
}