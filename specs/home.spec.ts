import { test } from '@playwright/test';
import data from '../data/credentials.json';
import { HomeSteps } from '../steps/homeSteps';
import { LoginSteps } from '../steps/loginSteps';
import { BasePage } from '../support/basePage';


test.describe('Feature: Login', () => {

    let basePage: BasePage
    let loginSteps: LoginSteps
    let homeSteps: HomeSteps

    test.beforeAll('Setup', async () => {
        basePage = new BasePage()
        await basePage.initializeBrowser()
        loginSteps = new LoginSteps(basePage)
        homeSteps = new HomeSteps(basePage)
    })

    test.beforeEach('Repetitive Steps', async () => {
        await basePage.page.goto('')
        await loginSteps.doLogin(data.username, data.password)
    })

    test('Get first product name', async () => {
        await homeSteps.getAllProducts()
    })

    test('Place an order', async ({ page }) => {
        await homeSteps.addProductToCart('adidas original')
        await homeSteps.validateCartNo()

    })

    test.afterAll('Teardown', async () => {
        await basePage.closeBrowser()
    })
})