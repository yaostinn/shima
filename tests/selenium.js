import { Builder, By, WebDriver } from 'selenium-webdriver';
let driver = await new Builder().forBrowser('chrome').build();
await driver.get('http://localhost:5173/');

(async function test() {
  let nameInput = await driver.findElement(By.xpath('//*[@id="mantine-as34v6sdm"]'))
  name.
})();