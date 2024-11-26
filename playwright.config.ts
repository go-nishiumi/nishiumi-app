import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npm start',
        port: 3000
    },
    projects: [
        {
            name: 'Google Chrome',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});