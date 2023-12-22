import { Builder, By, WebDriver, until } from "selenium-webdriver";
let driver = await new Builder().forBrowser("chrome").build();
await driver.get("http://localhost:5173/");

async function testSortByExecutionResponse() {
  let buttonbByExecutionResponse = await driver.findElement(
    By.xpath('//*[@id="byExecutionResponse"]')
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await buttonbByExecutionResponse.click();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  let elementsExecutionResponse = await driver.wait(
    until.elementsLocated(By.className("execution_response_td")),
    10000
  );
  let executionResponses = [];

  for (let element of elementsExecutionResponse) {
    let code = await element.getText();
    executionResponses.push(code);
  }
  [0];

  let isSorted = true;
  for (let i = 1; i < executionResponses.length; i++) {
    if (executionResponses[i][0] < executionResponses[i - 1][0]) {
      isSorted = false;
      break;
    }
  }

  if (isSorted) {
    console.log("Ответы идут по возрастанию.Тест пройден");
  } else {
    console.log("Ответы не идут по возрастанию.Тест не пройден");
  }
}

async function test() {
  await testSortByExecutionResponse();
  driver.quit();
}

test();
