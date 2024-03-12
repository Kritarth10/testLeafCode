import {test,expect} from "@playwright/test"

test("handling alert",async({page})=>{
    await page.goto('https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm');
    page.once('dialog',async alertType=>{
        await alertType.accept();
       })
    const frameElement = page.frameLocator('#iframeResult')
    
    const tryButton = frameElement.locator('//button[text()="Try it"]');
    await tryButton.click();
    expect(frameElement.locator('#demo')).toHaveText('You pressed OK!')
    page.once('dialog',async alertType=>{
        await alertType.dismiss();
       })
    await tryButton.click();
    expect(frameElement.locator('#demo')).toHaveText('You pressed Cancel!')
});


