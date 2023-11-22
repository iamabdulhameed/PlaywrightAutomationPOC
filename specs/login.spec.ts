import { test } from '@playwright/test';
import data from '../data/credentials.json';
import { LoginSteps } from '../steps/loginSteps';
import { BasePage } from '../support/basePage';


test.describe('Feature: Login', () => {

    let basePage: BasePage
    let loginSteps: LoginSteps

    test.beforeAll('Setup', async () => {
        basePage = new BasePage()
        await basePage.initializeBrowser()
        loginSteps = new LoginSteps(basePage)
    })

    test.beforeEach('Repetitive Steps', async () => {
        await basePage.page.goto('')
    })

    test('Verify user can login tn to system', async () => {
        await loginSteps.doLogin(data.username, data.password)
    })

    test.afterAll('Teardown', async () => {
        await basePage.closeBrowser()
    })
})
