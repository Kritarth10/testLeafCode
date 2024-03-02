import {test,chromium} from "@playwright/test"

test("Learning CSS and Xpath Locators",async()=>{
    const browser=   await chromium.launch();
         const browserContext=await browser.newContext();
         const page=await browserContext.newPage();
         await page.goto("http://leaftaps.com/opentaps/control/main");
         await page.fill("#username","demoSalesManager");
         await page.fill("#password","crmsfa");
         await page.click(".decorativeSubmit");
        // await page.waitForTimeout(5000);
        await page.click("text=CRM/SFA");
        await page.click("text=Leads");
        await page.click("//a[text()='Create Lead']");
        await page.locator('[class="inputBox"][id="createLeadForm_companyName"]').fill("3CLogic");
        await page.fill("#createLeadForm_firstName","Kritarth");
        await page.fill("#createLeadForm_lastName","Govil");
       //  const buttonLocator= page.locator('//input[@value="Create Lead"]');
         const buttonLocator = page.locator('//input[@name="submitButton"]').nth(0);
         await buttonLocator.click();
      //  await page.click(".smallSubmit");
        console.log(await page.title())
        
})