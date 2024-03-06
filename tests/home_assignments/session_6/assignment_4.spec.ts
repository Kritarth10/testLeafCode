import {test,chromium,expect} from "@playwright/test"
import {faker} from "@faker-js/faker"

const lastName =  faker.person.lastName();
const firstName = faker.person.firstName();

test("Edit Individuals in Salesforce",async()=>{
    const browser = await chromium.launch();
    const browserReference = await browser.newContext();
    const page = await browserReference.newPage();
    await page.goto("https://login.salesforce.com");
    expect(await page.title()).toBe('Login | Salesforce');
    await page.fill("#username","kannugovil@3logic.com");
    await page.fill("#password","Krit@rth_1");
    await page.click("#Login"); 
    await page.locator('span[class="breadcrumbDetail uiOutputText"]').waitFor({'state':'visible'});  
    expect(await page.title()).toBe('Home | Salesforce');
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.getByPlaceholder("Search apps or items...").fill("individuals");
    await page.waitForLoadState('networkidle');
    await page.click('//mark[text()="Individuals"]');
    await page.getByRole('button',{name:'New'}).click();
    const lastName1 = faker.person.lastName();                                        //have to create the individual first in order to edit or either have to make sure
    await page.getByPlaceholder("Last Name").fill(lastName1);                       //that test cases should run in serial order 
    await page.getByRole('button',{name:"Save",exact: true}).click();
    expect(page.getByText(lastName)).toBeTruthy();
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.getByPlaceholder("Search apps or items...").fill("individuals");
    await page.waitForLoadState('networkidle');
    await page.click('//mark[text()="Individuals"]');
    await page.getByPlaceholder('Search this list...').fill(lastName1);
    await page.waitForTimeout(2000)
    await page.getByRole('button', { name: 'Refresh' }).click();
    await page.waitForTimeout(5000);
  //  await page.waitForLoadState('networkidle');
    const showActionsLocator = page.getByRole('button', { name: 'Show Actions' });
    await page.screenshot({ path: 'screenshot.png' });
    // await page.locator('div[class="slds-spinner_container slds-grid slds-hide"]').waitFor({'state':'visible'});
    await showActionsLocator.click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    //   await page.getByRole('button',{name:'--None--'}).click();
    await page.locator('//a[contains(text(),"None")]/..').nth(0).click();
    await page.getByRole('menuitemradio', { name: 'Mr.' }).click();
    await page.getByPlaceholder("First Name").fill(firstName);
    await page.getByRole('button',{name:"Save",exact: true}).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(`${firstName} ${lastName1}`,{exact : true})).toBeVisible();
    await showActionsLocator.click();
    await page.getByRole('menuitem', { name: 'Delete' }).click();
    await page.getByRole('button',{name:"Delete"}).click();
})
    