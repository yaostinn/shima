import { Builder, By, WebDriver, until } from 'selenium-webdriver'
let driver = await new Builder().forBrowser('chrome').build()
await driver.get('http://localhost:5173/')

async function testSortByUpdatedAt() {
  let buttonByUpdatedAt = await driver.findElement(
    By.xpath('//*[@id="byUpdatedAt"]')
  )
  await new Promise((resolve) => setTimeout(resolve, 2000))
  await buttonByUpdatedAt.click()

  await new Promise((resolve) => setTimeout(resolve, 2000))

  let elementsUpdatedAt = await driver.wait(
    until.elementsLocated(By.className('updated_at_td')),
    10000
  )
  let updatedAt = []
  for (let element of elementsUpdatedAt) {
    let code = await element.getText()
    let parts = code.split(' ')
    let formattedDate = `${parts[1]} ${parts[2]} ${parts[3]}`
    let date = new Date(Date.parse(formattedDate))
    updatedAt.push(date)
  }

  let isSorted = true
  for (let i = 1; i < updatedAt.length; i++) {
    if (updatedAt[i] < updatedAt[i - 1]) {
      isSorted = false
      break
    }
  }

  if (isSorted) {
    console.log('Даты идут по возрастанию.Тест пройден')
  } else {
    console.log('Даты не идут по возрастанию.Тест не пройден')
  }
}

async function test() {
  await testSortByUpdatedAt()
  driver.quit()
}

test()
