import { Builder, By, WebDriver, until } from 'selenium-webdriver';
let driver = await new Builder().forBrowser('chrome').build();
await driver.get('http://localhost:5173/');


async function testForm(data) {
  for (let i = 0; i < data.length; i++) {
   driver.navigate().refresh()

   let nameInput = await driver.findElement(By.xpath('//*[@id="name"]'));
   let codeInput = await driver.findElement(By.xpath('//*[@id="code"]'));
   let button = await driver.findElement(By.xpath('//*[@id="button"]'));

   await nameInput.sendKeys(data[i][0]);
   await codeInput.sendKeys(data[i][1]);
   await button.click();

   await new Promise(resolve => setTimeout(resolve, 2000));

    let elementsName = await driver.wait(until.elementsLocated(By.className('name_td')), 10000);
    let lastElementName = elementsName[elementsName.length - 1];

    let elementsCode = await driver.wait(until.elementsLocated(By.className('code_td')), 10000);
    let lastElementCode = elementsCode[elementsCode.length - 1];


    if ((await lastElementName.getText() == data[i][0] && await lastElementCode.getText()==data[i][1])==data[i][2]) {
      console.log(`${i + 1} тест пройден`);
    } else {
      console.log(`${i + 1} тест не пройден`);
    }
}
}

let data = [
  ['', '',false],
  ['остин', '',false],
  ['альберт', '2+2',true],
  ['никита', '10000000**2',true],
  ['матвей', '(1+4)*5',true],
  ['даник',"(5+5)*(3**2)",true],
  ['альберт', '2*0',true],
  ['никита', '2**0',true],
  ['матвей', '(1+4)*5',true],
  ['даник',"(5+5)*(3^25)",true],
  ['альберт', '2+2',true],
  ['никита', '2/0',true],
  ['матвей', '(1+4)*(4445)',true],
  ['даник',"(5+5)*(1.2)",true],
  ['альберт', '2*2',true],
  ['никита', '222313.12311',true],
  ['матвей', '1321',true],
  ['даник',"(5+5)*(3^2)",true],
];

async function test(){
await testForm(data)
await testSortByName()
await testSortByCode()
await testSortByExecutionResponse()
await testSortByCreatedAt()
await testSortByUpdatedAt()
// driver.quit()
}

test()