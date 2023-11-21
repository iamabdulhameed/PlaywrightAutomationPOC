import { test } from '@playwright/test';
import { describe } from 'node:test';
import { LandingSteps } from '../steps/landingSteps'

describe('Feature:Navigation', () => {

    test('Verify user can click on button card', async ({ page }) => {
        const elementObj = new LandingSteps(page)
        await page.goto('')
        await elementObj.clickElementCard()
    })
})

