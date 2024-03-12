import {test,expect} from "@playwright/test"
import { faker } from "@faker-js/faker";
import fs from 'fs'
import path from 'path'

const lastName =  faker.person.lastName();
const firstName = faker.person.firstName();
const companyName =  faker.company.buzzPhrase();

const testData = JSON.parse(fs.readFileSync(path.join(__dirname,'salesforceLogin.json'),'utf-8'))

const data = testData[1];

const uuidString =faker.string.uuid();

test('Assignment 2: Downlaod/Upload',async({page})=>{

    //navigating to applicationa and login using valid credentials
    page.goto(data.url);
    await page.fill("#username",data.username);
    await page.fill("#password",data.password);
    await page.click("#Login"); 
    //below comment is for making sure that page is fully loaded
    await page.locator('span[class="breadcrumbDetail uiOutputText"]').waitFor({'state':'visible'});
    await page.context().storageState({path:"creds/login_details.json"})
    //below code is to navigate to marketing app  
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.getByPlaceholder("Search apps or items...").fill("marketing");
    await page.locator('//mark[text()="Marketing"]').click();
    //below code is navigating to contacts and creating new contact
    await page.locator('//span[text()="Contacts"]').click();
    await page.getByRole('button',{name:"New",exact:true}).click();
    await page.locator('button[aria-label="Salutation - Current Selection: --None--"]').click();
    await page.locator('span[title="Mr."]').click();
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page.getByRole('button',{name:"Save",exact: true}).click();
    //below code is to upload file to salesforce
    const uploadFile = page.waitForEvent('filechooser');
    await page.locator('//span[text()="Upload Files"]').click();
    const file = await uploadFile;
    await file.setFiles("tests/home_assignments/session_8/UploadFolder/playwright interview preparation.txt");
    await page.locator('//span[text()="Done"]').click();
    await expect(page.getByText('1 file was added to the Contact.')).toBeVisible();
    //below code is to download the uploaded file
    await page.locator('.view-all-label').click();
    await page.locator("//span[contains(text(),'interview')]/following::a[2]").nth(1).click();
    const fileToDownload = page.waitForEvent('download');
    await page.getByRole('menuitem', { name: 'Download' }).click();
    const downloadfilePath = await fileToDownload;
    await downloadfilePath.saveAs("tests/home_assignments/session_8/downloadFolder/"+`${uuidString}`+".txt")
})