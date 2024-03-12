import {test,expect} from "@playwright/test"

test('',async({page})=>{
    page.goto("https://dev62671.service-now.com/");
    await page.fill('#user_name','admin');
    await page.fill('#user_password','3ks%LVeqWJ+9');
    await page.click('#sysverb_login');
  //  await page.locator('.sn-polaris-tab can-animate polaris-enabled').first().click();
     await page.getByRole('button',{name:"All"}).click();
    await page.fill('#filter','Service catalog');
    await page.locator('.filter-match').filter({hasText:"Service Catalog"}).first().click();
    const insideFrame = await page.frameLocator('#gsft_main')
    await insideFrame.locator('//a[text()="Mobiles"]').click();
    await insideFrame.getByRole('link',{name:"Apple iPhone 13 pro"}).click();
    await insideFrame.locator("//span[contains(text(),'broken iPhone')]/following::label[1]").click();
    await insideFrame.locator("//span[contains(text(),'original phone number')]/following::input[2]").fill('99');
    await insideFrame.locator('//span[contains(text(),"Monthly data allowance")]/following::select[1]').selectOption({label:'Unlimited [add $4.00]'});
    await insideFrame.getByText('Sierra Blue').click();
    await insideFrame.getByText('GB [add $300.00]').click();
    await insideFrame.getByRole('button',{name:"Order Now",exact:true}).click();
    await expect(insideFrame.getByText('Thank you, your request has been submitted')).toBeVisible();
})