import { test } from '@playwright/test';
import { beforeEach, describe } from 'node:test';
import { LoginSteps } from '../steps/loginSteps';
import { LandingSteps } from '../steps/landingSteps';


describe('Feature:Login', () => {

    test('Verify user can login tn to system', async ({ page }) => {
        const loginObj = new LoginSteps(page)
        await page.goto('')
        await loginObj.doLogin('shaheemanjum@gmail.com', '@Testing123')
    })

    test('Get first product name', async ({ page }) => {
        const landingObj = new LandingSteps(page)
        const loginObj = new LoginSteps(page)
        await page.goto('')
        await loginObj.doLogin('shaheemanjum@gmail.com', '@Testing123')
        await landingObj.getAllProducts()
    })

    test('Place an orderr', async ({ page }) => {
        const landingObj = new LandingSteps(page)
        const loginObj = new LoginSteps(page)
        await page.goto('')
        await loginObj.doLogin('shaheemanjum@gmail.com', '@Testing123')
        await landingObj.addProductToCart('adidas original')
        await landingObj.validateCartNo()
         
    })
})

