import {test,chromium,expect} from "@playwright/test"
import {faker} from "@faker-js/faker"

const lastName =  faker.person.lastName();
const companyName =  faker.company.buzzPhrase();
const firstName = faker.person.firstName();

test("Create Lead in Salesforce",async()=>{
    const browser = await chromium.launch();
    const browserReference = await browser.newContext();
    const page = await browserReference.newPage();
    await page.goto("https://login.salesforce.com");
    await page.fill("#username","kannugovil@3logic.com");
    await page.fill("#password","Krit@rth_1");
    await page.click("#Login"); 
    await page.waitForLoadState('load')
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForLoadState('load');
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.locator('//p[text()="Sales"]').click();
    await page.locator('//span[text()="Leads"]').click();
    await page.getByRole('button',{name:"New"}).click();
    await page.locator('button[aria-label="Salutation - Current Selection: --None--"]').click();
    await page.locator('span[title="Mr."]').click();
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page.locator('input[name="Company"]').fill(companyName);
    await page.getByRole('button',{name:"Save",exact: true}).click();
    expect(page.getByText(lastName,{exact:true})).toBeTruthy();
})

test("Edit lead in LeafTaps",async()=>{
    const browser = await chromium.launch();
    const browserReference = await browser.newContext();
    const page = await browserReference.newPage();
    const companyLocator= page.locator('[class="inputBox"][id="createLeadForm_companyName"]')
    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.locator('input[name="USERNAME"]').fill("demoSalesManager");
    await page.locator('input[name="PASSWORD"]').fill("crmsfa");
    await page.locator('input[value="Login"]').click();
    await page.getByRole('link', { name: 'CRM/SFA' }).click();
    await page.getByRole('link', { name: 'Leads' }).click();
    await page.getByRole('link', { name: 'Create Lead' }).click();
    await companyLocator.fill("3CLogic");
    await page.fill("#createLeadForm_firstName","Kritarth");
    await page.fill("#createLeadForm_lastName","Govil");
    const buttonLocator= page.locator('//input[@value="Create Lead"]');
    await buttonLocator.click();
    await await page.getByRole('link', { name: 'Edit' }).click();
  //  await page.locator('[class="inputBox"][id="createLeadForm_companyName"]').click().clear();
    await page.locator('[class="inputBox"][id="updateLeadForm_companyName"]').clear();
    await page.locator('[class="inputBox"][id="updateLeadForm_companyName"]').fill("3CLogic Organization");
    await page.click("input[value='Update']");
})

test("Create Individuals in Salesforce",async()=>{
    const browser = await chromium.launch();
    const browserReference = await browser.newContext();
    const page = await browserReference.newPage();
    await page.goto("https://login.salesforce.com");
    await page.fill("#username","kannugovil@3logic.com");
    await page.fill("#password","Krit@rth_1");
    await page.click("#Login"); 
    await page.waitForLoadState('load')
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForLoadState('load')
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.getByPlaceholder("Search apps or items...").fill("individuals");
    await page.click('//mark[text()="Individuals"]');
    await page.getByRole('button',{name:'New'}).click();
    
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page.getByRole('button',{name:"Save",exact: true}).click();
    expect(page.getByText(lastName)).toBeTruthy();
})

test("Edit Individuals in Salesforce",async()=>{
    const browser = await chromium.launch();
    const browserReference = await browser.newContext();
    const page = await browserReference.newPage();
    await page.goto("https://login.salesforce.com");
    await page.fill("#username","kannugovil@3logic.com");
    await page.fill("#password","Krit@rth_1");
    await page.click("#Login"); 
    await page.waitForLoadState('load')
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForLoadState('load');
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.getByPlaceholder("Search apps or items...").fill("individuals");
    await page.waitForLoadState('load');
    await page.click('//mark[text()="Individuals"]');
    await page.getByRole('button',{name:'New'}).click();
    const lastName1 = faker.person.lastName();                                        //have to create the individual first in order to edit or either have to make sure
    await page.getByPlaceholder("Last Name").fill(lastName1);                       //that test cases should run in serial order 
    await page.getByRole('button',{name:"Save",exact: true}).click();
    expect(page.getByText(lastName)).toBeTruthy();
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForLoadState('load');
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.getByPlaceholder("Search apps or items...").fill("individuals");
    await page.waitForLoadState('load');
    await page.click('//mark[text()="Individuals"]');
    await page.getByPlaceholder('Search this list...').fill(lastName1);
    await page.waitForTimeout(2000)
    await page.getByRole('button', { name: 'Refresh' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Show Actions' }).click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
 //   await page.getByRole('button',{name:'--None--'}).click();
    await page.locator('//a[contains(text(),"None")]/..').nth(0).click();
    await page.getByRole('menuitemradio', { name: 'Mr.' }).click();
    await page.getByPlaceholder("First Name").fill(firstName);
    await page.getByRole('button',{name:"Save",exact: true}).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(`${firstName} ${lastName1}`)).toBeTruthy();
})
    
