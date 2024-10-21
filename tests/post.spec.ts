import { test, expect } from '@playwright/test';

test.describe('POST Method API Testing', () => {
    test('Create a new user', async ({ request }) => {
        // Define the request body
        const requestBody = {
            name: "morpheus",
            job: "leader"
        };
    
        // Send POST request to the API
        const response = await request.post('/api/users', {
            data: requestBody,
        });
    
        // Assert that the response status is 201 Created
        expect(response.status()).toBe(201);
    
        // Await and parse the JSON response body
        const responseBody = await response.json();
    
        // Validate the response structure and values
        expect(responseBody).toHaveProperty('name', 'morpheus');
        expect(responseBody).toHaveProperty('job', 'leader');
        expect(responseBody).toHaveProperty('id'); // Check if 'id' exists
        expect(typeof responseBody.id).toBe('string'); // Ensure 'id' is a string
        expect(responseBody).toHaveProperty('createdAt'); // Check if 'createdAt' exists
    
        // Validate the format of 'createdAt'
        const createdAtDate = new Date(responseBody.createdAt);
        expect(createdAtDate).toBeInstanceOf(Date); // Ensure it's a valid date object
        expect(createdAtDate.toISOString()).toBe(responseBody.createdAt); // Check if it matches ISO format

        // Optional Response time validation
        const startTime = Date.now();
        await request.post('/api/users', {
            data: requestBody,
        });
        const duration = Date.now() - startTime;
        expect(duration).toBeLessThan(2000);
    });

    test('Register a new user', async ({ request }) => {
        // Define the request body
        const requestBody = {
            email: "eve.holt@reqres.in",
            password: "pistol"
        };
    
        // Send POST request to the API
        const response = await request.post('/api/register', {
            data: requestBody,
        });
    
        // Assert that the response status is 200 OK
        expect(response.status()).toBe(200);
    
        // Await and parse the JSON response body
        const responseBody = await response.json();
    
        // Validate the response structure and values
        expect(responseBody).toHaveProperty('id'); // Check if 'id' exists
        expect(typeof responseBody.id).toBe('number'); // Ensure 'id' is a number
        expect(responseBody).toHaveProperty('token'); // Check if 'token' exists
        expect(typeof responseBody.token).toBe('string'); // Ensure 'token' is a string

        // Optional Response time validation
        const startTime = Date.now();
        await request.post('/api/register', {
            data: requestBody,
        });
        const duration = Date.now() - startTime;
        expect(duration).toBeLessThan(2000);
    });

    test('Register a user without password', async ({ request }) => {
        // Define the request body without password
        const requestBody = {
            email: "eve.holt@reqres.in",
        };
    
        // Send POST request to the API
        const response = await request.post('/api/register', {
            data: requestBody,
        });
    
        // Assert that the response status is 400 Bad Request
        expect(response.status()).toBe(400);
    
        // Await and parse the JSON response body
        const responseBody = await response.json();
    
        // Validate the response structure and error message
        expect(responseBody).toHaveProperty('error', 'Missing password'); // Check if 'error' property exists with the correct message
    });

    test('Login a user', async ({ request }) => {
        // Define the request body
        const requestBody = {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        };
    
        // Send POST request to the API
        const response = await request.post('/api/login', {
            data: requestBody,
        });
    
        // Assert that the response status is 200 OK
        expect(response.status()).toBe(200);
    
        // Await and parse the JSON response body
        const responseBody = await response.json();
    
        // Validate the response structure and values
        expect(responseBody).toHaveProperty('token'); // Check if 'token' exists
        expect(typeof responseBody.token).toBe('string'); // Ensure 'token' is a string

        // Optional Response time validation
        const startTime = Date.now();
        await request.post('/api/login', {
            data: requestBody,
        });
        const duration = Date.now() - startTime;
        expect(duration).toBeLessThan(2000);
    });

    test('Login a user without password', async ({ request }) => {
        // Define the request body without password
        const requestBody = {
            email: "eve.holt@reqres.in",
        };
    
        // Send POST request to the API
        const response = await request.post('/api/login', {
            data: requestBody,
        });
    
        // Assert that the response status is 400 Bad Request
        expect(response.status()).toBe(400);
    
        // Await and parse the JSON response body
        const responseBody = await response.json();
    
        // Validate the response structure and error message
        expect(responseBody).toHaveProperty('error', 'Missing password'); // Check if 'error' property exists with the correct message
    });
});
