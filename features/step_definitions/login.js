const { By } = require('selenium-webdriver')
const { Given, When, Then } = require('cucumber')
const AuthPage = require('../page-objects/auth')

let page

Given('Eu estou na pagina de login', function () {
  page = new AuthPage(this.driver)
})

When('Eu digito o email {string}', function (email) {
  page.email = email
})

When('Eu digito a senha {string}', function (password) {
  page.password = password
})

When('Eu clico submit', function () {
  return page.submitForm()
})

Then('Eu devo ver o botao de logout', async function () {
  return (await page.asyncFind(By.id('logout'))).isDisplayed()
})

Then('Eu devo ver o erro de senha', async function () {
  return (await page.asyncError).isDisplayed()
})
