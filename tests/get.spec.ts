import { test, expect } from '@playwright/test';
import { request } from 'http';

test.describe('GET Method API Testing', () => {
    test('Get list of users', async ({ request }) => {
        const response = await request.get('/api/users?page=2');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        // Await JSON parsing to get the actual response body
        const responseBody: { 
            page: number; 
            per_page: number; 
            total: number; 
            total_pages: number; 
            data: Array<{ 
                id: number; 
                email: string; 
                first_name: string; 
                last_name: string; 
                avatar: string; 
            }>; 
            support: { 
                url: string; 
                text: string; 
            }; 
        } = await response.json();
    
        // Validate overall response structure
        expect(responseBody).toHaveProperty('page', 2);
        expect(responseBody).toHaveProperty('per_page', 6);
        expect(responseBody).toHaveProperty('total', 12);
        expect(responseBody).toHaveProperty('total_pages', 2);
        expect(responseBody).toHaveProperty('data');
        expect(responseBody.data).toBeInstanceOf(Array);
        expect(responseBody.data.length).toBe(6);
    
        // Validate specific user data in the 'data' array
        const users = responseBody.data;
        
        users.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('first_name');
            expect(user).toHaveProperty('last_name');
            expect(user).toHaveProperty('avatar');
            
            // Additional checks for user properties
            expect(user.id).toBeGreaterThan(0);
            expect(user.email).toMatch(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
            expect(user.first_name).not.toBe('');
            expect(user.last_name).not.toBe('');
            expect(user.avatar).toMatch(/^https?:\/\/.+/);
        });
    
        // Validate support information
        expect(responseBody).toHaveProperty('support');
        expect(responseBody.support).toHaveProperty('url', 'https://reqres.in/#support-heading');
        expect(responseBody.support).toHaveProperty('text', 'To keep ReqRes free, contributions towards server costs are appreciated!');
    
        // Check headers
        const headers = response.headers();
        expect(headers['content-type']).toContain('application/json');
    
        // Optional Response time validation
        const startTime = Date.now();
        await request.get('/api/users?page=2');
        const duration = Date.now() - startTime;
        expect(duration).toBeLessThan(2000);
    });

    test('Get single user', async({ request }) => {
        const response = await request.get('/api/users/2');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        // Await JSON parsing to get the actual response body
        const responseBody: { 
            data: { 
                id: number; 
                email: string; 
                first_name: string; 
                last_name: string; 
                avatar: string; 
            }; 
            support: { 
                url: string; 
                text: string; 
            }; 
        } = await response.json();

        // Validate overall response structure
        expect(responseBody).toHaveProperty('data');
        expect(responseBody).toHaveProperty('support');
        expect(responseBody.data).toHaveProperty('id');
        expect(responseBody.data).toHaveProperty('email');
        expect(responseBody.data).toHaveProperty('first_name');
        expect(responseBody.data).toHaveProperty('last_name');
        expect(responseBody.data).toHaveProperty('avatar');
            
        // Additional checks for data properties
        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.email).toMatch('janet.weaver@reqres.in');
        expect(responseBody.data.first_name).toBe('Janet');
        expect(responseBody.data.last_name).toBe('Weaver');
        expect(responseBody.data.avatar).toMatch('https://reqres.in/img/faces/2-image.jpg');
    
        // Validate support information
        expect(responseBody).toHaveProperty('support');
        expect(responseBody.support).toHaveProperty('url', 'https://reqres.in/#support-heading');
        expect(responseBody.support).toHaveProperty('text', 'To keep ReqRes free, contributions towards server costs are appreciated!');
    
        // Check headers
        const headers = response.headers();
        expect(headers['content-type']).toContain('application/json');
    
        // Optional Response time validation
        const startTime = Date.now();
        await request.get('/api/users/2');
        const duration = Date.now() - startTime;
        expect(duration).toBeLessThan(2000);
    });

    test('Single user not found', async ({ request }) => {
        const response = await request.get('/api/users/23');
        expect(response.status()).toBe(404);
    
        // Check headers
        const headers = response.headers();
        expect(headers['content-type']).toContain('application/json');
    
        // Optional Response time validation
        const startTime = Date.now();
        await request.get('/api/users/23');
        const duration = Date.now() - startTime;
        expect(duration).toBeLessThan(2000);
    });
});
