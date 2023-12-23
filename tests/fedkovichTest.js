import { Builder, By, WebDriver, until } from 'selenium-webdriver';
let driver = await new Builder().forBrowser('chrome').build();
await driver.get('http://localhost:5173/');

async function testSortByCreatedAt(){
     let buttonByCreatedAt = await driver.findElement(By.xpath('//*[@id="byCreatedAt"]'));
     await new Promise(resolve => setTimeout(resolve, 2000));
        await buttonByCreatedAt.click();
        
     
        await new Promise(resolve => setTimeout(resolve, 2000));
     
        let elementsCreatedAt = await driver.wait(until.elementsLocated(By.className('created_at_td')), 10000);
        let createdAt = [];
        for (let element of elementsCreatedAt) {
           let code = await element.getText();
           let parts = code.split(" ");
           let formattedDate = `${parts[1]} ${parts[2]} ${parts[3]}`;
           let date = new Date(Date.parse(formattedDate)); 
           createdAt.push(date);
         }
         
        
        let isSorted = true;
        for (let i = 1; i < createdAt.length; i++) {
          if (createdAt[i] < createdAt[i - 1]) {
            isSorted = false;
            break;
          }
        }
      
        if (isSorted) {
          console.log('Даты идут по возрастанию.Тест пройден');
        } else {
          console.log('Даты не идут по возрастанию.Тест не пройден');
        }
  }
  
  async function test(){
     await testSortByCreatedAt()
     driver.quit()
  }
     
  test()