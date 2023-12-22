import { Builder, By, WebDriver, until } from 'selenium-webdriver'
let driver = await new Builder().forBrowser('chrome').build()
await driver.get('http://localhost:5173/')

async function testSortByCode() {
  let buttonByCode = await driver.findElement(By.xpath('//*[@id="byCode"]'))
  await new Promise((resolve) => setTimeout(resolve, 2000))
  await buttonByCode.click()

  await new Promise((resolve) => setTimeout(resolve, 2000))

  let elementsCode = await driver.wait(
    until.elementsLocated(By.className('code_td')),
    10000
  )
  let codes = []

  for (let element of elementsCode) {
    let code = await element.getText()
    codes.push(code)
  }

  let isSorted = true
  for (let i = 1; i < codes.length; i++) {
    if (codes[i][0] < codes[i - 1][0]) {
      isSorted = false
      break
    }
  }

  if (isSorted) {
    console.log('Коды идут по возрастанию.Тест пройден')
  } else {
    console.log('Коды не идут по возрастанию.Тест не пройден')
  }
}

async function test() {
  await testSortByCode()
  driver.quit()
}

test()
