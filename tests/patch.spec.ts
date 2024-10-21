import { test, expect } from '@playwright/test';

test.describe('PATCH Method API Testing', () => {
    test('Update user details', async ({ request }) => {
        // Define the request body
        const requestBody = {
            name: "morpheus",
            job: "zion resident"
        };
    
        // Send PUT request to the API
        const response = await request.patch('/api/users/2', {
            data: requestBody,
        });
    
        // Assert that the response status is 200 OK
        expect(response.status()).toBe(200);
    
        // Await and parse the JSON response body
        const responseBody = await response.json();
    
        // Validate the response structure and values
        expect(responseBody).toHaveProperty('name', 'morpheus'); // Check if 'name' matches
        expect(responseBody).toHaveProperty('job', 'zion resident'); // Check if 'job' matches
        expect(responseBody).toHaveProperty('updatedAt'); // Check if 'updatedAt' exists
    
        // Validate the format of 'updatedAt'
        const updatedAtDate = new Date(responseBody.updatedAt);
        expect(updatedAtDate).toBeInstanceOf(Date); // Ensure it's a valid date object
        expect(updatedAtDate.toISOString()).toBe(responseBody.updatedAt); // Check if it matches ISO format

        // Optional Response time validation
        const startTime = Date.now();
        await request.patch('/api/users/2', {
            data: requestBody,
        });
        const duration = Date.now() - startTime;
        expect(duration).toBeLessThan(2000);
    });
});
