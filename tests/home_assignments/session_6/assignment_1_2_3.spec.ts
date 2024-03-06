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
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.locator('//p[text()="Sales"]').click();
    await page.locator('//span[text()="Leads"]').click();
    await page.waitForLoadState('networkidle')
    expect(page.getByRole('button',{name:"New"})).toBeVisible({timeout:10000});
    expect(page.getByRole('button',{name:"New"})).toBeEnabled({timeout:10000});
    await page.getByRole('button',{name:"New"}).click();
    await page.locator('button[aria-label="Salutation - Current Selection: --None--"]').click();
    await page.locator('span[title="Mr."]').click();
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page.locator('input[name="Company"]').fill(companyName);
    await page.getByRole('button',{name:"Save",exact: true}).click();
    await expect(page.getByText(lastName)).toContainText(lastName);
    
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
    expect(companyLocator).toBeEnabled();
    await companyLocator.fill(companyName);
    expect(page.locator('#createLeadForm_firstName')).toBeVisible();
    await page.fill("#createLeadForm_firstName",firstName);
    expect(page.locator('#createLeadForm_lastName')).toBeVisible();
    await page.fill("#createLeadForm_lastName",lastName);
    const buttonLocator= page.locator('//input[@value="Create Lead"]');
    await buttonLocator.click();
    await await page.getByRole('link', { name: 'Edit' }).click();
  //  await page.locator('[class="inputBox"][id="createLeadForm_companyName"]').click().clear();
    await page.locator('[class="inputBox"][id="updateLeadForm_companyName"]').clear();
    await page.locator('[class="inputBox"][id="updateLeadForm_companyName"]').fill("3CLogic Organization");
    await page.click("input[value='Update']");
    await expect(page.getByText("3CLogic Organization")).toBeVisible();
})

test.only("Create Individuals in Salesforce",async()=>{
    const browser = await chromium.launch();
    const browserReference = await browser.newContext();
    const page = await browserReference.newPage();
    await page.goto("https://login.salesforce.com");
    await page.waitForLoadState('networkidle');
    expect(await page.title()).toBe('Login | Salesforce');
    await page.fill("#username","kannugovil@3logic.com");
    await page.fill("#password","Krit@rth_1");
    await page.click("#Login"); 
    await page.waitForLoadState('networkidle');
    expect(await page.title()).toBe('Home | Salesforce');
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForLoadState('load')
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.getByPlaceholder("Search apps or items...").fill("individuals");
    await page.click('//mark[text()="Individuals"]');
    await page.getByRole('button',{name:'New'}).click();
    
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page.getByRole('button',{name:"Save",exact: true}).click();
    await expect(page.getByText(lastName)).toBeVisible();
})