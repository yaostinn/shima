import { Builder, By, WebDriver, until } from 'selenium-webdriver';
let driver = await new Builder().forBrowser('chrome').build();
await driver.get('http://localhost:5173/');

async function testSortByName(){
     let buttonByName = await driver.findElement(By.xpath('//*[@id="byName"]'));
     await new Promise(resolve => setTimeout(resolve, 2000));
     await buttonByName.click();
     
  
     await new Promise(resolve => setTimeout(resolve, 2000));
  
     let elementsName = await driver.wait(until.elementsLocated(By.className('name_td')), 10000);
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

  async function test(){
     await testSortByName()
     driver.quit()
  }
     
  test()