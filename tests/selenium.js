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

    let elementsName = await driver.wait(until.elementsLocated(By.className('name')), 10000);
    let lastElementName = elementsName[elementsName.length - 1];

    let elementsCode = await driver.wait(until.elementsLocated(By.className('code')), 10000);
    let lastElementCode = elementsCode[elementsCode.length - 1];


    if ((await lastElementName.getText() == data[i][0] && await lastElementCode.getText()==data[i][1])==data[i][2]) {
      console.log(`${i + 1} тест пройден`);
    } else {
      console.log(`${i + 1} тест не пройден`);
    }
}
}

async function testSortByName(){
   let buttonByName = await driver.findElement(By.xpath('//*[@id="byName"]'));

   buttonByName.click();

   await new Promise(resolve => setTimeout(resolve, 2000));

   let elementsName = await driver.wait(until.elementsLocated(By.className('name')), 10000);
   let names = [];
 
   for (let element of elementsName) {
     let name = await element.getText();
     names.push(name);
   }
 
   let isSorted = true;
   for (let i = 1; i < names.length; i++) {
     if (names[i] < names[i - 1]) {
       isSorted = false;
       break;
     }
   }
 
   if (isSorted) {
     console.log('Имена идут по возрастанию.Тест пройден');
   } else {
     console.log('Имена не идут по возрастанию.Тест не пройден');
   }
}

async function testSortByCode(){
   let buttonByCode = await driver.findElement(By.xpath('//*[@id="byCode"]'));
}

async function testSortByExecutionResponse(){
   let buttonbByExecutionResponse = await driver.findElement(By.xpath('//*[@id="byExecutionResponse"]'));
}

async function testSortByCreatedAt(){
   let buttonByCreatedAt = await driver.findElement(By.xpath('//*[@id="byCreatedAt"]'));
}
async function testSortByUpdatedAt (){
   let buttonByUpdatedAt = await driver.findElement(By.xpath('//*[@id="byUpdatedAt"]'));
}

let data = [
  ['', '',false],
  ['остин', '',false],
  ['альберт', '2+2',true],
  ['никита', '2/0',true],
  ['никита', 'wefw',false]
];

testForm(data)