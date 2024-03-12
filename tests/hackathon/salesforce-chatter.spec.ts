import {test,chromium,expect} from "@playwright/test"
import {faker} from "@faker-js/faker"

const lastName =  faker.person.lastName();
const firstName = faker.person.firstName();
const companyName =  faker.company.buzzPhrase();
const shareData = faker.word.adjective(10);

test("Create and verify a New Case in Chatter",async()=>{
    const browser = await chromium.launch();
    const browserReference = await browser.newContext();
    const page = await browserReference.newPage();
    //navigating to salesforce page and login using valid credentials
    await page.goto("https://login.salesforce.com");
    await page.fill("#username","majay3574@gmail.com");
    await page.fill("#password","Ajaymichael@007");
    await page.click("#Login"); 
    //below step is to make sure that the page is fully loaded and all text is visible
    await page.locator('span[class="breadcrumbDetail uiOutputText"]').waitFor({'state':'visible'}); 
    //clicking on menu button and then searching for all applications link
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.waitForLoadState('networkidle'); 
    await page.locator('button[aria-label="View All Applications"]').click();
    //searching for service and creating a new case
    await page.getByPlaceholder("Search apps or items...").fill("service");
    await page.waitForLoadState('networkidle');
    await page.getByRole('link',{name:"Service",exact:true}).click();
    await page.getByRole('link',{name:'Cases',exact:true}).click();
    await page.getByRole('button',{name:'New',exact:true}).click();
    await page.getByPlaceholder('Search Contacts...').click();
    //creating a new contact
    await page.getByTitle('New Contact',{exact:true}).click();
    await page.locator('//a[contains(text(),"None")]/..').nth(0).click();
    await page.getByRole('menuitemradio', { name: 'Mr.' }).click();
    await page.getByPlaceholder("First Name").fill(firstName);
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page.getByRole('button',{name:"Save",exact: true}).click();
    await expect(page.getByPlaceholder(`${firstName} ${lastName}`)).toBeVisible({timeout:10000});
    //creating new account
    await page.getByPlaceholder('Search Accounts...').click();
    await page.getByTitle('New Account',{exact:true}).click();
    await page.locator('//span[text()="Account Name"]/../following-sibling::*').fill(companyName);
    await page.locator('a[tabindex="0"][class="select"]').first().click();
    await page.getByRole('menuitemradio', { name: 'Hot' }).click();
    await page.getByRole('button',{name:"Save",exact: true}).click();
    //selecting and filling few other details
   
    // await page.locator('button[aria-label="Case Origin - Current Selection: New"]').click();
    // await page.locator('//span[text()="New"]').last().click();
    await page.locator('//label[text()="Priority"]//following::button[1]').click();
    await page.locator('//span[text()="High"]').click();
  //  await page.locator('//label[text()="Case Origin"]//following::button[1]"]').click();
    await page.locator('button[aria-label="Case Origin - Current Selection: --None--"]').click();
    await page.locator('//span[text()="Email"]').click();
    await page.locator('[name="Subject"]').fill('Product Return Request');
    await page.locator('//label[text()="Description"]/following::textarea[1]').fill('Requesting a return for a defective product');
    await page.locator('button[name="SaveEdit"]').click();
    // editing the case
    await page.locator('//span[text()="Edit Status"]/..').click();
    await page.locator('//label[text()="Status"]//following::button[1]').click();
    await page.getByTitle('Escalated').click();
    await page.locator('button[name="SaveEdit"]').click();
    //sharing an update
    //single click was not working so using two separate clicks
    await page.locator('//span[text()="Share an update..."]').click();
    await page.locator('//span[text()="Share an update..."]').click();
    await page.getByRole('textbox').fill(shareData);
    await page.getByRole('button',{name:"Share",exact:true}).click();
    //liking the post
    await page.locator(`//span[text()="${shareData}"]/preceding::a[1]`).click();
    await page.getByRole('menuitem', { name: 'Like on Chatter' }).click();
    await page.getByRole('link',{name:"Chatter"}).click();
    //was trying to assert that the latest comment was liked by getting the style attribute and asserting it's value but it didn't work
  // await expect(page.locator(`//span[text()="${shareData}"]/following::button[1]/*[1]`).first()).toHaveAttribute('style','display:inline-flex',{timeout:10000}) 
    await expect(page.locator(`//span[text()="${shareData}"]`)).toBeVisible();
});
//span[text()="High"]
//div[data-placeholder="Share an update..."]
//a[title="Post"]/following::p[1]
//span[text()="Added a validation"]/following::button[1]
//label[text()="Description"]/../following-sibling::*
//p[text()="awesome"]
//label[text()="Case Origin"]//following::button[1]

//span[text()="Status"]//following::span[text()="New"]//following::button[1]
//span[text()="Edit Status"]//preceeding::button[1]
//span[text()="Added a validation"]
//a[title="Kritarth Govil"]/following::a[1]