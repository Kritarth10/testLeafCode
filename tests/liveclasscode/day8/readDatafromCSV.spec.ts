import {test} from"@playwright/test"
import {parse} from "csv-parse/sync"
import fs from 'fs'
import path from 'path'

const testData = parse(fs.readFileSync(path.join(__dirname,"dataCSV.csv")),{
    columns:true,
    skip_empty_lines: true,
});
for(const data of testData){
    test(`Login using test case id ${data.test_case} `,async({page})=>{
        await page.goto("https://login.salesforce.com");
        await page.fill("#username",data.username);
        await page.fill("#password",data.password);
        await page.click("#Login"); 
        await page.waitForTimeout(10000);
    })
}

