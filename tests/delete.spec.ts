import { test, expect } from '@playwright/test';

test.describe('DELETE Method API Testing', () => {
    test('Delete user', async ({ request }) => {
        // Send DELETE request to the API
        const response = await request.delete('/api/users/2');
    
        // Assert that the response status is 204 No Content
        expect(response.status()).toBe(204);
    });
});
