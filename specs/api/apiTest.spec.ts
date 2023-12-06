import { expect, request, test } from '@playwright/test'
import { APIUtils } from '../utils/APIUtils'
import { OrderSteps } from '../../steps/orderSteps'
import { BasePage } from '../../support/basePage'

let token: string
let apiUtils: APIUtils
let orderSteps: OrderSteps
let basePage: BasePage

test.describe('TEST SUITE', () => {

    test.beforeAll(async () => {
        basePage = new BasePage()
        await basePage.initializeBrowser()
        const apiContext = await request.newContext()
        apiUtils = new APIUtils(apiContext)
        token = await apiUtils.getToken()
        orderSteps = new OrderSteps(basePage)
    })

    test('verify login with API', async ({ page }) => {
        await page.addInitScript((value) => {
            window.localStorage.setItem('token', value)
        }, token)
        await page.goto('https://rahulshettyacademy.com/client/')
        const url = page.url()
        expect(url).toContain("dash")
    })

    test('Place an order With API and verify country', async ({ page }) => {
        await page.addInitScript((value) => {
            window.localStorage.setItem('token', value)
        }, token)
        const orderId = await apiUtils.getOrderId(token)
        console.log(orderId)
        await page.goto('/client/')
        await page.locator('button[routerlink*="/dashboard/myorders"]').click()
        await page.locator('h1.ng-star-inserted').waitFor()
        const allOrders = await page.locator('table tbody tr th').allTextContents()
        for (let orderid in allOrders) {
            if (allOrders[orderid] === await orderId) {
                await page.locator(`table tbody tr td button[class*="primary"]`).nth(+orderid).click()
                break
            }
        }
        await page.locator('p[class="tagline"]').waitFor()
        expect(await page.getByText('Thank you for Shopping With Us').isVisible()).toBeTruthy()
        const address = await page.locator('div.address').first().locator('p').nth(1).textContent()
        expect(address).toContain('China')
    })

    test.only('Delete an order', async () => {
        await basePage.page.addInitScript((value) => {
            window.localStorage.setItem('token', value)
        }, token)
        
        await basePage.page.goto('https://rahulshettyacademy.com/client/')
        const orderId = await apiUtils.getOrderId(token)
        console.log(orderId)
        orderSteps.navigateToOrdersTab()
        await basePage.page.pause()

    })
})
