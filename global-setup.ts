import { request } from '@playwright/test';
import fs from 'fs';
import { USERNAME, PASSWORD, API_BASE_URL } from './helpers/dotenv-loader';

export default async function globalSetup() {
  console.log('API_BASE_URL exists:', !!API_BASE_URL);
  console.log('USERNAME exists:', !!USERNAME);
  console.log('PASSWORD exists:', !!PASSWORD);

  const api = await request.newContext({
    baseURL: API_BASE_URL
  });

  const res = await api.post('/auth/login', {
    data: {
      username: USERNAME,
      password: PASSWORD
    }
  });

  if (!res.ok()) {
    console.log('Status:', res.status());
    console.log('Response:', await res.text());

    throw new Error(
      `Login failed: ${res.status()} ${res.statusText()}`
    );
  }

  const body = await res.json();
  const token = body.token;

  if (!token) {
    throw new Error('Token not found in login response');
  }

  fs.writeFileSync(
    'auth.json',
    JSON.stringify({ token }, null, 2)
  );
}