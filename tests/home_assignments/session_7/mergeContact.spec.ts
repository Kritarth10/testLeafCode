import {test,expect} from "@playwright/test"
import {faker} from "@faker-js/faker"

const lastName1 =  faker.person.lastName();
const firstName1 = faker.person.firstName();

const lastName2 =  faker.person.lastName();
const firstName2 = faker.person.firstName();


test('MergeContact (Alert and windowHandle)',async({page,context})=>{
    //navigating to the url and login using valid credentials
    console.log(firstName1 + lastName1);
    console.log(firstName2 + lastName2)
    page.goto('http://leaftaps.com/opentaps/control/login');
    await page.locator('#username').fill('demoSalesManager');
    await page.locator('#password').fill('crmsfa');
    await page.locator('input[value="Login"]').click();
    //navigating to the merge contacts page
    await page.getByRole('link', { name: 'CRM/SFA' }).click();
    await page.getByRole('link', { name: 'Contacts' }).click();
   
    //here we will create two new contacts that will be merged later
    //creating first contact
    await page.locator('//a[text()="Create Contact"]').click();
    await page.locator('#firstNameField').fill(firstName1);
    await page.locator('#lastNameField').fill(lastName1);
    await page.click('input[value="Create Contact"]');
    //creating second contact
    await page.locator('//a[text()="Create Contact"]').click();
    await page.locator('#firstNameField').fill(firstName2);
    await page.locator('#lastNameField').fill(lastName2);
    await page.click('input[value="Create Contact"]');
    //merging the contacts
    await page.locator('//a[text()="Merge Contacts"]').click();
    const newPage =context.waitForEvent('page');
    await page.getByAltText('Lookup').first().click();
    const newTab= await newPage;
    //await newTab.bringToFront();
    await newTab.getByRole('link',{name:`${firstName1}`}).click();
    const newPage2 =context.waitForEvent('page');
    await page.getByAltText('Lookup').last().click();
    const newTab2= await newPage2;
    //await newTab.bringToFront();
    await newTab2.getByRole('link',{name:`${firstName2}`}).click();
    page.once('dialog',async alertType=>{
        await alertType.accept();
        console.log(alertType.message());
       })
    await page.locator('//a[text()="Merge"]').click();
    expect(await page.title()).toBe('View Contact | opentaps CRM')
})