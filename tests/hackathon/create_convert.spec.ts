import {test,chromium,expect} from "@playwright/test"
import {faker} from "@faker-js/faker"

const lastName =  faker.person.lastName();
const firstName = faker.person.firstName();
const companyName =  faker.company.buzzPhrase();
const shareData = faker.word.adjective(10);
const companyName2 = faker.company.buzzPhrase();

test('Verify Lead Creation and Conversion to Opportunity',async({page})=>{
    //navigating to login page using valid credentials
    await page.goto("https://login.salesforce.com");
    await page.fill("#username","kannugovil@3logic.com");
    await page.fill("#password","Krit@rth_1");
    await page.click("#Login"); 
     //below step is to make sure that the page is fully loaded and all text is visible
     await page.locator('span[class="breadcrumbDetail uiOutputText"]').waitFor({'state':'visible'}); 
      //clicking on menu button and then searching for all applications link
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.getByPlaceholder("Search apps or items...").fill("marketing");
    await page.locator('//mark[text()="Marketing"]').click();
    await page.locator('//span[text()="Leads"]').click();
    //creating new lead and entering mandatory and few other details
    await page.waitForLoadState('networkidle')
    await page.getByRole('button',{name:"New"}).click();
    await page.locator('button[aria-label="Salutation - Current Selection: --None--"]').click();
    await page.locator('span[title="Mr."]').click();
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page.locator('input[name="Company"]').fill(companyName);
    await page.locator('[name="firstName"]').fill(firstName);
    await page.getByRole('button',{name:"Save",exact: true}).click();
    //
    await page.locator('(//button[text()="Submit for Approval"]/following::button)[1]').click();
    await page.locator('//span[text()="Convert"]').click();
    await page.locator('button[class="slds-button transparentButton"]').last().click();
    await page.locator('input[class=" input"]').last().fill(companyName2);
    await page.getByRole('button',{name:"Convert",exact:true}).click();
    await page.getByRole('button',{name:"Go to Leads"}).click();
    await page.getByRole('button',{name:"List View",exact:true}).click();
    await page.getByPlaceholder('Search this list...').fill(firstName);
    await page.getByRole('button', { name: 'Refresh' }).click();
    await expect(page.getByText('No items to display.')).toBeVisible();
    await page.getByRole('link',{name:"Opportunities"}).click();
    await page.getByPlaceholder('Search this list...').fill(companyName2);
    await page.getByRole('button', { name: 'Show Actions' }).click();
    await expect(page.getByRole('link',{name:`"${companyName2}"`})).toBeVisible();

})

//label[text()="Opportunity Name"]/following::input[1]