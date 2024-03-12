import {test,expect} from "@playwright/test"
import {faker} from "@faker-js/faker"

const uuidString =faker.string.uuid();

test('upload a file',async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.setInputFiles("input[type='file']","tests/liveclasscode/day8/UploadFolder/playwright interview preparation.txt");
    await page.locator('#file-submit').click();
   // await page.waitForTimeout(3000);
    await expect(page.getByText("File Uploaded!")).toBeVisible();
})

test('download a file',async({page})=>{
    page.goto("https://the-internet.herokuapp.com/download");
    const downloadFile = page.waitForEvent('download');
    await page.locator("//a[text()='test.docx']").click();
    const filePath = await downloadFile;
    await filePath.saveAs("tests/liveclasscode/day8/downloadFolder/"+`${uuidString}`+".txt");
})