import {test,expect} from "@playwright/test"
import { fakerEN} from "@faker-js/faker"




const text = fakerEN.lorem.lines(1);
const text2 = fakerEN.lorem.lines(1);

test.use({storageState:"creds/login_details.json"});
test('Auto login into salesforce application',async({page})=>{
    await page.goto('https://3clogic2-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home');
    await page.locator('span[class="breadcrumbDetail uiOutputText"]').waitFor({'state':'visible'});
    await page.getByRole('button', { name: 'App Launcher' }).click();
    await page.locator('button[aria-label="View All Applications"]').click();
    await page.getByPlaceholder("Search apps or items...").fill("Content");
    await page.locator('//mark[text()="Content"]').first().click();
    await page.locator('//span[text()="Chatter"]').click();
    await page.locator('//span[text()="Question"]').click();
    await page.getByPlaceholder('What would you like to know?').fill(text);
    await page.locator('//span[text()="Details"]/following::p[1]').fill(text2);
    await page.getByRole('button',{name:"Ask"}).click();
    await expect(page.getByText(`${text}`)).toBeVisible({timeout:10000});
    await expect(page.getByText(`${text2}`)).toBeVisible({timeout:10000});
})